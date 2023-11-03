import dotenv from 'dotenv';

dotenv.config();

const FRONT_URL = process.env.FRONT_URL || 'http://localhost:4200';
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_DBNAME = '';
const MONGO_HOST = process.env.MONGO_HOST || '';
const MONGO_URL =
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}` ||
  '';

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: MONGO_URL,
  dbName: MONGO_DBNAME,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const PORT = process.env.PORT || 3002;

const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 21600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'jwt-issuer';
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || 'jwt-3ncrypt3d-p4ssw0rd';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  frontUrl: FRONT_URL,
  port: PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};

const EMAIL_CONFIG = {
  user: process.env.EMAIL_USER || 'a9c799cf681af1',
  pass: process.env.EMAIL_PASS || 'bc8a20269d161e',
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.EMAIL_PORT || '2525',
};

const config = {
  mongo: MONGO,
  server: SERVER,
  email: EMAIL_CONFIG,
};

export default config;
