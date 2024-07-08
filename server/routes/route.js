import express from "express";
import { checkAuth, login, signup } from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";
import {sendEmail,
  addToDis,
  addToFav,
  getFromDis,
  getFromFav,
  getUsers,
} from "../controllers/useController.js";

const router = express.Router();

//auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/checkAuth", verifyToken, checkAuth);

//user routes
router.get("/getUsers", getUsers);
router.put("/addToFav/:id", verifyToken, addToFav);
router.put("/addToDis/:id", verifyToken, addToDis);
router.get("/getFromFav", verifyToken, getFromFav);
router.get("/getFromDis", verifyToken, getFromDis);

router.post("/sendEmail", sendEmail);

export default router;
