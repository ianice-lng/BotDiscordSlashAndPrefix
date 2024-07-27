const { SlashCommandBuilder,ActivityType, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot} = require('../../config.json');
const { stringify } = require('querystring');
const fs = require('fs').promises;

module.exports = {
  description: "Commande de test pour le developpeur", 

  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription("Commande de mute pour les utilisateurs")
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .addUserOption(option =>
        option
            .setName('utilisateur')
            .setDescription('Quel utilisateur vous voulez mute ?') 
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('temps')
            .setDescription('Combien de temps voulez vous mute cet utilisateur en minute?')
            .setRequired(true)),
  async execute(interaction) {
    const targetUser = interaction.options.getMember('utilisateur');
    const time = interaction.options.getString('temps');
    const timeInMin = time.split(" ")
    console.log(timeInMin[0])
    try{
    let timeInMil = getMs(timeInMin[0]);
        let timeInMil2 = getMs(timeInMin[1] || "0m");
        let timeInMil3 = getMs(timeInMin[2] || "0m");
        if(timeInMil === null || timeInMil2 === null || timeInMil3 === null){
            return message.reply("Veuillez entrer un temps valide, exemple: 5m, 10s, 1h, 1d")
        }
    const memberHighestRole = interaction.member.roles.highest.position;
    const targetHighestRole = targetUser.roles.highest.position;
    if (targetHighestRole > memberHighestRole) {
      return interaction.reply({content: "Tu ne peux pas mute cet utilisateur !", ephemeral: true});
    }
    const timeResult = timeInMil + timeInMil2 + timeInMil3
    targetUser.timeout(timeResult)
    interaction.reply(`L'utilisateur ${targetUser.user.username} a été mute pendant ${textTimeConvert(timeInMin[0])} ${timeInMin[1] ? textTimeConvert(timeInMin[1]) : ""} ${timeInMin[2] ? textTimeConvert(timeInMin[2]) : ""}`)
}catch(err){
    console.log(err)
        message.reply("Une erreur est survenue, merci de réessayer avec un temps valide (exemple: 1h 30m 10s)")
    }
},
async run(client, message, args){
  if(!message.member.permissions.has(PermissionFlagsBits.MuteMembers)){ 
    return message.reply("Vous n'avez pas les permissions pour utiliser cette commande")
    }
   
  if(args[0]){
 const guild = client.guilds.cache.get(message.guild.id)
  try{const user = message.mentions.users.first() !== undefined ? message.mentions.users.first() : guild.members.cache.get(args[0])
    const memberHighestRole = message.member.roles.highest.position;
    const targetHighestRole = user.roles.highest.position;
    const member = message.guild.members.cache.get(user.id)
    if (targetHighestRole > memberHighestRole) {
      return interaction.reply("Tu ne peux pas mute cet utilisateur !");
    }
    if(user.id){
        try{
            let timeInMil = getMs(args[1]);
            let timeInMil2 = getMs(args[2] || "0m");
            let timeInMil3 = getMs(args[3] || "0m");
            if(timeInMil === null || timeInMil2 === null || timeInMil3 === null){
                return message.reply("Veuillez entrer un temps valide, exemple: 5m, 10s, 1h, 1d")
            }
            const time = timeInMil + timeInMil2 + timeInMil3
            member.timeout(time)
    
            message.reply(`L'utilisateur ${member.user.username} a été mute pendant ${textTimeConvert(args[1])} ${args[2] ? textTimeConvert(args[2]) : ""} ${args[3] ? textTimeConvert(args[3]) : ""}`)
            // commandMute(message, message.author, user)
            }
            catch(err){
                message.reply("Une erreur est survenue, merci de réessayer avec un temps valide (exemple: 1h 30m 10s)")
            }
   }else{
    message.reply("Veuillez mentionner un utilisateur")
  }}catch(err){
     message.reply("Veuillez mentionner un utilisateur")
    }
  
}else{
    message.reply("Veuillez mentionner un utilisateur")
  }
}
};
function getMs(temps) {
    const regex = /^(\d+)([mshd]?)$/; //
    const match = temps.match(regex);

    if (!match) {
        temps = null
        return
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case "m":
            return value * 60 * 1000; // minutes to milliseconds
        case "s":
            return value * 1000; // seconds to milliseconds
        case "h":
            return value * 60 * 60 * 1000; // hours to milliseconds
        case "d":
            return value * 24 * 60 * 60 * 1000; // days to milliseconds
        default:
            temps = null
    }
}
function textTimeConvert(time){
    const time2 = new String(time)
    return time2.replace("s", "seconde(s)").replace("d", "jour(s)").replace("m", "minute(s)").replace("h", "heure(s)")
}