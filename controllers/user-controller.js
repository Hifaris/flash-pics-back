const { date } = require("joi")
const prisma = require("../config/prisma")
const createError = require("../utils/createError")

exports.listUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enable: true
            }
        })
        res.json({ users })
    } catch (err) {
        next(err)
    }
}
exports.changStatus = async (req, res, next) => {
    try {

        const { id, enable } = req.body

        const user = await prisma.user.update({
            where: { id: +id },
            data: { enable: enable }

        })
        res.json("Update status successful")
    } catch (err) {
        next(err)
    }
}
exports.changRole = async (req, res, next) => {
    try {
        const { id, role } = req.body

        const user = await prisma.user.update({
            where: { id: +id },
            data: { role: role }

        })
        res.json("Update role successful")
    } catch (err) {
        next(err)
    }
}
exports.createUserCart = async (req, res, next) => {
    try {
        const { cart } = req.body
        // console.log(req.user.user.id)

        const user = await prisma.user.findFirst({
            where: { id: req.user.user.id }
        })

        //delete old cart item
        await prisma.photoOnCart.deleteMany({
            where: {
                cart: {
                    userId: user.id
                }
            }
        })

        //delete old cart
        await prisma.cart.deleteMany({
            where: { userId: user.id }
        })

        // prepare photo
        let products = cart.map((item) => ({
            photoId: item.id,
            price: item.price
        }))

        //cartTotal
        let cartTotal = products.reduce((acc, prv) => acc + prv.price * 1, 0)

        const newCart = await prisma.cart.create({
            data: {
                cartPhotos: {
                    create: products
                },
                cartTotal: cartTotal,
                userId: user.id
            },

        })
        console.log(products)
        console.log(newCart)
        res.json("user cart")
    } catch (err) {
        next(err)
    }
}

// exports.createUserCart = async (req, res, next) => {
//     try {
//         const { cart } = req.body;
//         // Check if the cart exists and is not empty
//         if (!cart || cart.length === 0) {
//             return res.status(400).json({ error: "Cart is empty" });
//         }

//         // Find user
//         const user = await prisma.user.findFirst({
//             where: { id: req.user.user.id }
//         });

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Delete old cart items
//         await prisma.photoOnCart.deleteMany({
//             where: {
//                 cart: {
//                     userId: user.id
//                 }
//             }
//         });

//         // Delete old cart
//         await prisma.cart.deleteMany({
//             where: { userId: user.id }
//         });

//         // Prepare valid products by filtering out any invalid items
//         let products = cart
//             .filter(item => item.id && item.price) // Filter out undefined values
//             .map(item => ({
//                 photoId: item.id,
//                 price: item.price
//             }));

//         // Check if there are valid products left after filtering
//         if (products.length === 0) {
//             return res.status(400).json({ error: "No valid products in the cart" });
//         }

//         // Calculate cartTotal
//         let cartTotal = products.reduce((acc, product) => acc + product.price, 0);

//         // Create new cart
//         const newCart = await prisma.cart.create({
//             data: {
//                 cartPhotos: {
//                     create: products
//                 },
//                 cartTotal: cartTotal,
//                 userId: user.id
//             }
//         });

//         console.log(products);
//         console.log(newCart);

//         // Respond with success
//         res.json("User cart created successfully");
//     } catch (err) {
//         next(err); // Pass the error to error handling middleware
//     }
// };

exports.getUserCart = async (req, res, next) => {
    try {

        const cart = await prisma.cart.findFirst({
            where: {
                userId: req.user.user.id
            },
            include: {
                cartPhotos: {
                    select: {
                        id: true,
                        photoId: true,
                        createdAt: true,
                        price: true,
                        photos: {
                            select: {
                                id: true,
                                title: true,
                                url: true

                            }
                        }

                    },
                }
            }
        })
        if (!cart) {
            return res.json({ CartDetail: [], cartTotal: 0 });
        }
        res.json({
            CartDetail: cart.cartPhotos,
            cartTotal: cart.cartTotal
        })
    } catch (err) {
        next(err)
    }
}
exports.deleteUserCart = async (req, res, next) => {
    try {

        const cart = await prisma.cart.findFirst({
            where: { userId: req.user.user.id }
        })

        if (!cart) {
            return createError(400, "No cart exist")
        }

        await prisma.photoOnCart.deleteMany({
            where: {
                cartId: cart.id
            }
        })

        const result = await prisma.cart.deleteMany({
            where: { userId: req.user.user.id }
        })
        res.json({ message: "remove success" })
    } catch (err) {
        next(err)
    }
}
// exports.deleteUserCart = async (req, res, next) => {
//     try {
//         const { photoId } = req.params;  // Extract photoId from the URL parameters

//         const cart = await prisma.cart.findFirst({
//             where: { userId: req.user.user.id }
//         });

//         if (!cart) {
//             return createError(400, "No cart exists");
//         }

//         // Delete the specific photo from the cart by photoId
//         const deleteResult = await prisma.photoOnCart.deleteMany({
//             where: {
//                 cartId: cart.id,
//                 photoId: parseInt(photoId)  // Ensure it's parsed as an integer
//             }
//         });
// const result = await prisma.cart.deleteMany({
//     where: { userId: req.user.user.id }
// })

//         if (deleteResult.count === 0) {
//             return createError(404, "Photo not found in the cart");
//         }

//         res.json({ message: "Photo removed from cart successfully" });
//     } catch (err) {
//         next(err);
//     }
// };
// exports.saveOrder = async (req, res, next) => {
//     try {

//         const userCart = await prisma.cart.findFirst({
//             where: {
//                 userId: req.user.user.id
//             }, include: {
//                 cartPhotos: true

//             }
//         })
//         console.log("usercattttt", userCart)

//         if (!userCart || userCart.cartPhotos.length === 0) {
//             return createError(400, "Cart is empty")
//         }

//         //create new order
//         const order = await prisma.order.create({
//             data: {
//                 photoOrders: {
//                     create: userCart.cartPhotos.map((el) => ({
//                         photoId: el.photoId,
//                         price: el.price,
//                     }))
//                 },
//                 userId: req.user.user.id,
//                 total: userCart.cartTotal

//             }
//         })


//         // update photo in the cart
//         const update = userCart.cartPhotos.map((el) => ({
//             where: { id: el.photoId },
//             data: {
//                 sold: { increment: +1 }
//             }
//         }))



//         // console.log("order1111",typeof(order.paymentStatus))

//         // check payment status
//         if (order.paymentStatus === "CONFIRM") {

//             await Promise.all(
//                 update.map((el) => prisma.photo.update(el))
//             )
//         }


//         await prisma.cart.deleteMany({
//             where: { userId: req.user.user.id }
//         })


//         // console.log(userCart)
//         res.json({ order })
//     } catch (err) {
//         next(err)
//     }
// }

exports.saveOrder = async (req, res, next) => {
    try {
        // Find the user's cart
        const userCart = await prisma.cart.findFirst({
            where: {
                userId: req.user.user.id
            },
            include: {
                cartPhotos: true
            }
        });

        // Check if cart exists and contains photos
        if (!userCart || userCart.cartPhotos.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        // Create a new order with the cart photos
        const order = await prisma.order.create({
            data: {
                photoOrders: {
                    create: userCart.cartPhotos.map((el) => ({
                        photoId: el.photoId,
                        price: el.price
                    }))
                },
                userId: req.user.user.id,
                total: userCart.cartTotal
            }
        });

        // Optional: If the order status is confirmed, update the sold count
        if (order.paymentStatus === "CONFIRM") {
            await Promise.all(
                userCart.cartPhotos.map((el) =>
                    prisma.photo.update({
                        where: { id: el.photoId },
                        data: {
                            sold: { increment: 1 }
                        }
                    })
                )
            );
        }

        // Delete the user's cart and associated cartPhotos
        await prisma.photoOnCart.deleteMany({
            where: { cartId: userCart.id }
        });

        await prisma.cart.deleteMany({
            where: { userId: req.user.user.id }
        });

        // Return the newly created order
        res.json({ order });

    } catch (err) {
        next(err);
    }
};


exports.getOrder = async (req, res, next) => {
    try {

        const order = await prisma.order.findMany({
            where: {
                userId: req.user.user.id
            },
            include: {
                photoOrders: {
                    include: {
                        photo: true
                    }
                }
            }
        })

        if (order.length === 0) {
            return createError(400, "No order")
        }

        res.json({ order })
    } catch (err) {
        next(err)
    }
}
exports.getOneOrder = async (req, res, next) => {
    try {
        // const { id } = req.params; 

        const order = await prisma.order.findUnique({
            where: {
                id: +req.params.id

            },
            include: {
                photoOrders: {
                    include: {
                        photo: true 
                    }
                }
            }
        });

        
        if (!order) {
            return res.status(400).json({ error: "No order found" });
        }

        res.json({ order });
    } catch (err) {
        next(err);
    }
};

exports.changPaymentStatus = async(req,res,next)=>{
   try {
    const order = await prisma.order.update({
        where: {
            id: +req.params.id

        },
        data: {
            paymentStatus: "CONFIRM" 
        }
    })
    res.json({msg: "Payment successfully"})
   } catch (error) {
    next(error)
   }
}