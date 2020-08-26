const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Json Files/config.json')
const prefix = 'YOUR_PREFIX'

const fs = require('fs');
client.commands = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);
    console.log(`${files.length} commands loads !`);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log('Commands not found');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.cmd.name, props);
    });
})

fs.readdir("./events/", (err, f) => {
    if (err) console.log(err)
    console.log(`${f.length} events loaded!`);

    f.forEach((f) => {
        const events = require(`./events/${f}`)
        const event = f.split('.')[0];

        client.on(event, events.bind(null, client));
    })
})

//Redirect to discord bot token
client.login(config.token)


client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    if (message.content.startsWith(prefix)) return;
    let args = message.content.substring(prefix.length).split(" ");

    let commandeFile = client.commands.get(cmd.slice(prefix.length));
    if (commandeFile) commandeFile.run(client, message, args)
});
