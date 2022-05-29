const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const cron = require("cron");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
    //if interrogative statement ends in "?" will google that
    if (msg.content.endsWith("?") && msg.content.length>1
        && (msg.content.includes("what")
            || msg.content.includes("why")
            || msg.content.includes("how")
            || msg.content.includes("where")
            || msg.content.includes("which")
            || msg.content.includes("when")
            || msg.content.includes("can")
            || msg.content.includes("is"))
        ){
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
        msg.channel.send("That's a great question " + msg.author.username + "! I did a quick google and found this:")
        msg.channel.send({embeds: [embed]});
    }
    // anytime "lol" is said it will react
    if (msg.content.includes("lol")){
        msg.react("😂")
    }
    // type "setupVote x" where x is 1-9 for voteemojis
    // MAKE THIS BETTER
    if (msg.content.startsWith("setupVote")){
        const reactions = ["🎃","🤖","👽","👾","👻","💎","🦍","🚀","🍔"]
        let options = msg.content.slice(msg.content.length-1);
        for(let i = 0; i < options; i++){
            msg.react(reactions[i]);
        }
    }
})
// mon through fri 8-4 will send this message
let scheduledMessage = new cron.CronJob('00 00 08-16 * * 1-5', () => {
    let channel = client.channels.cache.get('id');
    channel.send('You guys are awesome! keep it up!');
});
scheduledMessage.start();

client.login(process.env.TOKEN)