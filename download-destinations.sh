#!/bin/bash

# 创建目录
mkdir -p public/images/destinations

# 基本图片集合 (已下载过的不再重复下载)
echo "Downloading destination images..."

# 亚洲
curl -o "public/images/destinations/seoul.jpg" "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?q=80" -s
curl -o "public/images/destinations/hoian.jpg" "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80" -s
curl -o "public/images/destinations/chiangmai.jpg" "https://images.unsplash.com/photo-1568642953736-aca0dc6755a9?q=80" -s

# 欧洲
curl -o "public/images/destinations/paris.jpg" "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80" -s
curl -o "public/images/destinations/prague.jpg" "https://images.unsplash.com/photo-1541849546-216549ae216d?q=80" -s
curl -o "public/images/destinations/amalfi.jpg" "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?q=80" -s
curl -o "public/images/destinations/reykjavik.jpg" "https://images.unsplash.com/photo-1504284769725-16594d1c6d72?q=80" -s

# 北美洲
curl -o "public/images/destinations/nyc.jpg" "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80" -s
curl -o "public/images/destinations/vancouver.jpg" "https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80" -s
curl -o "public/images/destinations/mexicocity.jpg" "https://images.unsplash.com/photo-1518659526054-190340b35735?q=80" -s
curl -o "public/images/destinations/banff.jpg" "https://images.unsplash.com/photo-1551776191-985237de83ec?q=80" -s

# 大洋洲
curl -o "public/images/destinations/sydney.jpg" "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80" -s
curl -o "public/images/destinations/queenstown.jpg" "https://images.unsplash.com/photo-1589255885686-1c981c41d54c?q=80" -s

# 南美洲
curl -o "public/images/destinations/rio.jpg" "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80" -s
curl -o "public/images/destinations/machupicchu.jpg" "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80" -s
curl -o "public/images/destinations/patagonia.jpg" "https://images.unsplash.com/photo-1531670578180-e1df93df3a5b?q=80" -s

# 非洲
curl -o "public/images/destinations/capetown.jpg" "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80" -s
curl -o "public/images/destinations/marrakech.jpg" "https://images.unsplash.com/photo-1553603227-2358aabe821f?q=80" -s
curl -o "public/images/destinations/serengeti.jpg" "https://images.unsplash.com/photo-1610139073688-15225ada9f4c?q=80" -s

# 风景/自然
curl -o "public/images/destinations/maldives.jpg" "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80" -s
curl -o "public/images/destinations/grandcanyon.jpg" "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80" -s
curl -o "public/images/destinations/northernlights.jpg" "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?q=80" -s
curl -o "public/images/destinations/greatbarrierreef.jpg" "https://images.unsplash.com/photo-1559965766-c5c29df03479?q=80" -s

echo "All images downloaded successfully!" 