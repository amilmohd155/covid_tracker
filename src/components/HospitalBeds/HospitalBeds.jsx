import React, { useState, useEffect } from "react";

import { fetchHospitalBeds } from "../../api";

import {
  Typography,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Box,
} from "@material-ui/core";

import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

import styles from "./HospitalBeds.module.css";

function Row({data}) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.state}
        </TableCell>
        <TableCell>{data.totalHospitals}</TableCell>
        <TableCell>{data.totalBeds}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={styles.innerRow} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Rural Hospitals</TableCell>
                    <TableCell>Rural Beds</TableCell>
                    <TableCell>Urban Hospitals</TableCell>
                    <TableCell>Urban Beds</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.ruralHospitals}</TableCell>
                    <TableCell>{data.ruralBeds}</TableCell>
                    <TableCell>{data.urbanHospitals}</TableCell>
                    <TableCell>{data.urbanBeds}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const HospitalBeds = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = (async () => {
      setData(await fetchHospitalBeds());
    })();
  });

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table stickyHeader className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography>State name</Typography>
              </TableCell>
              <TableCell>
                <Typography>Total Hospitals</Typography>
              </TableCell>
              <TableCell>
                <Typography>Total Beds</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {data.map((reg) => (
            <Row data={reg} />
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default HospitalBeds;
