import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {

    const headers=req.headers["authorization"];
  const token = headers && headers.split(" ")[1];
  if(!token){
    return res.status(401).json({success:false,message:"Access Denied"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (error) {
    return    res
      .status(401)
      .json({
        success: false,
        message: error.message,
      });
  }
};

export default verifyToken;
