const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
    if (msg.content === "ping") {
        msg.reply("pong");
    }
    if (msg.content.endsWith("?") && msg.content.length>1){
        msg.reply("great question!")
    }
    if (msg.content.toLowerCase().startsWith("why")){
        msg.reply("why not?")
    }
    if (msg.content.includes("lol")){
        msg.react("😂")
    }
    if (msg.content.startsWith("setupVote")){
        const reactions = ["🎃","🤖","👽","👾","👻"]
        let options = msg.content.slice(msg.content.length-1);
        for(let i = 0; i < options; i++){
            msg.react(reactions[i]);
        }
    }
})

client.login(process.env.TOKEN)