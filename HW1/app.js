const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, '1800');
const folderWithBoys = path.join(__dirname, '2000');

// fs.readdir(folderWithGirls, (err, files) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     files.forEach(file => {
//         const filePathOfGirls = path.join(folderWithGirls, file);
//
//         fs.readFile(filePathOfGirls, (err1, data) => {
//             if (err1) {
//                 console.log(err1);
//                 return
//             }
//             if (JSON.parse(data).gender === 'male') {
//                 const newFileName = path.join(folderWithBoys, `${JSON.parse(data).name}.json`);
//
//                 fs.rename(filePathOfGirls, newFileName.toLowerCase(), err2 => {
//                     console.log(err2);
//                     return
//                 })
//             }
//             return
//         })
//     })
// })

// fs.readdir(folderWithBoys, (err, files) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     files.forEach(file => {
//         const filePathOfBoys = path.join(folderWithBoys, file)
//
//         fs.readFile(filePathOfBoys, (err1, data) => {
//             if (err1) {
//                 console.log(err1);
//                 return
//             }
//             if (JSON.parse(data).gender === 'female') {
//                 const newFileName = path.join(folderWithGirls, `${JSON.parse(data).name}.json`);
//
//                 fs.rename(filePathOfBoys, newFileName.toLowerCase(), err2 => {
//                     console.log(err2);
//                     return
//                 })
//             }
//             return
//         })
//     })
// })

function splitGender(mainPath, gender) {
   fs.readdir(mainPath, (err, files) => {
       if(err) {
           console.log(err);
           return;
       }
       files.forEach(file => {
           fs.readFile(path.join(mainPath, file), (err1, data) => {
               if (err1) {
                console.log(err1);
                return;
            }
               if (JSON.parse(data).gender === gender) {
//                 const newFileName = path.join(mainPath, `${JSON.parse(data).name}.json`);
           })
       }
   })
}
// Practice1

// const mkDirPath = path.join(__dirname, 'practice1');
// const usersPath = path.join(__dirname, 'practice1', 'users.json');
//
// fs.mkdir(path.join(mkDirPath, 'manOlder20'), err => {
//     console.log(err);
// })
// fs.mkdir(path.join(mkDirPath, 'manYounger20'), err => {
//     console.log(err);
// })
// fs.mkdir(path.join(mkDirPath, 'womanOlder20'), err => {
//     console.log(err);
// })
// fs.mkdir(path.join(mkDirPath, 'womanYounger20'), err => {
//     console.log(err);
// })
//
// fs.readFile(usersPath, (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     const usersData = JSON.parse(data)
//
//     for (let i = 0; i < usersData.length; i++) {
//         const pathYoungMan = path.join(mkDirPath, 'manYounger20', `${usersData[i].name}.json`);
//         const pathOldMan = path.join(mkDirPath, 'manOlder20', `${usersData[i].name}.json`);
//         const pathYoungWoman = path.join(mkDirPath, 'womanYounger20', `${usersData[i].name}.json`);
//         const pathOldWoman = path.join(mkDirPath, 'womanOlder20', `${usersData[i].name}.json`);
//
//         if (usersData[i].age < 20 && usersData[i].gender === 'male') {
//             fs.writeFile(pathYoungMan, JSON.stringify(usersData[i]), err1 => {
//                 console.log(err1);
//             });
//         } else if (usersData[i].age > 20 && usersData[i].gender === 'male') {
//             fs.writeFile(pathOldMan, JSON.stringify(usersData[i]), err2 => {
//                 console.log(err2);
//             });
//         } else if (usersData[i].age < 20 && usersData[i].gender === 'female') {
//             fs.writeFile(pathYoungWoman, JSON.stringify(usersData[i]), err3 => {
//                 console.log(err3);
//             });
//         } else if (usersData[i].age > 20 && usersData[i].gender === 'female') {
//             fs.writeFile(pathOldWoman, JSON.stringify(usersData[i]), err4 => {
//                 console.log(err4);
//         })
//         }
//     }
// });