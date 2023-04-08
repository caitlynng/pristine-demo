import mongoose from "mongoose";

const TransactionDetailSchema = mongoose.Schema({
  No: { type: Number, trim: true },
  Date: {type: Date, trim: true},
  Time: { type: String, trim: true },
  TimeZone: { type: String, trim: true },
  Name: { type: String, trim: true },
  Type: { type: String, trim: true },
  Status: { type: String, trim: true },
  Currency: { type: String, trim: true },
  Gross: { type: Number, trim: true },
  Fee: { type: Number, trim: true },
  Net: { type: Number, trim: true },
  ToEmailAddress: { type: String, trim: true },
  FromEmailAddress: { type: String, trim: true },
  TransactionID: { type: String, trim: true },
  ItemTitle: { type: String, trim: true },
  ItemID: { type: String, trim: true },
  ReferenceTaxID: { type: String, trim: true },
  InvoiceNumber: { type: String, trim: true },
  CustomNumber: { type: String, trim: true },
  Quantity: { type: Number, trim: true },
  ShippingAddress: { type: String, trim: true },
  ContactPhoneNumber: { type: String, trim: true },
  BalanceImpact: { type: String, trim: true },
  TransactionEventCode: { type: String, trim: true },
  Category: { type: String, trim: true },
});

export default mongoose.model("TransactionDetail", TransactionDetailSchema);
