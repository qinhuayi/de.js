echo off
echo compress es5/de.js to es5/de.min.js
call uglifyjs es5/de.js -m -c -o "es5/de.min.js"
echo compress es6/de.js to es6/de.min.js
call uglifyjs es6/de.js -m -c -o "es6/de.min.js"
