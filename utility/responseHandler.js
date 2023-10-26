import { RESPONSE_CODES } from "./constants.js";

export function responseHandler({error=false,data={},message='',statusCode=RESPONSE_CODES.SUCCESS_OK,res}){
       res.json({
        statusCode,
        data,
        error,
        message
       })
}