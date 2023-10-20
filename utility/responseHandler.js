export function responseHandler({error=false,data={},message='',statusCode=200,res}){
       res.json({
        statusCode,
        data,
        error,
        message
       })
}