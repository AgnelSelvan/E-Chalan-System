const express = require('express');
const app = express();
const cors = require('cors')
const paymentRoute=require('./paytm/paytmRoutes')

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors({origin: true})); 

app.get('/express_backend', (req, res) => {
    res.status(200);

  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const nodemailer = require('nodemailer');

var transport = {
    service: 'gmail',
  auth: {
    user: "agnelselvan01@gmail.com",
    pass: "Pace2012#"
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});
app.use(express.json()); app.post('/send', (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.messageHtml
    const subject = req.body.subject
  
  
    var mail = {
      from: name,
      to: email,  
      subject: "Payment for Fine",
      html: message
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {

        res.json({
          msg: 'fail',
          err: err
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

app.use('/api',paymentRoute);
