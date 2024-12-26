const Analytics = require("../models/analytics.model");

let data = async (req, res) => {
  try {
    const { ageGroup, gender, startDate, endDate } = req.query;
    console.log("Received filters:", { ageGroup, gender, startDate, endDate });

    // Normalize and convert the date format (DD/MM/YYYY to Date object)
    const formatDateToDDMMYYYY = (dateStr) => {
      const [day, month, year] = dateStr.split("/");
      return `${day.padStart(1, 2, "0")}/${month.padStart(2, "0")}/${year}`;
    };

    const formattedStartDate = startDate
      ? formatDateToDDMMYYYY(startDate)
      : null;
    const formattedEndDate = endDate ? formatDateToDDMMYYYY(endDate) : null;

    console.log("Parsed Dates:", formattedStartDate, formattedEndDate);

    // Validate parsed dates
    if (startDate && !formattedStartDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid start date format, should be DD/MM/YYYY",
      });
    }
    if (endDate && !formattedEndDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid end date format, should be DD/MM/YYYY",
      });
    }

    // Build query dynamically based on filters
    const query = {};
    if (ageGroup) query.Age = ageGroup;
    if (gender) query.Gender = gender;

    // Date range filtering logic
    if (formattedStartDate && formattedEndDate) {
      query.Day = {
        $gte: formattedStartDate,
        $lte: formattedEndDate,
      };
    } else if (formattedStartDate) {
      query.Day = { $gte: formattedStartDate };
    } else if (formattedEndDate) {
      query.Day = { $lte: formattedEndDate };
    }

    console.log("Query:", query);

    // Fetch data from the database
    const fetchedData = await Analytics.find(query);

    console.log("Fetched Data:", fetchedData);

    // Check if any data was found
    if (fetchedData.length === 0) {
      console.log("No matching data found for this date range.");
      return res.status(404).json({
        success: false,
        message: "No data found for the given date range.",
      });
    }

    res.status(200).json({
      success: true,
      data: fetchedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching analytics data",
    });
  }
};

module.exports = {
  data,
};
