const https = require("https");
const { JSDOM } = require("jsdom");
const { Twilio } = require("twilio");

// User-defined constants
const num_of_messages_to_send = 10; // Number of notification messages to send once tickets are available
const interval_between_messages = 3000; // Milliseconds between each notification message

// Twilio account details for sending SMS
const accountSid = "ACcfb63267ec1247ce61512868bfde601e"; // Twilio account SID
const authToken = "409f7f8a83a7dccdcdef59a73aee6587"; // Twilio auth token
const twilioClient = new Twilio(accountSid, authToken); // Twilio client initialization
const twilioContactNumber = "+12057281280"; // Twilio phone number used for sending SMS

// RCB tickets booking page URL
const rcbTicketsPageUrl = "https://shop.royalchallengers.com/ticket";

exports.checkRcbTicket = async (_req, res) => {
  console.log("nikunj");
  try {
    const ContactNumber = "+916397253517"; // Recipient's phone number for notifications
    const ticketsDate = "2024-05-04";
    console.log("nikunj2");

    const checkTicket = await checkTicketAvailability(
      ContactNumber,
      ticketsDate
    );
    res.status(200).json(checkTicket);
  } catch (e) {
    res.status(500).json({ e: "internal server error" });
  }
};

// Function to fetch webpage content
function getPage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Function to extract dates of available tickets
function getDatesOfAvailableTickets(html) {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const dates = [];
  const pElements = document.querySelectorAll("p.css-1nm99ps");
  pElements.forEach((p) => {
    dates.push(p.textContent);
  });
  return dates;
}

// Main function to check ticket availability and send notifications
async function checkTicketAvailability(recipientContactNumber, ticketsDate) {
  const fetchStatusDelay = 30000;
  let ticketsAvailable = false;
  let returnValue;
  try {
    const ticketsPageHtml = await getPage(rcbTicketsPageUrl);
    const availableTicketsDates = getDatesOfAvailableTickets(ticketsPageHtml);

    for (const availableTicketDate of availableTicketsDates) {
      const dateObj = new Date(availableTicketDate);
      const formattedDate = dateObj.toISOString().slice(0, 10);
      if (formattedDate === ticketsDate) {
        console.log(
          `${new Date().toISOString()} Tickets available. Sending message...`
        );
        returnValue = `${new Date().toISOString()} Tickets available. Sending message...`;
        ticketsAvailable = true;

        for (
          let messageNum = 0;
          messageNum < num_of_messages_to_send;
          messageNum++
        ) {
          await twilioClient.messages.create({
            from: twilioContactNumber,
            body: `The match tickets for ${ticketsDate} are available. Login to ${rcbTicketsPageUrl} to book the tickets immediately.`,
            to: recipientContactNumber,
          });
          console.log(
            `${new Date().toISOString()} Message sent successfully - ${
              messageNum + 1
            } time(s)`
          );

          await new Promise((resolve) =>
            setTimeout(resolve, interval_between_messages)
          );
        }

        break;
      }
    }

    if (!ticketsAvailable) {
      console.log(
        `${new Date().toISOString()} Tickets not available. Retrying in ${
          fetchStatusDelay / 1000
        } seconds...`
      );
      returnValue = `${new Date().toISOString()} Tickets not available. Retrying ...`;
      await new Promise((resolve) => setTimeout(resolve, fetchStatusDelay));
    }
    return returnValue;
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}
