const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const channel = client.channels.cache.get('id');

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
    if (msg.content.endsWith("?") && msg.content.length>1){
        const args = msg.content.split(/ +/);
        let searchTopic = args.join('+').slice(0,-1);
        for(let i = 0; i<searchTopic.length; i++){
            if(searchTopic.endsWith("?")){
                searchTopic=searchTopic.slice(0,-1);
            }
        }
        let googleResult = `https://google.com/search?q=${searchTopic}`

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Google results for: " + msg.content.slice(0,-1))
            .setURL(googleResult)
            .setAuthor({ name: msg.author.username, iconURL: 'https://static.wikia.nocookie.net/parody/images/5/5b/Profile_-_Donkey.jpg/revision/latest?cb=20200804211128', url: googleResult })
            .setDescription(msg.author.username + ' had a question.')
            .setThumbnail('https://static.wikia.nocookie.net/parody/images/5/5b/Profile_-_Donkey.jpg/revision/latest?cb=20200804211128')
            msg.channel.send({embeds: [embed]});
    }
    if (msg.content.includes("lol")){
        msg.react("😂")
    }
    if (msg.content.startsWith("setupVote")){
        const reactions = ["🎃","🤖","👽","👾","👻","💎","🦍","🚀","🍔"]
        let options = msg.content.slice(msg.content.length-1);
        for(let i = 0; i < options; i++){
            msg.react(reactions[i]);
        }
    }
})

client.login(process.env.TOKEN)