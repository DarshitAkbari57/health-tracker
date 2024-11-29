let jwToken = require("jsonwebtoken");
const config = require("./config.js");
const db = require("./db.js");
const { Op } = require("sequelize");
const User = db.users;
const Company = db.companies;
const CompanyUsers = db.company_users;
const StripeSubscriptions = db.stripe_subscriptions;
const PlanPrices = db.plan_prices;
const Plans = db.plans;
const Employee = db.employees;

exports.checkToken = (roles) => async (req, res, next) => {
  let resp = {};
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  console.log("roles:", roles);
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwToken.verify(token, config.jwt_token, (err, decoded) => {
      if (err) {
        resp["error"] = 3; //  Missing or Incorrect Token
        resp["message"] = "Token not valid";
        return res.status(200).json(resp);
      } else {
        console.log("decoded:", decoded);
        let query = {};

        if (decoded.iat <= 1641427200) {
          //  Auto logout if loggin before Wednesday, 5 January 2022 16:00:00 Los Angeles Time
          resp["error"] = 3; //  Missing or Incorrect Token
          resp["message"] = "Token not valid";
          return res.status(200).json(resp);
        } else {
          if (decoded.type && decoded.type == "employee") {
            query["where"] = {
              id: decoded.employee_id,
            };
            Employee.findOne(query).then(async (employee) => {
              if (employee) {
                req.decoded = decoded;
                req.userData = employee;
                next();
              } else {
                resp["error"] = 3; //  Missing or Incorrect Token
                resp["message"] = "Employee is not active or does not exist."; //"User is not active or does not exist.";
                return res.status(200).json(resp);
              }
            });
          } else {
            query["where"] = {
              id: decoded.user_id,
            };
            // if(typeof roles == 'object' && roles.length>1){
            //     let or = []
            //     for(i=0;i<roles.length;i++){
            //         if(roles[i] !== 'broker'){
            //             or.push({type: roles[i]})
            //         }
            //     }
            //     query["where"][Op.or] = or
            // }
            if (typeof roles !== "object" && roles == "admin") {
              query.where["type"] = roles;
            }
            if (typeof roles == "object" && roles.length == 1) {
              query.where["type"] = roles[0];
            }
            User.findOne(query).then(async (user) => {
              if (user && user.status == "active") {
                console.log("u:", user);
                if (
                  (roles.includes("company") == true &&
                    user.type == "company") ||
                  (roles.includes("broker") == true &&
                    user.type == "company") ||
                  (user.type !== "admin" && decoded.ecrs_id)
                ) {
                  let match_company_user = { user_id: decoded.user_id };
                  console.log("heresdsf");
                  let company_match = { status: "active" };
                  if (decoded.ecrs_id) {
                    company_match["ECRS_id"] = decoded.ecrs_id;
                  }
                  let or = [];
                  if (roles.includes("company") == true) {
                    or.push({ user_type: "admin" });
                  }
                  if (roles.includes("broker") == true) {
                    or.push({ user_type: "broker" });
                  }
                  if (or.length > 0) match_company_user[Op.or] = or;
                  let check_user = await User.findOne({
                    include: [
                      {
                        model: CompanyUsers,
                        where: match_company_user,
                        include: [
                          {
                            model: Company,
                            where: company_match,
                            include: [
                              {
                                model: StripeSubscriptions,
                                where: {
                                  status: "active",
                                  current_term_end: { [Op.gte]: new Date() },
                                },
                                required: false,
                                include: [
                                  {
                                    model: PlanPrices,
                                    where: { status: "active" },
                                    include: [
                                      {
                                        model: Plans,
                                        where: { status: "active" },
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    where: { id: decoded.user_id },
                  });
                  if (!check_user || check_user == null) {
                    resp["error"] = 3; //  Missing or Incorrect Token
                    resp["message"] = "User is not active or does not exist."; //"User is not active or does not exist.";
                    return res.status(200).json(resp);
                  } else {
                    req.decoded = decoded;
                    req.userData = user;
                    if (
                      check_user.dataValues.company_users.length !== 0 &&
                      check_user.dataValues.company_users[0].company.dataValues
                        .stripe_subscription !== null &&
                      check_user.dataValues.company_users[0].dataValues.company
                        .dataValues.stripe_subscription.dataValues
                        .plan_price !== null
                    ) {
                      req.plan_id =
                        check_user.dataValues.company_users[0].dataValues.company.dataValues.stripe_subscription.dataValues.plan_price.dataValues.plan_id;
                    }
                    next();
                  }
                } else {
                  req.decoded = decoded;
                  req.userData = user;
                  next();
                }
              } else {
                resp["error"] = 3; //  Missing or Incorrect Token
                resp["message"] = "User is not active or does not exist."; //"User is not active or does not exist.";
                return res.status(200).json(resp);
              }
            });
          }
        }
      }
    });
  } else {
    resp["error"] = 3; //  Missing or Incorrect Token
    resp["message"] = "Auth token missing";
    return res.status(200).json(resp);
  }
};
