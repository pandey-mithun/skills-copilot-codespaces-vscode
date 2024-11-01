// create web server
var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require('querystring');

var comments = [];

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == "/") {
        // show index.html
        fs.readFile("./index.html", function (err, data) {
            res.end(data);
        });
    } else if (pathname == "/comment") {
        // add comment
        var str = "";
        req.on("data", function (chunk) {
            str += chunk;
        });

        req.on("end", function () {
            var obj = querystring.parse(str);
            comments.push(obj);
            res.end(JSON.stringify(comments));
        });
    } else {
        // show 404 page
        fs.readFile("./404.html", function (err, data) {
            res.end(data);
        });
    }
}).listen(3000, function () {
    console.log("server is listening on port 3000");
});