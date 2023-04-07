import mongoose from "mongoose";
import TransactionDetail from "../models/TransactionDetail.js";
import Shipping from "../models/Shipping.js";
import UserSettings from "../models/UserSettings.js";
import { StatusCodes } from "http-status-codes";
import {
  codeByCategory,
  currencyType,
  salesTypes,
  expensesTypes,
  codeOnly,
} from "../utils/paypalTcode.js";

import Realm from "realm";
import { subDays, eachDayOfInterval, format } from "date-fns";

export const searchAutoComplete = async (req, res) => {
  const app = new Realm.App({ id: process.env.REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  const user = await app.logIn(credentials);
  const result = await user.functions.searchAutoComplete(req.body.query);
  res.status(StatusCodes.OK).json({ result });
};

export const searchResults = async (req, res) => {
  const app = new Realm.App({ id: process.env.REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();

  const user = await app.logIn(credentials);
  const result = await user.functions.searchTransactions(req.body.query);
  res.status(StatusCodes.OK).json({ result });
};

export const getReport = async (req, res) => {
  // const result = await TransactionDetail.find({});
  // const headers = await UserSettings.find({});
  // res.status(StatusCodes.OK).json({ result, headers });
};

export const showStats = async (req, res) => {
  const { dates, datesDuration, yesterday } = req.body;

  const formatedYesterday = format(new Date(yesterday), "MM/dd/yy")
  const startDate = format(new Date(dates[0]), "MM/dd/yy");
  const endDate = format(new Date(dates[1]), "MM/dd/yy");

  const isDatePresent = await TransactionDetail.find({ Date: formatedYesterday });

  const twoYearsBeforeTodayDate = subDays(new Date(yesterday), 365);

  if (!isDatePresent.length) {
    const datesInterval = eachDayOfInterval({
      start: new Date(twoYearsBeforeTodayDate),
      end: new Date(formatedYesterday),
    });

    let controlInd = 0;
    if (datesInterval.length) {
      const docs = await TransactionDetail.find({}).sort({No: -1})
      if (docs.length) {
        docs.forEach(async function (doc, ind) {
          let date = datesInterval[controlInd];
          if (ind % 5 === 0) {
            controlInd += 1;
          }
          doc.Date = format(date, "MM/dd/yy")
          await doc.save();
        });
        }
    }
  }

  const sales = await getSales(startDate,endDate);
  const expenses = await getExpenses(startDate,endDate);
  const shippings = await getShippingCost(startDate,endDate);

  res.status(StatusCodes.OK).json({
    sales,
    expenses,
    shippings,
  });
};
async function getShippingCost() {
  return await Shipping.find({});
}

//https://www.mongodb.com/community/forums/t/putting-the-results-of-2-queries-together-in-the-returned-data/5593/2
async function getSales(startD, endD) {
  return await TransactionDetail.aggregate([
    {
      $match: {
        $and: [
          {
            Date: {
              $gte: startD,
              $lte: endD,
            },
            TransactionEventCode: { $in: codeOnly },
            BalanceImpact: "Credit",
          },
        ],
      },
    },
    {
      $facet: {
        groupByType: [
          {
            $group: {
              _id: "$Type",
              Sum: { $sum: "$Gross" },
              category: { $push: "$Category" },
            },
          },
        ],
        day: [
          {
            $match: {
              TransactionEventCode: { $in: salesTypes },
            },
          },
          {
            $group: {
              _id: "$Date",
              Sum: { $sum: "$Gross" },
            },
          },
          {
            $sort: { _id: 1 },
          },
          {
            $group: {
              _id: null,
              labels: { $push: "$_id" },
              data: { $push: "$Sum" },
            },
          },
        ],
        ...groupBy(salesTypes, "$week"),
        month: [
          {
            $match: {
              TransactionEventCode: { $in: salesTypes },
            },
          },
          {
            $group: {
              _id: { $month: "$Date" },
              Sum: { $sum: "$Gross" },
            },
          },
          {
            $sort: { _id: 1 },
          },
          {
            $group: {
              _id: null,
              labels: { $push: "$_id" },
              data: { $push: "$Sum" },
            },
          },
        ],
        groupByStats: [
          {
            $group: {
              _id: null,
              minOrder: { $min: "$Gross" },
              maxOrder: { $max: "$Gross" },
              avgOrder: { $avg: "$Gross" },
              totalOrder: { $count: {} },
              fees: { $sum: "$Fee" },
            },
          },
          {
            $project: {
              "Lowest Value Per Order": {
                $concat: [
                  { $literal: "$" },
                  { $toString: { $round: ["$minOrder", 2] } },
                ],
              },
              "Highest Value Per Order": {
                $concat: [
                  { $literal: "$" },
                  { $toString: { $round: ["$maxOrder", 2] } },
                ],
              },
              "Average Value Per Order": {
                $concat: [
                  { $literal: "$" },
                  { $toString: { $round: ["$avgOrder", 2] } },
                ],
              },
              "Total Orders": "$totalOrder",
              fees: 1,
            },
          },
        ],
      },
    },
  ]);
}

const groupBy = (type, time) => ({
  week: [
    {
      $match: {
        TransactionEventCode: { $in: type },
      },
    },
    {
      $group: {
        _id: { [time]: "$Date" },
        Sum: { $sum: "$Gross" },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $group: {
        _id: null,
        labels: { $push: "$_id" },
        data: { $push: "$Sum" },
      },
    },
  ],
});
async function getExpenses(startD, endD) {
  return await TransactionDetail.aggregate([
    {
      $match: {
        $and: [
          {
            Date: {
              $gte: startD,
              $lte: endD,
            },
            TransactionEventCode: { $in: codeOnly },
            BalanceImpact: "Debit",
          },
        ],
      },
    },
    {
      $facet: {
        groupByType: [
          {
            $group: {
              _id: "$Type",
              Sum: { $sum: "$Gross" },
              category: { $push: "$Category" },
            },
          },
        ],
        day: [
          {
            $match: {
              TransactionEventCode: { $in: expensesTypes },
            },
          },
          {
            $group: {
              _id: "$Date",
              Sum: { $sum: "$Gross" },
            },
          },
          {
            $sort: { _id: 1 },
          },
          {
            $group: {
              _id: null,
              labels: { $push: "$_id" },
              data: { $push: "$Sum" },
            },
          },
        ],
        month: [
          {
            $match: {
              TransactionEventCode: { $in: expensesTypes },
            },
          },
          {
            $group: {
              _id: { $month: "$Date" },
              Sum: { $sum: "$Gross" },
            },
          },
          {
            $sort: { _id: 1 },
          },
          {
            $group: {
              _id: null,
              labels: { $push: "$_id" },
              data: { $push: "$Sum" },
            },
          },
        ],
        ...groupBy(expensesTypes, "$week"),
        refunds: [
          {
            $match: {
              Type: "Payment Refund",
            },
          },
          {
            $group: {
              _id: null,
              "Total Refunds": { $count: {} },
            },
          },
        ],
      },
    },
  ]);
}
