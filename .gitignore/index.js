const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const prefix = "!";

// quand le bot se connecter on avois dans la consol le bot est connecté
client.on('ready', () => {
	console.log(`le bot ${client.user.tag} est connecté !`);
});


fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

// command help :
client.on('message', msg => {
	if(msg.content === (prefix + 'help')) {
		const embed = new MessageEmbed()
		.setDescription('Les command du bot : ')
		.setColor('#2EFF00')
		.addField(`!help_command_bienvenue`, 'Pour afficher les command bienvenue')
		.addField(`!ban`, 'ban un joueur spécifier')
		.addField(`!kick`, 'kick un joueur spécifier')
		.addField(`!clear`, 'pour enlever le nombre de message spécifier')
		.addField(`!mute`, 'muter un joueur spécifier')
		.addField(`!ping`, 'affiche un ping')
		.addField(`!say`, 'say le bot écrit se que vous écriver')
		.addField(`!infoserv`, 'affiche les info du serveur')
	   msg.channel.send(embed)
	};	
});

//command help Message bienvenue et aurevoir :
client.on('message', msg => {
	if(msg.content === (prefix + 'help_command_bienvenue')) {
		const embed = new MessageEmbed()
		.setDescription('Les command pour avoir un message de bienvenue')
		.setColor('#2EFF00')
		.addField(`message bienvenue`, 'pour avoir un message de bienvenue il faut avoir just un channel écritur : bienvenue')
		.addField(`message aurevoir`, 'pour avoir un message d\'adieu il faut avoir just un channel écritur : aurevoir')
	   msg.channel.send(embed)
	}
})

//  command ban :
client.on('message', message => {
	if(!message.guild) return;
	if(message.content.startsWith(prefix + 'ban')) {
		const user = message.mentions.users.first();
		if(user) {
			const member = message.guild.member(user);
			if(member) {
				member
				.ban({
					reason: 'Il été movais',
				})
				.then(() => {
					message.reply(`L'utilisateur ${user.tag} a bien été Ban`);
				})
				.catch(err => {
					message.reply("je nes pas pu ban l\'utilisateur spécifier !")
					console.error(err)
				})
			} else {
				message.reply('L\'utilisateur nes pas sur le serveur!')
			}
		} else {
			message.reply('Il faut mentiones une person pour la ban')
		}
	}
});

// comand kick :
client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('!kick')) {
    const user = message.mentions.users.first();    
    if (user) {      
      const member = message.guild.member(user);      
      if (member) {    
        member
          .kick('Raison facultative qui s\'affichera dans les logs')
          .then(() => {            
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {            
            message.reply('je nes pas pu ban l\'utilisateur spécifier');            
            console.error(err);
          });
      } else {   
        message.reply("L'utilisateur nes pas sur le serveur!");
      }
      
    } else {
      message.reply("Il faut mentiones une person pour la kick!");
    }
  }
});
//command bienvenue 
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenue')
	if(!channel) return;
	let embed = new MessageEmbed()
		.setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
		.setFooter('Nous sommes désormais ' + member.guild.memberCount)
		.setColor('#ABABAB')
	channel.send(embed);
});

//command aurevoir
client.on('guildMemberRemove', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'aurevoir')
	if(!channel) return;
	let embed = new MessageEmbed()
		.setDescription(':cry: **' + member.user.username + '** a quitté le serveur ' + member.guild.name)
		.setFooter('Nous sommes désormais ' + member.guild.memberCount)
		.setColor('#ff0000')
	channel.send(embed);
});


client.login('NzI1NzcxMjgwMzcyMDcyNDQ5.XvYteg.-6ZQ36I7yEfY33d7s3m082bGetk')
