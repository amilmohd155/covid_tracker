import React from "react";
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

import styles from "./Helpline.module.css";

const Helpline = ({data: { primary, regional}}) => {

  if (!primary) return "Loading";

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table stickyHeader className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>State Name</Typography>
              </TableCell>
              <TableCell>
                <Typography>Helpline Number</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regional.map((reg) => (
              <TableRow key={reg.loc}>
                <TableCell component="th" scope="row">{reg.loc}</TableCell>
                <TableCell component="th" scope="row">{reg.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Helpline;
