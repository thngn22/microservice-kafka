# Sử dụng image node chính thức
FROM node:22.12.0

# Đặt thư mục làm việc
WORKDIR /usr/src/app

# Copy package.json và cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy mã nguồn vào container (bao gồm mã TypeScript)
COPY . .

# Biên dịch TypeScript
RUN npm run build

# Mở port 5003
EXPOSE 5003

# Chạy ứng dụng
CMD ["npm", "start"]
