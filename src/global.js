import Cookies from "universal-cookie";
import QueryString from "querystring";
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
  baseUrl(baseLength = 1) {
    let getUrl = window.location;
    let url = getUrl.protocol + "//" + getUrl.host;
    for (let i = 0; i < baseLength; i++) {
      url += "/" + getUrl.pathname.split("/")[i + 1];
    }
    return url;
  },
  addQuery(baseUrl, queryJs) {
    baseUrl += "?" + QueryString.stringify(queryJs);
    return baseUrl;
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
      headers: this.corsHeader(header, method),
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
            this.poll(transaction_id, requestDelay, success, error);
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
        if (data.code === 0)
          this.poll(data.transaction_id, data.requestDelay, success, error);
        else if (
          data.code === 416 ||
          data.code === 417 ||
          data.code === 408 ||
          data.code === 409
        ) {
          window.location.href = this.pageUrl("login");
        } else error(data);
      })
      .catch(error);
  },
  verifySession(success, error = this.error) {
    let cookies = new Cookies();
    const url = this.gatewayUrl("idm/verifySession");
    console.log(url);
    const body = {
      username: cookies.get("username"),
      sessionID: cookies.get("session")
    };
    let options = Global.options({}, body, "POST");
    console.log(options);
    this.fetch(
      url,
      options,
      res => {
        success(res);
      },
      res => {
        if (res.code === 403) {
          window.location.href = this.pageUrl("login");
        } else error(res);
      }
    );
  },
  convertToDate(timestamp) {
    return new Date(timestamp).toLocaleString();
  }
};
export default Global;
