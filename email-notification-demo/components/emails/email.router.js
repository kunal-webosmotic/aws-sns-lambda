import { Router } from "express";
import EmailController from "./email.controller.js";

const EmailsRouter = Router();

EmailsRouter.post("/send", EmailController.sendEmail);

export default EmailsRouter;
