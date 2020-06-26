const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let servIcon = message.guild.iconURL;
    let servEmbed = new Discord.RichEmbed()
    .setDescription('Information sur le serv')
    .setColor('#ff0000')
    .setThumbnail(servIcon)
    .addField('Nom de serveur', message.guild.name)
    .addField('Nombre total de membre', message.guild.memberCount)
    .addField('Créer le', message.guild.createdAt)
    .addField('Vous avez rejoint le', message.guild.joinedAt);

    return message.channel.send(servEmbed);
}
    
module.exports.help = {
    name: "infoserv"
}