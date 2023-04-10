const http = require('http');

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({ path: '/dev/ttyAMA0', baudRate: 38400 })
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

const domoIp = "192.168.85.6";
const domoPort = "8080";
const domoPath = "/json.htm?type=command&param=udevice&idx=";

let options = {
    host: domoIp,
    port: domoPort,
    path: ''
};

parser.on('data', (data)=>{
    console.log("Raw data = " + data);

    const values = data.split(' ');

    {
        console.log("Puissance chaudiere = " + values[1] + " Watts");
        options.path = domoPath + '1571' + '&svalue=' + values[1];
        let req = http.request(options);

        req.on('error', function (e) {
            console.error("Request failed");
            console.error(e);
        });
        req.on('timeout', function () {
            console.log("Request timeout");
        });
        req.end();
    }

    {
        console.log("Puissance ECS = " + values[2] + " Watts");
        options.path = domoPath + '1570' + '&svalue=' + values[2];
        let req = http.request(options);

        req.on('error', function (e) {
            console.error("Request failed");
            console.error(e);
        });
        req.on('timeout', function () {
            console.log("Request timeout");
        });
        req.end();
    }

    {
        console.log("Puissance PC Bureau = " + values[3] + " Watts");
        options.path = domoPath + '1572' + '&svalue=' + values[3];
        let req = http.request(options);

        req.on('error', function (e) {
            console.error("Request failed");
            console.error(e);
        });
        req.on('timeout', function () {
            console.log("Request timeout");
        });
        req.end();
    }

});