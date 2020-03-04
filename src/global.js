const gatewayPort = 9874;

exports.corsHeader = function(header, method) {
  header["Content-Type"] = "application/json";
  header["Origin"] = "http://localhost:3000";
  header["Access-Control-Request-Method"] = method;
  header["Access-Control-Request-Headers"] = "Content-Type";
  return header;
};
exports.options = function(header, body, method) {
  let options = {
    headers: exports.corsHeader(header),
    method: method,
    mode: "cors"
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
};
exports.gatewayUrl = function(path) {
  return `http://localhost:${gatewayPort}/${path}`;
};
exports.error = function(error) {
  console.error(error);
  alert(error.message);
};
exports.getData = function(data) {
  return data.json();
};
exports.poll = function(transaction_id, requestDelay, next) {
  const url = exports.gatewayUrl("report");
  const options = exports.options(
    { transaction_id: transaction_id },
    null,
    "GET"
  );
  setTimeout(() => {
    fetch(url, options)
      .then(exports.getData)
      .then(data => {
        console.log("HEY");
        if (data.code >= 400) {
          exports.error(data);
        } else if (data.code === 0) {
          next(data);
        } else if (data.code === 201) {
          exports.poll(url, transaction_id, requestDelay, next);
        }
      })
      .catch(exports.error);
  }, requestDelay);
};
exports.fetch = function(url, options, next) {
  fetch(url, options)
    .then(exports.getData)
    .then(data => {
      console.log(data);
      exports.poll(data.transaction_id, data.requestDelay, next);
    })
    .catch(exports.error);
};
