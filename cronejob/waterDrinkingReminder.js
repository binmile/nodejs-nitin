import cron from "node-cron";
import { user } from "../models/User.model.js";
import { createTransportOptions, sendMailService } from "../email/setup.js";

async function sendEmail() {
  const emails = await user.findAll({ attributes: ["email"] });
  emails.forEach(({ email }) =>
    sendMailService(
      createTransportOptions({
        to: email,
        subject: "health Reminder",
        text: "drink water to fulfilled daily water need",
      })
    )
  );
}

cron.schedule("* * * * *", () => {
  sendEmail();
});
