const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("CMD_NAME")
        .setDescription("Custom message!"),
    async execute(interaction) {
        "YOUR_CODE"
    },
};
