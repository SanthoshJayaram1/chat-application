const nodemailer = require('nodemailer')

const MAIL_SENDER_EMAIL = process.env.MAIL_SENDER_ADDRESS
const MAIL_PASSWORD=process.env.MAIL_PASSWORD

const sendMail = async(to, url, text) => {

  try {
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: MAIL_SENDER_EMAIL,
        pass:MAIL_PASSWORD,
      }
    })

    const options = {
      from: MAIL_SENDER_EMAIL,
      to,
      subject: `WeChat - ${text}`,
      html: `
        <div style="border: 5px solid #ccc; padding: 15px;">
          <h1 style="text-align: center;">WeChat ${text}</h1>
          <p>Please click below button to proceed the chosen action</p>
          <a style="display: block; text-decoration: none; background: orange; color: #fff; width: 130px; height: 35px; text-align: center; line-height: 35px; margin-top: 15px" href=${url}>Click Me</a>
          <div style="margin-top: 20px;">
            <p>Thank you for using <strong>WeChat</strong> for chatting with people around the world
            <p>Warm Regards,</p>
            <p>- WeChat Team -</p>
          </div>
        </div>
      `
    }

    const result = await transport.sendMail(options)
    return result
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = sendMail