import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export const sendMail = async (
  sender: string,
  subject: string,
  text: string
): Promise<SMTPTransport.SentMessageInfo> => {
  const dummyUser = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: dummyUser.smtp.host,
    port: dummyUser.smtp.port,
    secure: dummyUser.smtp.secure,
    auth: {
      user: dummyUser.user,
      pass: dummyUser.pass,
    },
  })

  const test = await transporter.sendMail({
    from: sender,
    sender: sender,
    to: [
      '13519143@std.stei.itb.ac.id',
      '13519163@std.stei.itb.ac.id',
      '13519215@std.stei.itb.ac.id',
    ],
    subject: subject,
    date: new Date(),
    text: text,
    html: text,
  })
  return test
}
