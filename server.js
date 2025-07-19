const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure your email transport (use your real credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: 'akshayamanivannan3008@gmail.com', // your email
    pass: 'vbozltwsvxwermnl' // your app password (not your real password)
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await transporter.sendMail({
      from: 'akshayamanivannan3008@gmail.com', // must match your Gmail user
      to: 'akshayamanivannan3008@gmail.com', // your real email
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    if (err.response) {
      console.error('SMTP response:', err.response);
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});