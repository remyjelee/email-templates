import fs from "fs/promises";
import Handlebars from "handlebars";

// shared partial
const chrome = await fs.readFile("_chrome.hbs", "utf8");
Handlebars.registerPartial("_chrome", chrome);

// dummy data
const data = {
  name: "Walter White",
  role: "Subcommittee Member",
  organisation_name: "CSE Society",
  campaign_name: "CSE Subcommittee Recruitment 2025",
  expiry_date: "30 June 2025"
};

const files = [
  "welcome.hbs",
  "interview-invite.hbs",
  "offer.hbs",
  "rejection.hbs",
  "expiry-reminder.hbs"
];

for (const file of files) {
  const src = await fs.readFile(file, "utf8");
  const html = Handlebars.compile(src)(data);
  const out  = file.replace(".hbs", "-preview.html");
  await fs.writeFile(out, html);
  console.log(`✓  wrote ${out}`);
}
