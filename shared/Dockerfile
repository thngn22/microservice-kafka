# Dockerfile cho shared-service (shared)
FROM node:22.12.0

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép mã nguồn
COPY . .

# Biên dịch TypeScript
RUN npm run build

# Cấu hình port nếu cần
EXPOSE 5004

# Lệnh để chạy service khi container được khởi động
CMD ["node", "dist/index.js"]
