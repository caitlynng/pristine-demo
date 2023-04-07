import mongoose from "mongoose";

const ShippingSchema = mongoose.Schema(
  {
    shippingCompany: {
      type: String,
      trim: true,
    },
  },
);

export default mongoose.model("Shipping", ShippingSchema);
