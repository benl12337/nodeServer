var http = require('http');
var url = require('url');
var fs = require('fs');

const errPage = fs.readFileSync('./404.html', function(err,data){
    if (err) throw err;
    return data;
})

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const filename = "." + q.path + ".html";
    console.log(q.path == '/');
    const reRouted = q.path == '/' ? './index.html' : filename;

    fs.readFile(reRouted, function (err, data) {
        if (err) {
            // open the 404 file
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(errPage);
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);