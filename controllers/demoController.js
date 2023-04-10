import mongoose from "mongoose";
import TransactionDetail from "../models/TransactionDetail.js";
import Shipping from "../models/Shipping.js";
import UserSettings from "../models/UserSettings.js";
import Upload from "../models/Upload.js";
import { StatusCodes } from "http-status-codes";
import {
  codeByCategory,
  currencyType,
  salesTypes,
  expensesTypes,
  codeOnly,
} from "../utils/paypalTcode.js";

import Realm from "realm";
import {
  subDays,
  eachDayOfInterval,
  format,
  differenceInCalendarDays,
} from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export const searchAutoComplete = async (req, res) => {
  const app = new Realm.App({ id: process.env.REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  const user = await app.logIn(credentials);
  const result = await user.functions.searchAutoCompleteDemo(req.body.query);
  res.status(StatusCodes.OK).json({ result });
};

export const searchResults = async (req, res) => {
  const app = new Realm.App({ id: process.env.REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();

  const user = await app.logIn(credentials);
  const result = await user.functions.searchTransactionDemo(req.body.query);
  res.status(StatusCodes.OK).json({ result });
};

export const manageUpload = async (req, res) => {
  let uploads = await Upload.aggregate([
    { $match: {} },
    {
      $project: {
        createdAt: {
          $dateToString: { format: "%m/%d/%Y", date: "$createdAt" },
        },
        fileName: 1,
        fileSize: 1,
        type: 1,
        _id: 1,
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ uploads });
};

export const getReport = async (req, res) => {
   const formatedStartD = format(new Date(req.body.dates[0]), "yyyy-MM-dd");
   const startDate = zonedTimeToUtc(formatedStartD, "UTC");

   const formatedEndD = format(new Date(req.body.dates[1]), "yyyy-MM-dd");
  const endDate = zonedTimeToUtc(formatedEndD, "UTC");
  
   const result = await TransactionDetail.aggregate([
     {
       $match: {
         $and: [
           {
             Date: {
               $gte: startDate,
               $lte: endDate,
             },
           },
         ],
       },
     },
     {
       $addFields: {
         Date: {
           $dateToString: { format: "%m/%d/%Y", date: "$Date" },
         },
       },
     },
     {
       $sort: { Date: 1 },
     },
     {
       $unset: ["No", "__v"],
     },
   ]);

   const headers = await UserSettings.find({});
   res.status(StatusCodes.OK).json({ result, headers });
};

export const showStats = async (req, res) => {
  const { dates, yesterday } = req.body;

  const datesDuration =
    differenceInCalendarDays(new Date(dates[1]), new Date(dates[0])) + 1;
  if (datesDuration > 730) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Out of range: selected time frame should not be more than two years.",
    });
  }
  if (new Date(dates[1]) > new Date()) {
   res.status(StatusCodes.BAD_REQUEST).json({
     msg: "Out of range: selected date cannot be greater than today's date",
   });
  }

  const formatedYesterday = format(yesterday, "yyyy-MM-dd");
  const yesterdayToUTC = zonedTimeToUtc(formatedYesterday, "UTC");

  const formatedStartD = format(new Date(dates[0]), "yyyy-MM-dd");
  const startDate = zonedTimeToUtc(formatedStartD, "UTC");

  const formatedEndD = format(new Date(dates[1]), "yyyy-MM-dd");
  const endDate = zonedTimeToUtc(formatedEndD, "UTC");

  const isDatePresent = await TransactionDetail.find({
    Date: yesterdayToUTC,
  });
  const twoYearsBeforeTodayDate = subDays(new Date(), 365);

  if (!isDatePresent.length) {
    const datesInterval = eachDayOfInterval({
      start: new Date(twoYearsBeforeTodayDate),
      end: new Date(),
    });

    if (datesInterval.length) {
      let controlNum = 0;
      const docs = await TransactionDetail.find({}).sort({ No: -1 });
      if (docs.length) {
        docs.forEach(async function (doc, ind) {
          let date = datesInterval[controlNum];
          if (date) {
            if (ind % 5 === 0) {
              controlNum += 1;
            }
            doc.Date = zonedTimeToUtc(date, "UTC");
            await doc.save();
          }
        });
      }
    }
  }

  const sales = await getSales(startDate, endDate);
  const expenses = await getExpenses(startDate, endDate);
  const shippings = await getShippingCost(startDate, endDate);

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
