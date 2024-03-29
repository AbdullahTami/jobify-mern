import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import rateLimiter from "express-rate-limit";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

const apiLimiter = rateLimiter({
  windowMs: 3 * 60 * 1000,
  max: 5,
  message: { msg: "IP rate limit exceeded, retry in 3 minutes" },
});

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
