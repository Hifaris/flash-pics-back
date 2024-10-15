
exports.adminCheck = async(req,res,check)=>{

    try {
      const {email} = req.user
      console.log(email)
      next()
    } catch (err) {
      next(err)
    }
  }