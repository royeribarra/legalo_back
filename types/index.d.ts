//NodeJs.process.env

declare namespace NodeJS{
  interface ProcessEnv{
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    HASH_SALT: number;
    JWT_SECRET: string;
    MAIL_HOST: string;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
    MAIL_FROM: string;
    REACT_APP_URL: string;
  }
}