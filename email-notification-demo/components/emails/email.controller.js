import EmailService from "./email.service.js";

const sendEmail = async (request, response) => {
  const email = request.query.email;

  try {
    await EmailService.sendEmail(email);

    return response.status(200).json({
      status: "SUCCESS",
      message: "Email send successfully.",
    });
  } catch (error) {
    return response.status(500).json({
      status: "ERROR",
      message: error?.message || error,
    });
  }
};

export default {
  sendEmail,
};
