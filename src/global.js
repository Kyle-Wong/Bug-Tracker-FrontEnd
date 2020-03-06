import Cookies from "universal-cookie";
const gatewayPort = 9874;

const Global = {
  pageUrl(path) {
    return `${this.frontendURL()}/${path}`;
  },
  urlComponents() {
    let x = window.location.href.split("/");
    return {
      scheme: x[0] + "//",
      host: x[2].split(":")[0],
      port: x[2].split(":")[1]
    };
  },
  frontendURL() {
    const { scheme, host, port } = this.urlComponents();
    return `${scheme}${host}:${port}`;
  },
  corsHeader(header, method) {
    header["Content-Type"] = "application/json";
    header["Origin"] = "http://localhost:3000";
    header["Access-Control-Request-Method"] = method;
    header["Access-Control-Request-Headers"] = "Content-Type";
    let cookies = new Cookies();
    if (cookies.get("username") != null)
      header["username"] = cookies.get("username");
    if (cookies.get("session") != null)
      header["session"] = cookies.get("session");
    return header;
  },
  options(header, body, method) {
    let options = {
      headers: this.corsHeader(header),
      method: method,
      mode: "cors"
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return options;
  },
  gatewayUrl(path) {
    return `http://localhost:${gatewayPort}/${path}`;
  },
  error(error) {
    console.error(error);
    alert(error.message);
  },
  getData(data) {
    return data.json();
  },
  poll(transaction_id, requestDelay, success, error) {
    const url = this.gatewayUrl("report");
    const options = this.options(
      { transaction_id: transaction_id },
      null,
      "GET"
    );
    setTimeout(() => {
      fetch(url, options)
        .then(this.getData)
        .then(data => {
          if (data.code >= 400) {
            if (data.code === 408 || data.code === 409) {
              window.location.href = this.pageUrl("login");
            } else {
              error(data);
            }
          } else if (data.code === 0) {
            success(data);
          } else if (data.code === 201) {
            this.poll(url, transaction_id, requestDelay, success, error);
          }
        })
        .catch(error);
    }, requestDelay);
  },
  fetch(url, options, success, error = this.error) {
    fetch(url, options)
      .then(this.getData)
      .then(data => {
        console.log(data);
        this.poll(data.transaction_id, data.requestDelay, success, error);
      })
      .catch(error);
  }
};
export default Global;
