import mailjet from "node-mailjet";
import dotenv from "dotenv";
dotenv.config();

const mailjetClient = mailjet.connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

export const sendEmail = async (to, subject, text, html) => {
  const request = mailjetClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "your-email@example.com", // Use your verified Mailjet email
          Name: "Your Name",
        },
        To: [
          {
            Email: to,
            Name: "Recipient Name",
          },
        ],
        Subject: subject,
        TextPart: text,
        HTMLPart: html,
      },
    ],
  });

  try {
    const result = await request;
    console.log(result.body);
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
