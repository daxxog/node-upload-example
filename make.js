/* NodeUploadExample / make.js
 * echo 'make script for NodeUploadExample' && node make
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var bitfactory = require('bitfactory'),
    UglifyJS = require("uglify-js"),
    stoptime = require('stoptime'),
    fs = require('fs');

var watch = stoptime(),
    header = '';

bitfactory.make({ //routes
    "": function(err, results) {
        console.log('built NodeUploadExample in ' + watch.elapsed() + 'ms.');
    }
}, { //dependencies
    "*": { //wildcard
        "header": function(cb) {
            fs.readFile('node-upload-example.h', 'utf8', function(err, data) {
                header = data;
                cb(err);
            });
        },
        "node-upload-example.min.js": ["header", function(cb) {
            fs.writeFileSync('node-upload-example.min.js', header + UglifyJS.minify('node-upload-example.js').code);
            cb();
        }]
    }
});