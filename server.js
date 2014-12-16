/* NodeUploadExample / server.js
 * basic upload server example
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var express = require('express'),
    Busboy = require('connect-busboy'),
    app = express(),
    NodeUploadExample = require('./node-upload-example.min.js');

app.use('/upload', NodeUploadExample);
app.listen(7777);
console.log('serving NodeUploadExample on http://localhost:7777/upload');