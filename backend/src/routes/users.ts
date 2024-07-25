import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.get("/logout", UserController.logout);

router.get("/display", UserController.getAll);

router.patch("/updateCritter/:critterType", UserController.updateCritter);

export default router;