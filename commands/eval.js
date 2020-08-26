const Discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    if (message.author.id !== "YOUR_ID") return message.channel.send('Vous n\'avez pas de droit d\'éxécuter cette commande !')
    try {
        let codein = args.slice(1).join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
       
    } catch (e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}

module.exports.cmd = {
    name: 'eval'
}
