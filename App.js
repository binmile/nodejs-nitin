import Express from 'express';

global.app = Express();

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

