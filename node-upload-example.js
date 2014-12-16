/* NodeUploadExample
 * basic upload server example
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.NodeUploadExample = factory();
  }
}(this, function() {
    var express = require('express'),
        fstream = require('fstream'),
        fs = require('fs'),
        busboy = require('connect-busboy'),
        NodeUploadExample = express.Router();
    
    NodeUploadExample.use(busboy());

    NodeUploadExample.post('/', function(req, res) {
        if(typeof req.busboy !== 'undefined') {
            req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
                file.pipe(fstream.Writer({path: 'example.dat'}));
                fs.writeFile('example.mime', mimetype);
                res.json('ok');
            });

            req.pipe(req.busboy);
        } else {
            res.json('req.busboy undefined');
        }
    });

    NodeUploadExample.get('/', function(req, res) {
        if(fs.existsSync('example.dat') && fs.existsSync('example.mime')) {
            res.sendFile('example.dat', {
                root: process.cwd(),
                headers: {
                    'Content-Type': fs.readFileSync('example.mime')
                }
            });
        } else {
            res.json('example.dat || example.mime do not exist');
        }
    });

    return NodeUploadExample;
}));
