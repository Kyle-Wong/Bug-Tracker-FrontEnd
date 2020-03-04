const gatewayPort = 9874;

exports.corsHeader = function(header, method) {
  header["Content-Type"] = "application/json";
  header["Origin"] = "http://localhost:3000";
  header["Access-Control-Request-Method"] = method;
  header["Access-Control-Request-Headers"] = "Content-Type";
  return header;
};
exports.gatewayUrl = function(path) {
  return `http://localhost:${gatewayPort}/${path}`;
};
