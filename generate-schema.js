const fs = require('fs');
const path = require('path');

const provider = process.env.PROVIDER;
const url = process.env.DATABASE_URL;

console.log('Environment Variables:', process.env);
console.log('Using provider:', provider);
console.log('Using database URL:', url);

const schemaDir = path.join(__dirname, 'prisma');
const schemaPath = path.join(schemaDir, 'schema.prisma');

const schema = `
datasource db {
  provider = "${provider}"
  url      = "${url}"
}

generator client {
  provider = "prisma-client-js"
}

generator erd {
  provider = "prisma-erd-generator"
  output = "./ERD.md"
}
`;

// Ensure the prisma directory exists
if (!fs.existsSync(schemaDir)) {
  console.log('Creating prisma directory');
  fs.mkdirSync(schemaDir);
} else {
  console.log('Prisma directory already exists');
}

// Write the schema.prisma file
fs.writeFileSync(schemaPath, schema);
console.log('Prisma schema file generated at', schemaPath);
