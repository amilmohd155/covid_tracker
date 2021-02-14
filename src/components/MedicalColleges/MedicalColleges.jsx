import React, { useState, useEffect } from "react";

import { fetchMedColData } from "../../api";
import styles from "./MedicalColleges.module.css";

import {
  Toolbar,
  Input,
  Table,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from "@material-ui/core";
import { LocalDining } from "@material-ui/icons";

const MedicalColleges = () => {
  const [stateFilters, setStateFilters] = useState("All");
  const [typeFilters, setTypeFilters] = useState("All");
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      setData(await fetchMedColData());
    })();
  });

  const handleChangeState = (event) => {
    setStateFilters(event.target.value);
  };
  const handleChangeType = (event) => {
    setTypeFilters(event.target.value);
  };

  const filteredTableData = () => {
    var d1 = data;
    if (stateFilters !== "All")
      d1 = d1.filter((reg) => reg.state === stateFilters);
      if(typeFilters !== 'All') {
        d1 = d1.filter((reg) => reg.ownership === typeFilters);
      }
    return d1;
  };

  return data ? (
    <div>
      <Toolbar className={styles.toolbar}>
        <FormControl className={styles.formControl}>
          <InputLabel>State</InputLabel>
          <Select value={stateFilters} onChange={handleChangeState}>
            <MenuItem value="All">All</MenuItem>
            {Array.from(new Set(data.map((x) => x.state))).map((reg) => (
              <MenuItem value={reg}>{reg}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel>Type</InputLabel>
          <Select value={typeFilters} onChange={handleChangeType}>
            <MenuItem value="All">All</MenuItem>
            {Array.from(new Set(data.map((x) => x.ownership))).map((type) => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table stickyHeader className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>State Name</Typography>
              </TableCell>
              <TableCell>
                <Typography>Institute Name</Typography>
              </TableCell>
              <TableCell>
                <Typography>City</Typography>
              </TableCell>
              <TableCell>
                <Typography>Type</Typography>
              </TableCell>
              <TableCell>
                <Typography>Admission Capacity</Typography>
              </TableCell>
              <TableCell>
                <Typography>Hospital Beds</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTableData().map((reg) => (
              <TableRow key={reg.name}>
                <TableCell component="th" scope="row">
                  {reg.state}
                </TableCell>
                <TableCell>{reg.name}</TableCell>
                <TableCell>{reg.city}</TableCell>
                <TableCell>{reg.ownership}</TableCell>
                <TableCell>{reg.admissionCapacity}</TableCell>
                <TableCell>{reg.hospitalBeds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    "Loading..."
  );
};

export default MedicalColleges;
