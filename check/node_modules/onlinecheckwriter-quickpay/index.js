var api_lkey = "";
var enviorment = "SANDBOX";

function setToken(token) {
  api_key = token;
}

function setEnviorment(value) {
  enviorment = value;
}

function sentRequest(resource_uri, data, request_method = "POST") {
  if (enviorment == "SANDBOX" || enviorment == "") {
    base_url = "https://test.onlinecheckwriter.com/api/v3";
  }
  if (enviorment == "LIVE") {
    base_url = "https://app.onlinecheckwriter.com/api/v3";
  }

  if (api_key == "") {
    return "Api token not found";
  }

  var request = require("sync-request");
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + api_key
  };

  var res = request(request_method, base_url + resource_uri, {
    json: data,
    headers: headers
  });

  response = JSON.parse(res.getBody("utf8"));
  return response;
}


function createCheck(data) {
  return sentRequest("/quickpay/check", data);
}

function sentPhysicalCheck(data) {
  return sentRequest("/quickpay/mailcheck", data);
}

function sentEcheck(data) {
  return sentRequest("/quickpay/echeck", data);
}

function sentDirectDeposit(data) {
  return sentRequest("/quickpay/directdeposit", data);
}

function sentVirtualCard(data) {
  return sentRequest("/quickpay/virtualcard", data);
}


function sentWire(data) {
  return sentRequest("/quickpay/wire", data);
}
   
module.exports.setToken = data => setToken(data);
module.exports.setEnviorment = data => setEnviorment(data);
module.exports.createCheck = data => createCheck(data);
module.exports.sentPhysicalCheck = data => sentPhysicalCheck(data);
module.exports.sentDirectDeposit = data => sentDirectDeposit(data);
module.exports.sentVirtualCard = data => sentVirtualCard(data);
module.exports.sentWire = data => sentWire(data);


