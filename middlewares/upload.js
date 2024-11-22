const multer = require("multer"
)

const upload = multer({dest: "uploads"})

//tempolary folder uploads

module.exports = upload