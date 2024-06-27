import AWS from "../config/aws.js";
import { PublishCommand } from "@aws-sdk/client-sns";

const sendSNSNotification = async (message) => {
  try {
    if (!message) {
      throw {
        status: 400,
        message: "Message params is required",
      };
    }
    if (!message.to || message.to === "") {
      throw {
        status: 400,
        message: "Message to is required",
      };
    }
    if (!message.body) {
      throw {
        status: 400,
        message: "Message body is required",
      };
    }
    if (!message.subject) {
      throw {
        status: 400,
        message: "Message subject is required",
      };
    }
    if (!message.correlationId) {
      message.correlationId = generateRandomString(24);
    }

    const messageAttributes = {
      version: {
        DataType: "String",
        StringValue: "1",
      },
      correlationId: {
        DataType: "String",
        StringValue: message.correlationId,
      },
      subject: {
        DataType: "String",
        StringValue: message.subject.toString(),
      },
      to: {
        DataType: "String",
        StringValue: message.to.toString(),
      },
    };

    // Publish a message to the SNS topic
    const publishCommand = new PublishCommand({
      Message: JSON.stringify(message.body),
      TopicArn: "arn:aws:sns:ap-south-1:533266987684:sendEmailWithLambda",
      MessageAttributes: messageAttributes,
    });
    const publishResponse = await AWS.snsClient.send(publishCommand);
    console.log("Message published to SNS:", publishResponse.MessageId);
    return publishResponse.MessageId;
  } catch (error) {
    console.error("Error with SNS:", error);
    throw error;
  }
};

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default { sendSNSNotification };
