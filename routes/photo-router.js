const express = require("express")
const router = express.Router()
const {createPhoto,allPhotos,listPhoto,sortPhotos,updatePhoto,deletePhoto,searchPhotos,read,readPhoto} = require("../controllers/photo-controller")
const { authCheck,adminCheck } = require("../middlewares/authen")
const upload = require("../middlewares/upload")

router.post("/",authCheck,adminCheck,upload.single("file"),createPhoto)
router.get("/",allPhotos)
router.get("/getphotodetail/:id",readPhoto)

router.get("/", listPhoto); 
router.get('/get/:id',read)

router.post("/photoBy",sortPhotos)
// sort product such as newest
router.patch("/:id",authCheck,adminCheck,updatePhoto)
router.delete("/:id",authCheck,adminCheck,deletePhoto)
router.post("/search",searchPhotos)


module.exports = router