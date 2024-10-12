const express = require("express")
const router = express.Router()
const {createPhoto,allPhotos,listPhoto,sortPhotos,updatePhoto,deletePhoto,searchPhotos} = require("../controllers/photo-controller")

router.post("/",createPhoto)
router.get("/",allPhotos)

router.get("/:count",listPhoto)

router.post("/photoBy",sortPhotos)
// sort product such as newest
router.patch("/:id",updatePhoto)
router.delete("/:id",deletePhoto)
router.post("/search",searchPhotos)


module.exports = router