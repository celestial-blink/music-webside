const nodemailer = require('nodemailer');
const sendMail=async(data)=>{
    let transporter=nodemailer.createTransport({
        service:"hotmail",
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.CB_EMAIL,
            pass: process.env.CB_PASSWORD
        }
    });
let contenido="<div style='background-color:#B2B2B2; height:500px; width:100%'>"+
"<span style='display:flex; height:100px; width:100%; background-color:black; justify-content:center; align-items:center;'>"+
"<h2 style='color:white; margin:0; padding:0; text-align:center; font-family:Verdana'>Celestial blink</h2>"+
"</span>"+
`<h3 style='color:white;'>${data.code}</h3>`
+"</div>";


  // send mail with defined transport object
  let info = await transporter.sendMail({
    // from: '"Fred Foo 👻" <tenge_luna@outlook.com>', // sender address
    from:process.env.CB_EMAIL,
    to: data.email, // list of receivers
    subject: "Código de recuperación de cuenta", // Subject line
    html: contenido, // html body
  });

  return info;

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}
// sendMail({}).catch(console.error);
module.exports= {sendMail}