import { Sequelize } from "sequelize";
import { dbConfig } from "../config/dbConfig.js";
const db = new Sequelize(
  dbConfig.dbname,
  dbConfig.userName,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

db.authenticate()
  .then(async () => {
    console.info("database is connected");

    db.sync()
      .then(() => {
        console.log("All table create successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });

export { db };
