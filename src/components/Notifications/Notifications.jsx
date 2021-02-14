import React, { useState, useEffect } from "react";
import { fetchNotication } from "../../api";

import {
  Typography,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import styles from "./Notifications.module.css";

const GETTITLE = 1;
const GETDATE = 0;

const Notifications = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = (async () => {
      setData(await fetchNotication());
    })();
  });

  if (!data.length) return "Loading...";

  const getTitleOrDate = (str, c) => {
    var index = str.indexOf(" ");

    if (c) return str.substr(index + 1);
    if(Date.parse(str.substr(0, index))) return str.substr(0, index);
    return "---"
  };

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table stickyHeader className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Date</Typography>
              </TableCell>
              <TableCell>
                <Typography>Notification Title</Typography>
              </TableCell>
              <TableCell>
                <Typography>Link</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((not) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {getTitleOrDate(not.title, GETDATE)}
                </TableCell>
                <TableCell component="th" scope="row">
                {getTitleOrDate(not.title, GETTITLE)}
                </TableCell>
                <TableCell component="th" scope="row">
                  <a href={not.link}>{not.link}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Notifications;
