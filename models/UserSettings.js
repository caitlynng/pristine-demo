import mongoose from "mongoose";

const UserSettingSchema = mongoose.Schema(
  {
    paypalFilterHeaders: {},
    paypalActiveHeaders: {},
  },
);

export default mongoose.model('UserSetting', UserSettingSchema)
