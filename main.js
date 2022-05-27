const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
    if (msg.content.includes("?") && msg.content.length>1){
        msg.reply("great question " + msg.author.username + "!")
        const args = message.content.slice(prefix.length).split(/ +/);
        const searchTopic = args.join('+').slice(-1)
        let googleResult = `https://google.com/search?q=${searchTopic}`

        let searchEmbed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(`Here's what Google came up with for ${searchTopic}!\n${googleResult}`)
        msg.reply.send(searchEmbed);
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