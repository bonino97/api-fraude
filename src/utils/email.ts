import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { logging } from './logging';

dotenv.config();

const NAMESPACE = 'Email Helper';
const DOMAIN = 'lalibertadavanza.com';

const EMAIL_CONFIG = {
  user: process.env.EMAIL_USER || 'a9c799cf681af1',
  pass: process.env.EMAIL_PASS || 'bc8a20269d161e',
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.EMAIL_PORT || '2525',
};

const transport = nodemailer.createTransport({
  host: EMAIL_CONFIG.host,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass,
  },
  logger: true,
});

const sendMail = async (options: any) => {
  try {
    const emailOptions = {
      from: `LA LIBERTAD AVANZA <no-reply@${DOMAIN}>`,
      to: options?.user?.email,
      subject: options?.subject,
      html: options?.html,
    };

    const sendMail = await transport.sendMail(emailOptions);
    return sendMail;
  } catch (error: any) {
    return logging.error(NAMESPACE, 'Send Email Method', error);
  }
};

export default sendMail;
