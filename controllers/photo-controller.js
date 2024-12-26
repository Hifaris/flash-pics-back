const { query, text } = require("express")
const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const cloudinary = require("../config/cloudinary")
const fs = require("fs/promises")

exports.createPhoto = async (req, res, next) => {
    try {

        //receive req.file and upload to Cloudinary
        const promisUrl = await cloudinary.uploader.upload(req.file.path)
        // req.file.path คือที่อยู่ของไฟล์ที่ถูกอัปโหลดในเซิร์ฟเวอร์
        const { title, type,price, categoryId, userId } = req.body
        const rs = await prisma.photo.create({
            data: {
                title: title,
                type: type,
                url: promisUrl.url,
                asset_id: promisUrl.asset_id,
                public_id: promisUrl.public_id,
                secure_url: promisUrl.secure_url,
                price: Number(price),
                categoryId: Number(categoryId),
                userId: +userId
            }
        })
        fs.unlink(req.file.path)
        // console.log(req.body)
        // console.log("fileeeee", req.file)
        res.json({ result: rs })
        // res.send("Hello")
    } catch (err) {
        next(err)
    }
}
exports.allPhotos = async (req, res, next) => {
    try {
        const allPhotos = await prisma.photo.findMany({
            select: {
                title: true,
                url: true,
                sold: true,
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })
        res.json(allPhotos )
    } catch (err) {
        next(err)
    }
}



// controllers/photo-controller.js
exports.listPhoto = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 16;
        const skip = (page - 1) * pageSize;

        const [photos, total] = await Promise.all([
            prisma.photo.findMany({
                skip,
                take: pageSize,
                include: {  // Change 'select' to 'include'
                    category: {
                        select: { 
                            name: true, 
                            id: true 
                        }
                    }
                },
                orderBy: { 
                    createdAt: "desc" 
                }
            }),
            prisma.photo.count()
        ]);

        res.json({
            photos,
            pagination: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize)
            }
        });
    } catch (err) {
        next(err);
    }
};
exports.readPhoto = async (req, res, next) => {
    try {

        const { id } = req.params
        const photo = await prisma.photo.findFirst({
          
            where:{
             id: +id
            },
            include:{
                category: true
            }
            

        })
        res.json({ photo})
    } catch (err) {
        next(err)
    }
}
exports.read = async (req, res, next) => {
    try {
        // code
        const { id } = req.params
        const photo = await prisma.photo.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                category: true,
            }
        })
        res.json({ photo })
    } catch (err) {
        next(err)
    }
}
exports.sortPhotos = async (req, res, next) => {
    try {
        const { sort, order, limit } = req.body

        const photos = await prisma.photo.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: {
                category: true
            }
        })
        res.json({ photos })
    } catch (err) {
        next(err)
    }
}
exports.updatePhoto = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, price, categoryId, userId } = req.body
        const photo = await prisma.photo.update({
            where: {
                id: +id
            },
            data: {
                title: title,
                price: Number(price),
                categoryId: Number(categoryId),
                userId: +userId
            }
        })
        res.json({ msg: 'Update successful' })
    } catch (err) {
        next(err)
    }
}
exports.deletePhoto = async (req, res, next) => {
    try {

        const { id } = req.params

        const photo = await prisma.photo.findFirst({
            where: { id: +id },

        })

        if (!photo) {
            return createError(400, "Photo not found")
        }

        const deleteImage = new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(photo.public_id, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
          });

          await deleteImage
        await prisma.photo.delete({
            where: {
                id: +id
            }
        })
        res.json({ msg: "delete successful" })
    } catch (err) {
        next(err)
    }
}

const handleQuery = async (req, res, query) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 16;
        const skip = (page - 1) * pageSize;

        const [photos, total] = await Promise.all([
            prisma.photo.findMany({
                where: {
                    title: {
                        contains: query,
                    },
                },
                skip,
                take: pageSize,
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            }),
            prisma.photo.count({
                where: {
                    title: {
                        contains: query,
                    },
                },
            }),
        ]);

        res.json({
            photos,
            pagination: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        });
    } catch (err) {
        next(err);
    }
};

const handleCategory = async (req, res, category) => {
    try {
        const products = await prisma.photo.findMany({
            where: {
                categoryId: {
                    in: category.map((id) => Number(id))
                }
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }

        })
        res.json(products)
    } catch (err) {
        console.log(err)
    }
}

const handlePrice = async (req, res, price) => {
    try {
        const products = await prisma.photo.findMany({
            where: {
                price: {
                    gte: price[0],
                    lte: price[1]
                }
            },
            include: {
                category: {
                    select: { id: true, name: true }
                }
            }
        })
        res.json( products )
    } catch (err) {
        console.log(err)
    }
}
exports.searchPhotos = async (req, res, next) => {
    try {

        const { query, category, price } = req.body
        console.log(req.body)

        if (query) {
            console.log("filter query", query)
            await handleQuery(req, res, query)
        }
        if (category) {
            console.log("search by category", category)
            await handleCategory(req, res, category)
        }
        if (price) {
            console.log("search by price", price)
            await handlePrice(req, res, price)
        }


        // res.json('search')
    } catch (err) {
        next(err)
    }
}
