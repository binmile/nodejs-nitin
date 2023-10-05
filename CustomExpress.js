import http from 'http';

export default class CustomExpress {
    constructor(port=8000){
        this.server = http.createServer();
        this.server.listen(port)
    }
    
    get(path,callback){
        this.server.on('request',(req,res)=>{
            if(req.method === 'GET' && req.url === path){
                callback(res,res);
                res.end();
            }
        })
    }

    post(path,callback){
        this.server.on('request',(req,res)=>{
            if(req.method === 'POST' && req.url === path){
                callback(res,res);
                res.end();

            }
        })
    }

    put(path,callback){
        this.server.on('request',(req,res)=>{
            if(req.method === 'PUT' && req.url === path){
                callback(res,res);
                res.end();
            }
        })
    }

    patch(path,callback){
        this.server.on('request',(req,res)=>{
            if(req.method === 'PATCH' && req.url === path){
                callback(res,res);
                res.end();
            }
        })
    }

    delete(path,callback){
        this.server.on('request',(req,res)=>{
            if(req.method === 'DELETE' && req.url === path){
                callback(res,res);
                res.end();
            }
        })
    }
}