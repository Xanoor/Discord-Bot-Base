const Discord = require("discord.js")

module.exports = client => {
    console.log("Your bot is online !");
    client.user.setPresence({ activity: { name: 'https://github.com/Xanoor/Discord-Bot-Base' }, status: 'online' })
}