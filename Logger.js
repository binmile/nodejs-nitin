import { createLogger, format, transports } from "winston";


const logger = createLogger({ 
    level:'info',
    transports: [  
        new transports.Console(),
        new transports.File({ filename: `combined-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.log`,level: "info", dirname:'logs'}),
        new transports.File({ filename: `error-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.log`,level:'error',dirname:'logs' }),
      ],
      format:format.combine(format.timestamp(),format.json(),format.prettyPrint())
  });
  export {logger};