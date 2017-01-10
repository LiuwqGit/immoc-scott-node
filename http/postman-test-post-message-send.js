var http = require("http");

var options = {
  "method": "POST",
  "hostname": "10.10.17.16",
  "port": "30005",
  "path": "/api/message/send",
  "headers": {
    "content-type": "application/json"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ meetingId: 'string222222222222222222',
  msgContent: 'qwer',
  msgType: 0,
  senderId: 'qwer',
  senderImage: 'qwer',
  senderName: 'qwer' }));
req.end();