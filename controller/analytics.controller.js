const Analytics = require("../models/analytics.model");

let data = async (req, res) => {
  try {
    const { ageGroup, gender, startDate, endDate } = req.query;
    console.log("Received filters:", { ageGroup, gender, startDate, endDate });

    console.log("Incoming startDate:", startDate);
    console.log("Incoming endDate:", endDate);

    // Normalize the date format (DD/MM/YYYY to DD/MM/YYYY for comparison)
    const normalizeDate = (dateStr) => {
      if (dateStr) {
        const [day, month, year] = dateStr.split("/");
        return `${day}/${month}/${year}`; // Keep as DD/MM/YYYY
      }
      return null;
    };

    // Validate and format the dates properly
    const formattedStartDate = startDate ? normalizeDate(startDate) : null;
    const formattedEndDate = endDate ? normalizeDate(endDate) : null;

    // Check if dates are valid
    if (startDate && !formattedStartDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid start date format",
      });
    }
    if (endDate && !formattedEndDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid end date format",
      });
    }

    // Build query dynamically based on filters
    const query = {};
    if (ageGroup) query.Age = ageGroup;
    if (gender) query.Gender = gender;

    // Date range filtering logic (using string comparison in DD/MM/YYYY format)
    if (formattedStartDate && formattedEndDate) {
      query.Day = {
        $gte: formattedStartDate, // start date as string in DD/MM/YYYY format
        $lte: formattedEndDate, // end date as string in DD/MM/YYYY format
      };
    } else if (formattedStartDate) {
      query.Day = { $gte: formattedStartDate }; // Only start date filter
    } else if (formattedEndDate) {
      query.Day = { $lte: formattedEndDate }; // Only end date filter
    }

    // Fetch data from the database
    const data = await Analytics.find(query);

    // Log the fetched data to inspect
    console.log("Fetched Data:", data);

    // Check if any data was found
    if (data.length === 0) {
      console.log("No matching data found.");
    }

    res.status(200).json({
      success: true,
      data,
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
