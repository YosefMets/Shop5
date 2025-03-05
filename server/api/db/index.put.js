import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const cloudinary = require('cloudinary').v2;
// const AWS = require('aws-sdk');
const { Buffer } = require('node:buffer');

export default defineEventHandler( async (event) => {
  const body = await readBody(event);

  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  //   region: process.env.AWS_S3_REGION
  // });

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'deucrhprn',
    api_key: process.env.CLOUDINARY_API_KEY || '788719252616798',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'EoQxPHhswqp_wvT9YNlICMUzyQE'
  });

  // console.log( 1, process.env, 1 )


  const jsonData = JSON.stringify({ message: body, timestamp: Date.now() });
  const fileBuffer = Buffer.from(jsonData, 'utf-8'); // Преобразуем JSON в Buffer

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', public_id: 'db.json', folder: 'db' }, // Тип ресурса raw
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(fileBuffer); // Передаем содержимое через поток
    });

    console.log('Файл успешно загружен:', result.secure_url);
  } catch (error) {
    console.error('Ошибка загрузки файла:', error.message);
  }


  // const fileBuffer = Buffer.from(body, 'utf-8');

  // cloudinary.v2.uploader
  //   .upload("dog.mp4", {
  //     resource_type: "video",
  //     public_id: "my_dog",
  //     overwrite: true,
  //     notification_url: "https://mysite.example.com/notify_endpoint"})
  //   .then(result=>console.log(result));

  /*
  const fs = require('node:fs');
  const fsP = require('node:fs/promises');

  const folder = 'public/db'

  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }

  fs.writeFile(`${folder}/ru.json`, body, { flag: 'w+' }, err => {
    if (err) {
      console.error(err);
    } else {
      console.log( 'File written successfully' );
    }
  });

  let testReading;
  try {
    testReading = await fsP.readFile(`${folder}/ru.json`, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
  console.log('W:', testReading);
  */

  return 'Look:'+fileBuffer
})