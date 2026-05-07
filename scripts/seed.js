const fs = require("fs");
const path = require("path");

const file = path.join(process.cwd(), "data", "locations.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

console.log(`Seed data ready: ${data.length} synthetic locations`);
console.log("In production, this script should write records to PostgreSQL/PostGIS.");
