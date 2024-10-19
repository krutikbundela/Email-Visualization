import catchAsyncError from "../middleware/catchAsyncError.js";
import Data from "../models/data.js";

const parseDateString = (dateString) => {
  const [day, month, year] = dateString.split("/");

  const date = new Date(Date.UTC(year, month - 1, day));

  return date;
};

export const uploadData = catchAsyncError(async (req, res, next) => {
  const dataArray = req.body;

  const formattedData = dataArray.map((data) => ({
    ...data,
    day: parseDateString(data.day),
  }));

  await Data.insertMany(formattedData);

  res.status(200).send("Data uploaded successfully");
});

export const getData = catchAsyncError(async (req, res, next) => {
  const { startDate, endDate, ageGroup, gender } = req.query;

  const filter = {};

  if (startDate && endDate) {
    filter.day = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  if (ageGroup) {
    filter.age = ageGroup;
  }

  if (gender) {
    filter.gender = gender;
  }

  let data;

  if (startDate && endDate) {
    // If startDate and endDate are provided, query based on the filter
    data = await Data.find(filter);
  } else {
    // If startDate and endDate are not provided
    // Step 1: Find the latest date in the collection
    const latestRecord = await Data.findOne().sort({ day: -1 });

    if (latestRecord) {
      // Step 2: Calculate the date range (last 7 days including the latest date)
      const latestDate = new Date(latestRecord.day);
      const seventhPreviousDate = new Date(latestDate);
      seventhPreviousDate.setDate(latestDate.getDate() - 6); // Go back 6 days

      // Step 3: Apply the calculated date range to the filter
      filter.day = { $gte: seventhPreviousDate, $lte: latestDate };

      // Step 4: Fetch records based on this new date range
      data = await Data.find(filter).sort({ day: -1 });
    }
  }
  res.status(200).json(data);
});
