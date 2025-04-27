# Discord-Bot-Base

## 📜 Slash Command Registration System

In Discord bots, slash commands (`/`) need to be **registered with Discord's API** before they can appear in the client.

This project uses a **separate deploy script** (`deploy-commands.js`) to handle command registration.

### Why use a separate deploy script?

- ✅ **Faster development**:  
  By registering commands only for a specific server (guild), changes appear instantly (within 1–5 seconds).
  
- ✅ **Avoid global delays**:  
  If you register commands globally, Discord may take **up to 1 hour** to update them across all servers.

- ✅ **Cleaner startup**:  
  We avoid flooding the bot startup code with registration logic.

---

### How to deploy the slash commands

1. Make sure your `.env` file includes:
   ```
   TOKEN=your_bot_token
   CLIENT_ID=your_bot_application_id
   GUILD_ID=your_test_server_id
   ```

2. Run the deploy script manually:
   ```bash
   node deploy-commands.js
   ```

3. If successful, you will see:
   ```
   ✅ Successfully registered application (/) commands.
   ```

4. In your server, type `/` and you should see your commands appear!

---

### Important Notes

- **Only run `deploy-commands.js` when you add, remove, or modify commands.**  
  No need to run it on every bot restart unless you change the commands.

- **For production bots**, you can switch to registering commands globally using:
  ```js
  Routes.applicationCommands(CLIENT_ID)
  ```
  But remember: **global registration can take up to an hour** to propagate!

---
