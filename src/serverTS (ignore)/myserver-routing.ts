const express = require('express');
import { Login, loginRouter } from './routes/login';

export class MyServer {

    private db;
    private server = express();
    private router = express.Router();
    private login;

    constructor(db) {
        this.db = db;
        //this.login = new Login(db);
        // from https://enable-cors.org/server_expressjs.html
        this.router.use((request, response, next) => {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.server.use('/', express.static('../public'));
        this.server.use('/login', loginRouter);
    

    }

    public listen(port): void {
        this.server.listen(port, () => console.log(`Server listening on ${port}`));
    }

}

