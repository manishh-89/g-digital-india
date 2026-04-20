const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'my491448@gmail.com',
    pass: 'dfqq mdai unxt pqmr', 
  },
});

async function test() {
  console.log('Sending test email...');
  try {
    const info = await transporter.sendMail({
      from: 'my491448@gmail.com',
      to: 'my491448@gmail.com',
      subject: 'Test Email GDI',
      text: 'If you see this, the email credentials are correct!',
    });
    console.log('Email sent successfully:', info.messageId);
  } catch (err) {
    console.error('Email failed:', err);
  }
}

test();
