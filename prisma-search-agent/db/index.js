import { PrismaClient } from '@prisma/client';

const dbConfig = {
  host: 'localhost', 
  user: 'admin',
  password: 'admin123',
  database: 'searchagent',
};

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`,
    },
  },
});

export default prisma
