const { SlashCommandBuilder,ActivityType, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot} = require('../../config.json');
const { stringify } = require('querystring');
const fs = require('fs').promises;

module.exports = {
  description: "Commande de test pour le developpeur", 

  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription("Commande de mute pour les utilisateurs")
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .addUserOption(option =>
        option
            .setName('utilisateur')
            .setDescription('Quel utilisateur vous voulez mute ?') 
            .setRequired(true)),
  async execute(interaction) {
    const targetUser = interaction.options.getMember('utilisateur');
    targetUser.timeout(null)
    interaction.reply(`L'utilisateur ${targetUser.user.username} a été unmute`)
},
async run(client, message, args){
    
  if(!message.member.permissions.has(PermissionFlagsBits.MuteMembers)){ 
    return message.reply("Vous n'avez pas les permissions pour utiliser cette commande")
    }
   
  if(args[0]){
  try{const user = message.mentions.users.first() !== undefined ? message.mentions.users.first() : message.guild.members.cache.get(args[0])

    if(user.id){
        user.timeout(null)
        message.reply(`L'utilisateur ${user.user.username} a été unmute`)
   }else{
    message.reply("Veuillez mentionner un utilisateur")
  }}catch(err){
     message.reply("Veuillez mentionner un utilisateur")
    }
  
}else{
  console.log("test2")
    message.reply("Veuillez mentionner un utilisateur")
  }
}
};
