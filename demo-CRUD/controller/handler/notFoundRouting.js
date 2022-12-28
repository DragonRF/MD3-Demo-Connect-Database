const fs = require('fs');
class NotFoundRouting{
    static  showNotFound(req,res){
        fs.readFile('./view/notFound/notFound.html','utf-8',(err,notFound)=>{
            if(err){
                console.log(err);
            }else {
                res.writeHead(200, 'text/html');
                res.write(notFound)
                res.end()
            }
        })
    }
}
module.exports = NotFoundRouting;
