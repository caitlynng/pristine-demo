import mongoose from "mongoose";

const UploadSchema = mongoose.Schema(
  {
    type: {
      type: String,
      trim: true
    },
    fileName: {
      type: String,
      trim: true
    },
    fileType: {
      type: String,
      trim: true
    },
    fileSize: {
      type: String,
      trim: true
    },
  },
  { strict: false, timestamps: true }
);

export default mongoose.model("Upload", UploadSchema);
