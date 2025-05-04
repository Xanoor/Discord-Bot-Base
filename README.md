# 🛠️ Discord Bot Base (discord.js v14+)

This is a **modular and minimal base** for building a Discord bot with `discord.js`:

-   Slash commands with auto-registration
-   Dynamic command & event loading
-   Fast local development setup
-   Uses `.env` for secrets

---

## 📁 Project Structure

```bash
.
├── commands/              # Slash commands go here
├── events/                # Event handlers (ready, interactionCreate, etc.)
├── index.js               # Bot entry point
├── deploy-commands.js     # Optional script to manually deploy slash commands
├── .env                   # Environment variables
├── package.json           # Packages
```

---

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Xanoor/Discord-Bot-Base.git
cd Discord-Bot-Base
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file at the root with the following content:

```env
TOKEN=your-discord-bot-token
CLIENT_ID=your-discord-client-id
GUILD_ID=your-test-server-id
```

4. Start the bot:

```bash
node index.js
```

---

## ✅ `ready.js` (Core - Slash Command Registration)

Located in `events/ready.js`, this file **registers slash commands automatically** when the bot starts.

```js
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`✅ Logged in as ${client.user.tag}`);

        const commands = [];
        const commandsPath = path.join(__dirname, "../commands");
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            if ("data" in command && "execute" in command) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            } else {
                console.warn(
                    `[WARNING] Command ${file} is missing "data" or "execute".`
                );
            }
        }

        try {
            await client.application.commands.set(commands);
            console.log("✅ Slash commands registered successfully!");
        } catch (error) {
            console.error("❌ Failed to register slash commands:", error);
        }
    },
};
```

---

## 🎯 `interactionCreate.js` (Core - Command Execution)

This file listens for interaction events and executes the correct command logic.

```js
const { MessageFlags } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: `Error executing ${interaction.commandName}`,
                flags: MessageFlags.Ephemeral,
            });
        }
    },
};
```

---

## 🧪 Example Command

Create a file in `commands/` (e.g. `ping.js`):

```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply("🏓 Pong!");
    },
};
```

---

## 🔁 Optional: Manual Command Deployment

### Why use a separate deploy script?

-   ✅ **Faster development**:  
    By registering commands only for a specific server (guild), changes appear instantly (within 1–5 seconds).
-   ✅ **Avoid global delays**:  
    If you register commands globally, Discord may take **up to 1 hour** to update them across all servers.

-   ✅ **Cleaner startup**:  
    We avoid flooding the bot startup code with registration logic.

Use this script to manually deploy commands to a specific guild during development (`deploy-commands.js`):

```js
require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

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
```

Run it with:

```bash
node deploy-commands.js
```

---

## 📜 License

This project is open-source. Feel free to use, fork, or contribute.
