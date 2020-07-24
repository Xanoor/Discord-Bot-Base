const Discord = require("discord.js")

module.exports = async(client, message) => {
    if (message.content === "credit") {
        message.channel.send('This bot was made with this base: https://github.com/Xanoor/Discord-Bot-Base')
    }
}