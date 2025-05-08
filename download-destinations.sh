#!/bin/bash

# 目标目录
DEST_DIR="public/images/destinations"
mkdir -p "$DEST_DIR"

# 下载图片函数
download_image() {
  local destination=$1
  local filename=$2
  local query="${destination// /+}+travel+destination+landscape"
  
  echo "下载 $destination 图片 -> $filename"
  
  # 使用Unsplash API（不需要API密钥的简单方式）
  curl -s "https://source.unsplash.com/1200x800/?$query" -o "$DEST_DIR/$filename" 
  
  # 检查文件大小，确保不是空文件
  filesize=$(stat -f%z "$DEST_DIR/$filename" 2>/dev/null || stat -c%s "$DEST_DIR/$filename")
  if [ "$filesize" -lt 1000 ]; then
    echo "警告: $filename 文件大小太小 ($filesize bytes)，可能下载失败，尝试替代方式..."
    curl -s "https://source.unsplash.com/featured/1200x800/?$query" -o "$DEST_DIR/$filename"
  fi
  
  echo "完成: $filename ($(stat -f%z "$DEST_DIR/$filename" 2>/dev/null || stat -c%s "$DEST_DIR/$filename") bytes)"
  # 添加延迟以避免被限制请求
  sleep 1.5
}

# 需要下载的图片列表 - 通过检查发现的空文件或缺失文件
download_image "Banff Canada Rocky Mountains" "banff.jpg"
download_image "Chiang Mai Thailand Temple" "chiangmai.jpg"
download_image "Mexico City Colorful" "mexicocity.jpg"
download_image "Queenstown New Zealand" "queenstown.jpg"
download_image "Reykjavik Iceland" "reykjavik.jpg"
download_image "Serengeti Tanzania Safari" "serengeti.jpg"
download_image "Marrakech Morocco" "marrakech.jpg"
download_image "Patagonia Mountains" "patagonia.jpg"
download_image "Vermont Fall Foliage" "vermont.jpg"
download_image "Great Barrier Reef Australia" "greatbarrierreef.jpg"

echo "所有图片下载完成!"
echo "请确保这些图片已下载成功并且大小合适。" 