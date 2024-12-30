# Sử dụng image node chính thức
FROM node:22.12.0

# Đặt thư mục làm việc
WORKDIR /usr/src/app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy mã nguồn vào container
COPY . .

# Biên dịch TypeScript
RUN npm run build

# Mở port 5001
EXPOSE 5001

# Chạy ứng dụng
CMD ["npm", "start"]
