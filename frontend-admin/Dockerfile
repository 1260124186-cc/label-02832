# ============================================
# 京东商城管理后台 - Docker构建文件
# 支持 ARM64 (Apple Silicon) 和 AMD64 (x86) 架构
# ============================================

# 阶段1: 构建阶段
# 使用 node:20-alpine 官方多架构镜像
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖 (使用国内镜像加速)
RUN npm install --registry=https://registry.npmmirror.com

# 复制源代码
COPY . .

# 构建生产版本
RUN npm run build

# ============================================
# 阶段2: 生产阶段
# 使用 nginx:alpine 官方多架构镜像
# 支持 linux/amd64, linux/arm64
FROM nginx:alpine

# 设置时区为上海
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

# 复制构建产物到nginx目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 8081

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8081/ || exit 1

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
