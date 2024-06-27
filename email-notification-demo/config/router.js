import EmailsRouter from "../components/emails/email.router.js";

export const initRoutes = (app) => {
  app.use("/api/email", EmailsRouter);

  // This middleware catches errors globally
  app.use((error, request, response, next) => {
    return response.status(500).json({
      status: "ERROR",
      message: "Internal server error.",
    });
  });
};
