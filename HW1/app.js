const fs = require('fs');
const path = require('path');

const folderWithGirls = path.join(__dirname, '1800');
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


// Practice1

const mkDirPath = path.join(__dirname, 'practice1');
const usersPath = path.join(__dirname, 'practice1', 'users.json');

fs.mkdir(path.join(mkDirPath, 'manOlder20'), err => {
    console.log(err);
})
fs.mkdir(path.join(mkDirPath, 'manYounger20'), err => {
    console.log(err);
})
fs.mkdir(path.join(mkDirPath, 'womanOlder20'), err => {
    console.log(err);
})
fs.mkdir(path.join(mkDirPath, 'womanYounger20'), err => {
    console.log(err);
})

fs.readFile(usersPath, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    const usersData = JSON.parse(data);

    usersData.forEach( user => {
        const pathYoungMan = path.join(mkDirPath, 'manYounger20', `${user.name}.json`);
        const pathOldMan = path.join(mkDirPath, 'manOlder20', `${user.name}.json`);
        const pathYoungWoman = path.join(mkDirPath, 'womanYounger20', `${user.name}.json`);
        const pathOldWoman = path.join(mkDirPath, 'womanOlder20', `${user.name}.json`);

        if (user.age < 20 && user.gender === 'male') {
            fs.writeFile(pathYoungMan, JSON.stringify(user), err1 => {
                console.log(err1);
            });
            return;
        }

        if (user.age > 20 && user.gender === 'male') {
            fs.writeFile(pathOldMan, JSON.stringify(user), err2 => {
                console.log(err2);
            });
            return;
        }

        if (user.age < 20 && user.gender === 'female') {
            fs.writeFile(pathYoungWoman, JSON.stringify(user), err3 => {
                console.log(err3);
            });
            return;
        }

        if (user.age > 20 && user.gender === 'female') {
            fs.writeFile(pathOldWoman, JSON.stringify(user), err4 => {
                console.log(err4);
        })
        }
    })
});
