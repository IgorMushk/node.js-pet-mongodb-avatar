const fs = require("fs/promises");

const createDirIfNotExists = async (url) => {
    console.log(url);
    try {
        await fs.access(url)
    } catch (error) {
        if(error.code === "ENOENT") {
            console.log('createDirIfNotExists - Error', url);
            await fs.mkdir(url)
        }
        console.log(error);
    }
}

module.exports = createDirIfNotExists;

// const fs = require('node:fs/promises');

// const createDirIfNotExists = async (url) => {
//   try {
//     await fs.access(url);
//   } catch (err) {
//     console.log('createDirIfNotExists - Error', url);
//     if (err.code === 'ENOENT') {
//       await fs.mkdir(url);
//     }
//   }
// };

// module.exports = createDirIfNotExists;