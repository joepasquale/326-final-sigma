export const loginRouter = require('express').router;


const bcrypt = require('bcrypt');

export class Login {

    private db;
    constructor(db) {
        this.db = db;
        // from https://enable-cors.org/server_expressjs.html
        loginRouter.use((request, response, next) => {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        loginRouter.post('/register', this.loginHandler.bind(this));
          
    }

    private async loginHandler(req, res): Promise<void> {
        console.log('test');
    }


     

}

