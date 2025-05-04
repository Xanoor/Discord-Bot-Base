module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`✅ Connected as ${client.user.tag}`);

        // ========== Load & Register Slash Commands ==========
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
                    `[WARNING] Command "${file}" is missing "data" or "execute".`
                );
            }
        }

        try {
            // ========== Global Command Registration ==========
            await client.application.commands.set(commands);
            console.log("✅ Slash commands registered successfully!");
        } catch (error) {
            console.error("❌ Failed to register slash commands:", error);
        }
    },
};
