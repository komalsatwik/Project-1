const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req,res) => {
    const num = _.random(0,50);
    console.log(num);

    let path = './module/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/new':
            path += 'new.html';
            res.statusCode = 200;
            break;
        case '/new-me':
            res.statusCode = 301;
            res.setHeader('Location','/new');
            res.end();
            break;
        default: 
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    res.setHeader('Content-Type', 'Text/html');
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }else {
            res.end(data);
        }
    })
    
});
server.listen(3000,'localhost',()=> {
    console.log('listening for requests on port 3000');
});