const Cookies = require("universal-cookie");
const cookies = Cookies.default.prototype;
console.log(Cookies);
const gatewayPort = 9874;
exports.pageUrl = function(path) {
  return `${frontendURL()}/${path}`;
};
function urlComponents() {
  let x = window.location.href.split("/");
  return {
    scheme: x[0] + "//",
    host: x[2].split(":")[0],
    port: x[2].split(":")[1]
  };
}
function frontendURL() {
  const { scheme, host, port } = urlComponents();
  return `${scheme}${host}:${port}`;
}
exports.corsHeader = function(header, method) {
  header["Content-Type"] = "application/json";
  header["Origin"] = "http://localhost:3000";
  header["Access-Control-Request-Method"] = method;
  header["Access-Control-Request-Headers"] = "Content-Type";
  try {
    header["username"] = cookies.get("username");
  } catch (e) {}
  try {
    header["session"] = cookies.get("session");
  } catch (e) {}
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
exports.poll = function(transaction_id, requestDelay, success, error) {
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
        if (data.code >= 400) {
          if (data.code === 408 || data.code === 409) {
            window.location.href = exports.pageUrl("login");
          } else {
            error(data);
          }
        } else if (data.code === 0) {
          success(data);
        } else if (data.code === 201) {
          exports.poll(url, transaction_id, requestDelay, success, error);
        }
      })
      .catch(error);
  }, requestDelay);
};
exports.fetch = function(url, options, success, error = exports.error) {
  fetch(url, options)
    .then(exports.getData)
    .then(data => {
      console.log(data);
      exports.poll(data.transaction_id, data.requestDelay, success, error);
    })
    .catch(error);
};
