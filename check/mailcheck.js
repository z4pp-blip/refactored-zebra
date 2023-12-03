const mailcheck = require('onlinecheckwriter-quickpay');
const Jimp = require('jimp');
const fs = require('fs');
const config = require('./config');

const TOKEN = config.token
const ACCOUNT_ID = config.accountId
// Set your token and environment
mailcheck.setToken(TOKEN);
mailcheck.setEnviorment("SANDBOX");

const check_data = {
  "source": {
    "accountType": "bankaccount",
    "accountId": ACCOUNT_ID
  },
  "destination": {
    "name": "John Myres",
    "company": "Tyler Payment Technologist",
    "address": "5007 richmond rd",
    "city": "Tyler",
    "state": "TX",
    "zip": "75701",
    "phone": "9032457713",
    "email": "support@onlinecheckwriter.com"
  },
  "payment_details": {
    "amount": 500,
    "memo": "for game",
    "note": "Note For Internal Purpose"
  }
};


// Specify the paths for your template and output image
async function addCheckContentsToImage(check_data, templatePath, outputPath) {
    try {
        console.log('Reading the template image...');  
      // Read the check template image
      const template = await Jimp.read(templatePath);
      console.log('Template image read successfully.');
      console.log('Adding text to the image...');
      // Add text to the image
      template.print(
        // Use your preferred font and size
        await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE),
        // Adjust the coordinates and content according to your template
        50, 80,
        `Pay to the Order of\nName: ${check_data.destination.name}\nCompany: ${check_data.destination.company}\nAddress: ${check_data.destination.address1}, ${check_data.destination.city}, ${check_data.destination.state} ${check_data.destination.zip}\nAmount: $${check_data.payment_details.amount.toFixed(2)}\nMemo: ${check_data.payment_details.memo}\nNote: ${check_data.payment_details.note}`
      );

      console.log('Text added successfully.');
      console.log('Saving the modified image...');
  
      // Save the modified image
      await template.writeAsync(outputPath);
      console.log(`Check image saved to ${outputPath}`);
    } catch (error) {
      console.error('Error adding check contents to the image:', error);
    }
  }
  
  const templatePath = 'checktemplate.png';
  const outputPath = 'outputCheck.png';

// Run the check creation operation
mailcheck.createCheck(check_data, (err, sent_mail) => {
  if (err) {
    console.error('Error creating check:', err);
  } else {
    console.log('Check created successfully:', sent_mail);
    // Trigger the PDF creation after check creation
    addCheckContentsToImage(check_data, templatePath, outputPath);
  }
});
