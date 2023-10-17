import express from "express";
import { logger } from "./Logger.js";
// import { logger } from "./Logger";

const server = express();

const port = 3000;

server.use("", (req, res, next) => {
  logger.info(req.body);
  next();
});

server.get("/", function (req, res){ 
    try{ 
        const token = req.body.token;
        logger.info(token);
    }catch (err) {
      logger.error(err);
    } 
    logger.warn('Welcome to server is called'); 
  res.send("Welcome to server");
 
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
