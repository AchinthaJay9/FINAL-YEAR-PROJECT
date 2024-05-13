const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema(
  {
    latitude: Number,
    longitude: Number,
    temperature: String,
    humidity: String,
    termType: String,
  },
);
const crop = mongoose.model("CropInfo", CropSchema);

module.exports = crop;

