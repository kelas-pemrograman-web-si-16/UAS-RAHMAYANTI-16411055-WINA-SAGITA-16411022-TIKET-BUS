'use strict';

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const logger 	   = require('morgan');
const router 	   = express.Router();
const port 	   = process.env.PORT || 9000;
const setUp = require('./setup');
const http = require('http');
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));

require('./routes/UserRoutes')(router);
require('./routes/pesanRoutes')(router)
app.use('/', router);

server.listen(port);
server.on('listening', onListening)
async function onListening() {
    try {
        console.log('try to listen...')
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        setUp.dbConnect()
        //server.database = database
        console.log('Listening on ' + bind)

        //debug('Listening on ' + bind);
    } catch (error) {
        console.log(error)
        console.log('listen failed, try to reconnect in 5 secs...')
        setTimeout(function () {
            onListening()
        }, 5000);
    }
}
//console.log(`App Runs on ${port}`);
