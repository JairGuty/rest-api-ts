import { Router } from "express";
import { signup, signin, profile, testing } from "../controllers/auth.controller";
import { TokenValidation } from "../libs/verifyToken";

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);

router.get('/profile', TokenValidation, profile);
router.get('/testing', TokenValidation, testing);

export default router;