const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
    if (msg.content.endsWith("?") && msg.content.length>1){
        msg.reply("great question " + msg.author.username + "!")
        const args = msg.content.split(/ +/);
        let searchTopic = args.join('+').slice(0,-1);
        for(let i = 0; i<searchTopic.length; i++){
            if(searchTopic.endsWith("?")){
                searchTopic=searchTopic.slice(0,-1);
            }
        }
        let googleResult = `https://google.com/search?q=${searchTopic}`
        msg.reply('I did a quick google search for "' + msg.content.slice(0,-1) + '" and I found ' + googleResult)
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