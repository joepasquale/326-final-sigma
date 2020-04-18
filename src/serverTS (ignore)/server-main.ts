'use strict';

import { Database } from './Database';
import { MyServer } from './myserver-routing';

const theDatabase = new Database('mongodb://localhost:27017/shelf');
const theServer = new MyServer(theDatabase);

theServer.listen(4000);
