import path from "path";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getData = (...items) => {
  return Object.fromEntries(
    items.map((item) => {
      return [
        item,
        JSON.parse(
          fs.readFileSync(join(__dirname, `data/${item}.json`), "utf-8"),
        ),
      ];
    }),
  );
};

const db = getData(
  "characters",
  "planets",
  "vehicles",
  "affiliations",
  "starships",
  "species",
);

fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(db, null, 2));

console.log("db.json has been created successfully!");
