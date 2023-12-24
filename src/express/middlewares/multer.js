const multer = require("multer");
const { TEMP_UPLOAD_DIR } = require("../../modules/common/constants/common");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, TEMP_UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
      console.log('multer-file :', file);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //cb(null, file.fieldname + '-' + uniqueSuffix)
      //cb(null,  uniqueSuffix + '-' + file.originalname)
      cb(null, `${uniqueSuffix}_${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage });

  module.exports = upload;