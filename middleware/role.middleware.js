import { responseHandler } from "../utility/responseHandler.js";
import { updateRoleParamsValidator, updateRoleValidator } from "../utility/validationSchemas/role.validation.js"


export const updateRoleMiddleware = (req,res,next)=>{
    console.log("updateRoleMiddleware called");
   const {error} = updateRoleParamsValidator.validate(req.params);
   console.log(error);
   if(error) return responseHandler({res,error:true,message:error.message})

   next();
}