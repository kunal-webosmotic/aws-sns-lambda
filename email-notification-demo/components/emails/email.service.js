import awsSNSService from "../../services/aws-sns.service.js";

const sendEmail = async (email) => {
  awsSNSService.sendSNSNotification({
    to: email,
    body: {
      name: "Test User",
    },
    subject: "Welcome Email",
  });
};

export default {
  sendEmail,
};
