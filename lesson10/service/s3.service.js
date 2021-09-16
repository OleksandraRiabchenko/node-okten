const S3 = require('aws-sdk/clients/s3');
const path = require('path');
// при рекваєрі uuid обов'язково треба вибрати версію uuid н-д v1|3|4|5, але не визивати як ф-цію, тобто без дужок()
const uuid = require('uuid').v1;

const {
    AWS_S3_REGION,
    AWS_S3_ACCESS_KEY,
    AWS_S3_NAME,
    AWS_S3_SECRET_KEY
} = require('../config/variables');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = { 
    // itemType - cars, users, coctails ets.(папка де зберігається окрема сутність)
    uploadFile: (file, itemType, itemId) => {
        const { data, mimetype, name } = file;

        const fileName = _fileNameBilder(name, itemType, itemId.toString());

        return bucket
            .upload({
                Bucked: AWS_S3_NAME, // назва bucket куди заливаєм
                Body: data, // Buffer - це data: <Buffer 89 50 4e 47 ....>
                Key: fileName, // назва самого файлу
                ContentType: mimetype // це  mimetype н-д 'image/png',
            })
            .promise(); // !!! ОБОВ'ЯЗКОВО НЕ ЗАБУВАТИ
    }
};

function _fileNameBilder(fileName, itemType, itemId) {
    // fileName = raiting.png потрібно отримати png можна через split('.').pop()
    // const fileExtension = fileName.split('.').pop();
    // або те саме за допомогою path.extname - цей підхід краще
    const fileExtension = path.extname(fileName);

    return path.join(itemType, itemId, `${uuid()}${fileExtension}`);
}
