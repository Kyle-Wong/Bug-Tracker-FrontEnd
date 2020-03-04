const http = require("http");
const queryString = require("querystring");
const fetch = require("fetch");
const Global = require("./global");
const request = function(serverConfig, path, { body, headers, query }, method) {
  const queryURL = "?" + queryString.stringify(query);
  path = queryURL.length <= 1 ? path : path + queryURL;
  var requestHeaders = Global.corsHeader(headers, method);
  const options = {
    host: serverConfig.host,
    port: serverConfig.port,
    path: path,
    method: method,
    headers: requestHeaders
  };
  console.log(options);
  const req = http.request(options, res => {
    res.setEncoding("utf8");
    res.on("data", async function(chunk) {
      if (res.statusCode !== 200) {
        console.error("Bad API call");
        console.error(res);
        return;
      }
      const { transactionID, requestDelay } = JSON.parse(chunk);
      setTimeout(() => {
        poll(transactionID, requestDelay);
      }, requestDelay);
    });
  });
  req.on("error", err => {
    console.log("Error has occurred");
    console.log(err);
  });
  req.write(JSON.stringify(body));
  req.end();
};

function poll(serverConfig, transactionID, requestDelay) {
  const options = {
    host: serverConfig.host,
    port: serverConfig.port,
    path: "/report",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
      "Access-Control-Request-Method": "GET",
      "Access-Control-Request-Headers": "Content-Type",
      transaction_id: transactionID
    }
  };
  const req = http.request(options, res => {
    res.setEncoding("utf8");
    res.on("data", async function(chunk) {
      if (res.statusCode !== 200) {
        console.error("Bad API call");
        console.error(res);
        return;
      }
      const { transactionID, requestDelay } = JSON.parse(chunk);
      setTimeout(() => {
        poll(transactionID, requestDelay);
      }, requestDelay);
    });
  });
  req.on("error", err => {
    console.log("Error has occurred");
    console.log(err);
  });
  req.end();
}

export default request;
