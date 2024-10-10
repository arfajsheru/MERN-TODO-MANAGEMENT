import express from 'express';
import { login, logoute, ragister } from '../controller/user.controller.js';

const router = express.Router();


router.post("/signup",ragister)
router.post("/login",login)
router.get("/logout",logoute)

export default router;