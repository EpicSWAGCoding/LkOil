const accountSid = 'AC7f2dfcd203b72e8502dc152cd4daa673';
const authToken = '1e2ea7af46119fdd11a7526b50d8c6f0';
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services("VAbff80c57bd66a2c63cef7d683f4178f3")
    .verifications
    .create({to: '+79259044726', channel: 'sms'})
    .then(verification => console.log(verification.sid));