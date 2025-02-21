
const mineflayer = require("mineflayer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const webhookURL = "https://discord.com/api/webhooks/1330532752562589729/w3hY8Arl70VuXEolV4Thmrb5Tr-3aMZ5W_mqd5NX0jA-7hnXoaF2xrNhsmv4xBNQ54nR";
const tpaLogger = "https://discord.com/api/webhooks/1330661283304968307/KMqyjhKNC7-u6MD-1FMPI1Zh8Y1qWb6f8xWNwNu5z1vaeUe-Uro0g5Aoy317REOCblbQ"
const allowed = ["ryk_cbaool", ".JBTMojang", "Meacia", "saviors_on_top"]; // DO NOT EDIT

function createBot() {
    const bot = mineflayer.createBot({
        host: "6b6t.org",
        port: 25565,
        username: "CoolDudeBot",
        auth: "offline",
        version: "1.20.1",
        keepAlive: true,
        checkTimeoutInterval: 60000
    });

    let hasSpawnedOnce = false;
    let canSendMessage = true;
    let teleporting = false;
    let currentWeather = null;

    async function handleTeleport(requester) {
        if (allowed.includes(requester)) {
            bot.chat(`/tpy ${requester}`);
            await sleep(1000);
            bot.chat(`/msg ${requester} I have accepted your teleport request.`);
        }
    }


    
   

bot.on("message", async (message) => { // Make sure this function is async
    const messageString = message.toString();

    const cooldownMatch = messageString.match(/Please wait (\d+) seconds before sending another message!/);
    if (cooldownMatch) {
        const waitSeconds = parseInt(cooldownMatch[1]);
        console.log(`Server requested wait of ${waitSeconds} seconds`);
        canSendMessage = false;
        await sleep(waitSeconds * 1000); // Properly awaiting sleep
        canSendMessage = true;
    }
});
    
let weatherAvailable = true;




    
    bot.once("spawn", async () => {
        bot.chat("/login Savior");
        bot.setControlState('forward', true);
    });



    
    bot.on('spawn', () => {
        if (hasSpawnedOnce) {
            bot.setControlState('forward', false);
        }
        hasSpawnedOnce = true;
    });






    
    bot.on("error", (err) => {
        console.error('Error:', err);
        bot.end();
    });

  

    
    //commands end

    bot.on('kicked', (reason, loggedIn) => {
        console.log(`Kicked from server: ${reason} | Logged In: ${loggedIn}`);
    });

    bot.on('end', (reason) => {
        console.log(`Disconnected. Reconnecting in 10 seconds... Reason: ${reason}`);
        setTimeout(initBot, 10000);
    });

    return bot;
}

function initBot() {
    console.log('Initializing bot...');
    return createBot();
}

let bot = initBot();
