import express, {Router}  from "express";
import { logout,register,login } from "../controllers/auth.controller";



const router: Router = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

export default router;