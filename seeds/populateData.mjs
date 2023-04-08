import papa from "papaparse";
import fs from "fs";

//db
import TransactionDetail from "../models/TransactionDetail.js";
import UserSettings from "../models/UserSettings.js";
import connectDB from "../db/connect.js";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log(process.env.MONGO_URL);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log(`Database connected...`);
  } catch (error) {
    console.log(error);
  }
};

start();

const removeWhiteSpace = (word) => {
  return word.replace(/\/|\s/g, "").trim();
};
const addSpaceBeforeEachCapitalLetter = (string) => {
  //https://stackoverflow.com/questions/5582228/insert-space-before-capital-letters
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
  string = string.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return string;
};

const csvFilePath = "MOCK_DATA.csv";

const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise((resolve) => {
    papa.parse(csvData, {
      header: true,
      beforeFirstChunk: function (chunk) {
        var rows = chunk.split(/\r\n|\r|\n/);
        var headings = removeWhiteSpace(rows[0]); //remove white space and dashes in headers
        rows[0] = headings;
        return rows.join("\r\n");
      },
      complete: (results) => {
        // console.log('Complete', results.data.length, 'records.');
        resolve(results.data);
      },
    });
  });
};

//https://stackoverflow.com/questions/49752889/how-can-i-read-a-local-file-with-papa-parse
const seedDB = async () => {
  let parsedData = await readCSV(csvFilePath);
  await TransactionDetail.deleteMany({});
  await UserSettings.deleteMany({});

  await Promise.all(
    parsedData.map(async (data) => {
      await TransactionDetail.create({ ...data });
    })
  );

  let headers = Object.keys(parsedData[0]).map((i) =>
    addSpaceBeforeEachCapitalLetter(i)
  );

  const defaultHeaders = [
    "Date",
    "Name",
    "Type",
    "Gross",
    "Fee",
    "Net",
    "Balance Impact",
    "From Email Address",
  ];

  const activeHeaders = headers.map((header) => {
    return defaultHeaders.findIndex((i) => i === header) > -1
      ? {
          title: header,
          field: removeWhiteSpace(header),
        }
      : {
          title: header,
          field: removeWhiteSpace(header),
          hidden: true,
        };
  });

  await UserSettings.create({
    paypalFilterHeaders: headers,
    paypalActiveHeaders: activeHeaders,
  });
};

seedDB();
