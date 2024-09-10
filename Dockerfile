# Menggunakan Node.js sebagai base image untuk build stage
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Menyalin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Menginstal dependencies
RUN npm install

# Menyalin seluruh file aplikasi
COPY . .

# Membangun aplikasi Vue.js
RUN npm run build

# Menggunakan Nginx untuk environment produksi
FROM nginx:alpine

# Menghapus default Nginx config
RUN rm -rf /usr/share/nginx/html/*

# Menyalin file build dari tahap builder ke direktori Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Menyalin konfigurasi Nginx jika diperlukan
# COPY nginx.conf /etc/nginx/nginx.conf

# Mengekspos port 80
EXPOSE 80

# Menjalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
