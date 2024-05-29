import { PrismaClient } from "@prisma/client";

import dotenv from 'dotenv';

dotenv.config();


const dbConfig = {
  host: "searchagent.cxei2towh3wo.eu-central-1.rds.amazonaws.com",
  user: "admin",
  password: process.env.PROD_DB_PW,
  database: "searchagent",
};

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`,
    },
  },
});

export default prisma;
