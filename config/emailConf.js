const NodeMailer = require('nodemailer');
let email = {};

email.transporter = NodeMailer.createTransport({
    service:'Gmail',
        auth:{
            user:'geekshubstravel@gmail.com',
            pass:'25636963652mM'
        }
    },
    {
        from:'GeeksHubs Travels <geekshubstravel@gmail.com>',
        headers:{}
    })
module.exports = email;