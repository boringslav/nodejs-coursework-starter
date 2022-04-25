import {Router} from "express";
import CurrencyController from "./CurrencyController";

const router = Router();
router.use("/currencies",CurrencyController);
export default router;