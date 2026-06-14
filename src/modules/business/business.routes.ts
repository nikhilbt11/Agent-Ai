// Business routes
import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    return res.json({
      success: true,
      user: req.user,
    });
  }
);

export default router;