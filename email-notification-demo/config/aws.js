import { SNSClient } from "@aws-sdk/client-sns";

const awsConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
const snsClient = new SNSClient(awsConfig);

export default { snsClient };
