const mineflayer = require("mineflayer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const allowed = ["ryk_cbaool", ".JBTMojang", "Meacia", "saviors_on_top", "ryk_cool"]; // DO NOT EDIT
const host = "pvp.duckcraft.top";
const port = 25565;
const maxBots = 10;
const username = 'ryk_isfarming';
let botCount = 0;


function createBot() {
    if (botCount >= maxBots) return;

    const bot = mineflayer.createBot({
        host: host,
        port: port,
        username: username,
        auth: "offline",
        version: "1.20.1",
        keepAlive: true,
        checkTimeoutInterval: 60000
    });
    let hasSpawnedOnce = false;

    bot.once("spawn", async () => {
        bot.chat("/login Savior");
        bot.setControlState("forward", true); // Move forward on spawn
    });

    bot.on('spawn', () => {
        if (hasSpawnedOnce) {
            bot.setControlState('forward', false);
        }
        hasSpawnedOnce = true;
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

    bot.on("chat", (username, message) => {
        if (username === 'ryk_cool' && message.startsWith('?say ')) {
            // If the user is ryk_cbaool and uses ?say, the bot will say the message
            const sayMessage = message.slice(5).trim();

            if (sayMessage.length > 0) {
                bot.chat(sayMessage);
            } else {
                bot.chat(`/msg ${username} You need to provide a message to say.`);
            }
        } else if (username !== 'ryk_cool' && message.startsWith('?say ')) {
            // Only log if someone ELSE tries to use ?say
            console.log(`User ${username} tried to use the ?say command: ${message}`);
        }
    });

    bot.on("kicked", (reason, loggedIn) => {
        console.log(`❌ Bot ${bot.username || "Unknown"} was kicked`);
        console.log(`Reason:`, reason);
        console.log(`LoggedIn: ${loggedIn}`);
    });

    bot.on("end", () => {
        console.log(`Bot ${bot.username || "Unknown"} disconnected. Reconnecting in 10 seconds...`);
        setTimeout(createBot, 10000); // Reconnect after 10 seconds
    });

    botCount++;
}

setTimeout(createBot); // Spawn each bot with a 5-second delay to prevent rate limiting

