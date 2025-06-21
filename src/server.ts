import { PrismaClient } from '@prisma/client';
import app from './app';
import config from './config';

let prisma: PrismaClient;

async function main() {
  prisma = new PrismaClient();

  app.listen(config.port, () => {
    console.info(`Server is listening on port ${config.port}`);
  });
}

main().catch(async e => {
  console.error(e);
  if (prisma) {
    await prisma.$disconnect();
  }
  process.exit(1);
}); 