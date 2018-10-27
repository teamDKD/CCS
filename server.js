// JavaScript source code
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const sha = require('sha.js');
const KeyEncoder = require('key-encoder'), keyEncoder = new KeyEncoder('secp256k1');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const c001_path = __dirname + '/database/c001.dkd';
let a1;
const a2 = 0x04;
let k1;
let pk2 = sha('sha256').update('121212121212121212121212').digest('hex');
const k2 = keyEncoder.encodePrivate(pk2, 'raw', 'der');

console.log(k2);

const defaultFrame = [10, 10, "000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff000000ffffff"]


app.post('/cctv', function(req, res) {
    const frame = [req.body.frame1 * 1, req.body.frame2 * 1, req.body.frame3];
    const vital = [req.body.vital1, req.body.vital2, req.body.vital3, req.body.vital4];
    const d = new Date();
    fs.writeFileSync(c001_path, d, 'utf8');
    fs.appendFileSync(c001_path, "\n" + [frame, vital], 'utf8');
    res.send("<script>location.href = '/';</script>");
    console.log(d + " written.");
});

app.post('/getkey', function(req, res) {
    k1 = req.body.key;
})


http.createServer(app).listen(80, function () {
   console.log('Server running at 127.0.0.1');
});