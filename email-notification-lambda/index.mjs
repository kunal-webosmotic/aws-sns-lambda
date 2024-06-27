import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.mjs";

const createSendEmailCommand = (toAddress, subject, htmlTemplate) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlTemplate,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: "kunalbariya123@gmail.com",
  });
};

// HTML template as a string
const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 20px 0;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h2 {
            color: #333333;
        }
        .content p {
            color: #666666;
            line-height: 1.6;
        }
        .footer {
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Service</h1>
        </div>
        <div class="content">
            <h2>Hello, {{name}}!</h2>
            <p>Thank you for joining our service. We are excited to have you with us.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Our Service. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

// Replace placeholders with actual values
const replacePlaceholders = (template, replacements) => {
  return template.replace(/{{(\w+)}}/g, (_, key) => replacements[key] || "");
};

export const handler = async (event) => {
  const snsInfo = event.Records[0].Sns;

  const replacements = JSON.parse(snsInfo.Message);

  const htmlContent = replacePlaceholders(htmlTemplate, replacements);
  const sendEmailCommand = createSendEmailCommand(
    snsInfo.MessageAttributes.to.Value,
    snsInfo.MessageAttributes.subject.Value,
    htmlContent
  );
  const sendData = await sesClient.send(sendEmailCommand);
  console.log("sendData", sendData);
};
