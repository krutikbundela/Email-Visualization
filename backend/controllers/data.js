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

  const data = await Data.find(filter);

  res.status(200).json(data);
});

export const getDefaultPreferences = catchAsyncError(async (req, res, next) => {
  const latestRecord = await Data.findOne().sort({ day: -1 });

  if (latestRecord) {
    const latestDate = new Date(latestRecord.day);
    const seventhPreviousDate = new Date(latestDate);
    seventhPreviousDate.setDate(latestDate.getDate() - 6);

    const ageGroups = await Data.distinct("age");
    const genders = await Data.distinct("gender");

    const randomAgeGroup =
      ageGroups[Math.floor(Math.random() * ageGroups.length)];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];

    const data = {
      startDate: seventhPreviousDate.toISOString().split("T")[0],
      endDate: latestDate.toISOString().split("T")[0],
      ageGroup: randomAgeGroup,
      gender: randomGender,
    };

    res.status(200).json({ success: true, data });
  } else {
    res.status(404).json({ success: false, message: "No data found" });
  }
});
