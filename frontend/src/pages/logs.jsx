import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLog } from "../redux/user/actions";
import { auth } from "../firebase";

const Logs = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const LogData = useSelector((state) => state?.User?.LogData?.data);

  useEffect(() => {
    if (user) {
      getLog(dispatch, user?.uid);
    }
  }, [dispatch, user]);

  return (
    <div className="p-8 bg-gradient-to-r from-green-200 via-purple-200 to-yellow-200 min-h-screen">
      <Paper className="p-6 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-purple-500 text-center">
          Daily Logs
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell className="!font-bold">Log ID</TableCell>
                {/* <TableCell className="!font-bold">User ID</TableCell> */}
                <TableCell className="!font-bold">Mood Rating</TableCell>
                <TableCell className="!font-bold">Anxiety Level</TableCell>
                <TableCell className="!font-bold">Sleep Hours</TableCell>
                <TableCell className="!font-bold">Sleep Quality</TableCell>
                <TableCell className="!font-bold">Activity</TableCell>
                <TableCell className="!font-bold">Stress Level</TableCell>
                <TableCell className="!font-bold">Log Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LogData?.map((log) => (
                <TableRow
                  key={log.id}
                  className="hover:!bg-green-50 transition duration-300"
                >
                  <TableCell>{log.id}</TableCell>
                  {/* <TableCell>{log.userId}</TableCell> */}
                  <TableCell>{log.moodRating}</TableCell>
                  <TableCell>{log.anxietyLevel}</TableCell>
                  <TableCell>{log.sleepHours}</TableCell>
                  <TableCell>{log.sleepQuality}</TableCell>
                  <TableCell>{log.physicalActivity}</TableCell>
                  <TableCell>{log.stressLevel}</TableCell>
                  <TableCell>
                    {new Date(log.logDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
};

export default Logs;
