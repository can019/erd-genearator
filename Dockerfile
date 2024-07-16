# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Install project dependencies
COPY package.json ./
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Install prisma and prisma-erd-generator globally
RUN npm install -g prisma prisma-erd-generator

# Copy and run the schema generation script
COPY generate-schema.js .
# Set the command to run when the container starts
CMD ["sh", "-c", "node generate-schema.js && npx prisma db pull && npx prisma generate"]