require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Load all the command files
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Create a new instance of the REST API
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// Deploy the commands (guild-specific for fast development)
(async () => {
    try {
        console.log("⏳ Refreshing (/) slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("✅ Successfully registered application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
