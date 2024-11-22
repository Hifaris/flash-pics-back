const cloudinary = require("cloudinary").v2


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//cloudinary to store file on  cloud after uploading file will be  stored in Cloudinary and return URL of file to be stored in DB

module.exports =cloudinary