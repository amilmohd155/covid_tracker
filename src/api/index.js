import axios from "axios";

const url = "https://api.rootnet.in/covid19-in";

export const fetchHelplineData = async () => {
  try {
    const {
      data: {
        data: {
          contacts: { primary, regional },
        },
      },
    } = await axios.get(`${url}/contacts`);

    return { primary, regional };
  } catch (error) {}
};

export const fetchNotication = async () => {
  try {
    const {
      data: {
        data: { notifications },
      },
    } = await axios.get(`${url}/notifications`);

    return notifications;
  } catch (error) {}
};

export const fetchHospitalBeds = async () => {
  try {
    const {
      data: {
        data: { regional },
      },
    } = await axios.get(`${url}/hospitals/beds`);

    return regional;
  } catch (error) {}
};

export const fetchMedColData = async () => {
  try {
    const {
      data : {data: {medicalColleges}}
    } = await axios.get(`${url}/hospitals/medical-colleges`);
    return medicalColleges;
  } catch (error) {}
};

export const fetchDailyConfirmed = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(`${url}/stats/history`);

    const modifiedData = data.map((dailyData) => ({
      day: dailyData.day,
      total: dailyData.summary.total,
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchDailyTested = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(`${url}/stats/testing/history`);
    const modifiedData = data.map((testedData) => ({
      day: testedData.day,
      totalSamplesTested: testedData.totalSamplesTested,
    }));

    return modifiedData;
  } catch (error) {}
};
