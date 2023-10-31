import jwt from "jsonwebtoken";
import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../utility/constants.js";
import { responseHandler } from "../utility/responseHandler.js";
import { securityConfig } from "../config/dbConfig.js";

export const authUserMiddleware = (req, res, next) => {
    console.log(req.headers.authorization);
    if (req.headers.authorization){
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, securityConfig.jwtSecret);
      console.log("user authenticate successfully: ",decoded);
      req.user = decoded;
      return next();
    } catch (error) {
      return responseHandler({
        error: true,
        message: error.message,
        statusCode: RESPONSE_CODES.FAILURE_FORBIDDEN_ACCESS,
        res
      });
    }
  }
  return responseHandler({
    error: true,
    message: RESPONSE_MESSAGES.Insufficient_data,
    statusCode: RESPONSE_CODES.FAILURE_FORBIDDEN_ACCESS,
    res
  });
};
