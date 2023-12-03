#Onlinecheckwriter Check Mailing Api


### Registration
Plz watch the getting started video from : [https://apiv3.onlinecheckwriter.com/](https://apiv3.onlinecheckwriter.com/) 


Sample Code:

```nodejs
const mailcheck = require('onlinecheckwriter-quickpay')
var check_data = {
    "source" :
    {
        "accountType" : "bankaccount",
        "accountId"   :  ""
    },
    "destination":
    {
        "name": "John Myres",
        "company": "Tyler Payment Technologist",
        "address1" :"5007 richmond rd",
        "address2":"",
        "city":"Tyler",
        "state":"TX",
        "zip":"75701",
        "phone":"9032457713",
        "email":"support@onlinecheckwriter.com"
    },

    "payment_details":
    {
        "amount":500,
        "memo":"for game",
        "note": "Note For Internal Purpose"
    }

}

mailcheck.setToken("");
mailcheck.setEnviorment("SANDBOX");
check = mailcheck.createCheck(check_data);
console.log(sent_mail);




```