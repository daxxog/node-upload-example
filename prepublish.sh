#!/bin/sh
# NodeUploadExample / prepublish.sh
# prepublish script for NodeUploadExample
# (c) 2014 David (daXXog) Volm ><> + + + <><
# Released under Apache License, Version 2.0:
# http://www.apache.org/licenses/LICENSE-2.0.html  
#################################################

if [ ! -f com-npm-install ]; then
	node make
	rm npm-debug.log >> /dev/null
	mv node-upload-example.js ../.tmp.js
	mv node-upload-example.h ../.tmp.h
else
	rm com-npm-install
fi