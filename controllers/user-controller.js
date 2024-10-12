exports.listUsers = async (req,res,next) =>{
    try {
        res.json("users")
    } catch (err) {
        next(err)
    }
}