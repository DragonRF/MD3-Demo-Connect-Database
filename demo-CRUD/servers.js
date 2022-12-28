const http = require('http');
const url = require('url');
const handler = require('./controller/router');
const NotFoundRouting = require('./controller/handler/notFoundRouting')

function getUrl(req) {
    const urlParse = url.parse(req.url, true);
    const pathName = urlParse.pathname;
    return pathName.split('/');
}

const servers = http.createServer((req, res) => {
    const arrPath = getUrl(req);
    let trimPath = '';
    let id = '';
    if (arrPath.length > 2) {
        trimPath = arrPath[1] + '/' + arrPath[2];
        id =  arrPath[3]
    } else {
        trimPath = arrPath[arrPath.length - 1];

    }
    let chosenHandler;
    if (typeof handler[trimPath] === 'undefined') {
        chosenHandler = NotFoundRouting.showNotFound
    } else {
        chosenHandler = handler[trimPath]
    }
    chosenHandler(req, res,+arrPath[3],id)
})
servers.listen(3000, () => {
    console.log(`server is running : http://localhost:3000/home`)
})
