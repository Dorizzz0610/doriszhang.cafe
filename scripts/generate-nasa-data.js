const fs = require('fs');
const path = require('path');
const https = require('https');

// NASA APOD API URL
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

// 目标文件路径
const DATA_DIR = path.join(__dirname, '../public/data');
const TARGET_FILE = path.join(DATA_DIR, 'nasa-apod.json');

// 确保目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`Created directory: ${DATA_DIR}`);
}

// 备用数据，以防API调用失败
const fallbackData = {
  url: "https://apod.nasa.gov/apod/image/2405/MilkyWayRisesOverAustralia.jpg",
  title: "Milky Way Rises Over Australia",
  explanation: "The Milky Way galaxy rises majestically over the Australian outback in this stunning nighttime photograph. The image captures the dense star clouds and dark dust lanes of our home galaxy's central region, creating a breathtaking celestial display against the Earth's horizon.",
  date: new Date().toISOString().split('T')[0],
  copyright: "NASA"
};

// 从NASA API获取数据
function fetchNASAData() {
  return new Promise((resolve, reject) => {
    https.get(NASA_API_URL, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (e) {
            console.error('Error parsing NASA API response:', e);
            reject(e);
          }
        } else {
          console.error(`NASA API responded with status code: ${res.statusCode}`);
          reject(new Error(`HTTP error! Status: ${res.statusCode}`));
        }
      });
    }).on('error', (err) => {
      console.error('Error fetching NASA data:', err);
      reject(err);
    });
  });
}

// 主函数
async function generateNASAData() {
  try {
    console.log('Fetching NASA APOD data...');
    const data = await fetchNASAData();
    
    // 过滤数据，只保留需要的字段
    const filteredData = {
      url: data.url,
      title: data.title,
      explanation: data.explanation,
      date: data.date,
      copyright: data.copyright
    };
    
    // 写入文件
    fs.writeFileSync(TARGET_FILE, JSON.stringify(filteredData, null, 2));
    console.log(`NASA APOD data saved to ${TARGET_FILE}`);
    console.log(`Today's image: ${filteredData.title}`);
    
  } catch (error) {
    console.error('Failed to fetch NASA data, using fallback data:', error);
    
    // 使用备用数据
    fs.writeFileSync(TARGET_FILE, JSON.stringify(fallbackData, null, 2));
    console.log(`Fallback NASA APOD data saved to ${TARGET_FILE}`);
  }
}

// 执行主函数
generateNASAData(); 