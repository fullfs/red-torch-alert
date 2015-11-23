var request = require('request');
var nodemailer = require('nodemailer');

request.post(
    'http://www.red-torch.ru/gateway/order/', {
      form: {
        Query: 'GetHall',
        Uid: 'c19a56095ede02d179c848e9719e8b90',
        IdPerformance: 1904040
      }
    },
    function (error, response, body) {
      var matrix = {};
      var filtered = [];
      JSON.parse(body).Hall.forEach(function(item) {
        if (item.State != 5 && item.PosY <= 850) {
          filtered.push(item);
          matrix[item.PosX] = true;
        }
      });

      for (var i = filtered.length - 1; i >= 0; i--) {
        if (
          matrix[Number(filtered[i].PosX) + 50] &&
          matrix[Number(filtered[i].PosX) - 50]
        ) {
          console.log('ЕСТЬ ПОДХОДЯЩИЕ МЕСТА');
          break;
        } else {
          console.log('Мест нет :(');
          break;
        }
      };
    }
);



// create reusable transporter object using SMTP transport 
var transporter = nodemailer.createTransport();
 
transporter.sendMail({
    from: 'sender@address',
    to: 'raiky@yandex.ru',
    subject: 'hello',
    text: 'hello world!'
});

return;
// NB! No need to recreate the transporter object. You can use 
// the same transporter object for all e-mails 
 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: 'Andrey Solodovnikov <fullfs@gmail.com>', // sender address 
    to: 'raiky@yandex.ru', // list of receivers 
    subject: 'Есть места!!!', // Subject line 
    // text: 'Hello world ✔', // plaintext body 
    html: '<a href="http://www.red-torch.ru/order/?4334">http://www.red-torch.ru/order/?4334</a>' // html body 
};
 
// send mail with defined transport object 
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});