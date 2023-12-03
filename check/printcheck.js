const printcheck = require('onlinecheckwriter-quickpay');
const config = require('./config');

const TOKEN = config.token
const check_data = {
  "paperType": 1,
  "checkId": [
    "5NrWjy8Y0me2n3l",
    "fdgbL3YGddxmLG1X7wdfgdf"
  ]
}

printcheck.setToken(TOKEN);
printcheck.setEnviorment("SANDBOX");
check = printcheck.printCheck(check_data);
console.log(check_data);