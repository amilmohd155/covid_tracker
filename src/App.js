import React from "react";
import PropTypes from "prop-types";

import {
  Helpline,
  Notifications,
  HospitalBeds,
  MedicalColleges,
  Chart,
} from "./components";
import styles from "./App.module.css";
import { fetchHelplineData } from "./api";

import { Tab, Tabs, Paper, AppBar } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className={styles.tabpanel}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function allyPanel(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      value: 0,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  async componentDidMount() {
    const fetchedData = await fetchHelplineData();
    this.setState({ data: fetchedData });
  }

  handleTabChange(event, newValue) {
    this.setState({ value: newValue });
  }

  render() {
    return (
      <div component={Paper} className={styles.container}>
        <AppBar position="static">
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            centered
          >
            <Tab label="Charts" {...allyPanel(0)} />
            <Tab label="Notifications" {...allyPanel(1)} />
            <Tab label="Hospital Beds" {...allyPanel(2)} />
            <Tab label="Helpline & Contact" {...allyPanel(3)} />
            <Tab label="Medical Colleges" {...allyPanel(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <Chart />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <Notifications />
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <HospitalBeds />
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          <Helpline data={this.state.data} />
        </TabPanel>
        <TabPanel value={this.state.value} index={4}>
          <MedicalColleges />
        </TabPanel>
      </div>
    );
  }
}

export default App;
