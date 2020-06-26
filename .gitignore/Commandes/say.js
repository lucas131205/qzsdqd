const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGE"))return message.reply("Vous n'avez pas la permission pour fair cela !");
    let messageToBot = args.join(" ");
    message.delete().catch();
    message.channel.send(messageToBot);
}

module.exports.help = {
    name: "say"
}