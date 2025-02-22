const mineflayer = require("mineflayer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const webhookURL = "https://discord.com/api/webhooks/1330532752562589729/w3hY8Arl70VuXEolV4Thmrb5Tr-3aMZ5W_mqd5NX0jA-7hnXoaF2xrNhsmv4xBNQ54nR";
const tpaLogger = "https://discord.com/api/webhooks/1330661283304968307/KMqyjhKNC7-u6MD-1FMPI1Zh8Y1qWb6f8xWNwNu5z1vaeUe-Uro0g5Aoy317REOCblbQ";
const allowed = ["ryk_cbaool", ".JBTMojang", "Meacia", "saviors_on_top"]; // DO NOT EDIT
const host = "6b6t.org";
const port = 25565;
const maxBots = 10; // Define the maximum number of bots
let botCount = 0;

function createBot() {
    if (botCount >= maxBots) return;

    const bot = mineflayer.createBot({
        host: host,
        port: port,
        username: `CoolDudeBot${Math.floor(Math.random() * 1000)}`, // Unique usernames
        auth: "offline",
        version: "1.20.1",
        keepAlive: true,
        checkTimeoutInterval: 60000
    });

    bot.once("spawn", async () => {
        bot.chat("/register Savior");
        bot.setControlState("forward", true); // Move forward on spawn
    });

    bot.on("message", (message) => {
        console.log(`Chat: ${message.toString()}`);
    });

    bot.on("error", err => {
        if (err.code === 'ECONNRESET') {
            console.log(`Bot ${bot.username || "Unknown"} lost connection. Reconnecting in 10 seconds...`);
            setTimeout(createBot, 10000);
        } else {
            console.log(`Bot ${bot.username || "Unknown"} encountered an error: ${err.message}`);
        }
    });

    bot.on("end", () => {
        console.log(`Bot ${bot.username || "Unknown"} disconnected. Reconnecting in 10 seconds...`);
        setTimeout(createBot, 10000); // Reconnect after 10 seconds
    });

    botCount++;
}

// **Loop to create multiple bots**
for (let i = 0; i < maxBots; i++) {
    setTimeout(createBot, i * 5000); // Spawn each bot with a 5-second delay to prevent rate limiting
}
