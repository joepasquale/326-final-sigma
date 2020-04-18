'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./Database");
var myserver_routing_1 = require("./myserver-routing");
var theDatabase = new Database_1.Database('mongodb://localhost:27017/shelf');
var theServer = new myserver_routing_1.MyServer(theDatabase);
theServer.listen(4000);
//# sourceMappingURL=server-main.js.map