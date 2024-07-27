const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot} = require('../../config.json');
const fs = require('fs').promises;
const path = require('path');
module.exports = {
  description: "Commande de test pour le developpeur", 
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription("Commande pour ban les utilisateurs")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
        option
            .setName('utilisateur')
            .setDescription('Quel utilisateur vous voulez ban') 
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('raison')
            .setDescription('Quel est la raison du ban ?')
            .setRequired(false)),
  async execute(interaction) {
    const targetUserId = interaction.options.get('utilisateur').value;
    const banUser = await interaction.guild.members.fetch(targetUserId);
    const raison = interaction.options.getString('raison') || `Aucune raison fournie`
    const memberHighestRole = interaction.member.roles.highest.position;
    const targetHighestRole = banUser.roles.highest.position;
    if (targetHighestRole >= memberHighestRole) {
      return interaction.reply("Tu ne peux pas bannir cet utilisateur !");
    }
    commandBan(interaction, banUser, raison, interaction.member)
},
async run(client, message, args){
  
  if(!message.member.permissions.has(PermissionFlagsBits.BanMembers)){ 
    return message.reply("Vous n'avez pas les permissions pour utiliser cette commande")
    }
   
  if(args[0]){
    const guild = client.guilds.cache.get(message.guild.id)
  try{const user = message.mentions.users.first() !== undefined ? message.mentions.users.first() : guild.member.cache.get(args[0])
    const memberHighestRole = message.member.roles.highest.position;
    const targetHighestRole = message.mentions.members.first().roles.highest.position;
    if (targetHighestRole <= memberHighestRole) {
      return message.reply("Tu ne peux pas bannir cet utilisateur !");
    }
    if(user.id){
    const member = message.guild.members.cache.get(user.id)
        
    commandBan(message, member, args.slice(1).join(" ") || "Aucune raison fournie", message.member)
   }else{
    message.reply("Veuillez mentionner un utilisateur")
  }}catch(err){
     message.reply("Veuillez mentionner un utilisateur")
    }
  
}else{
    message.reply("Veuillez mentionner un utilisateur")
  }
}};
async function commandBan(message, member, raison, author) {
    if (member.id === author.id) {
        return message.reply({ content: "Tu ne peux pas te bannir !" , allowedMentions: { repliedUser: false }})
      }
      
      try {
        await member.ban({ reason: `${raison} \n Ban par ${author.user.username}` })
      }
      catch (e) {
        console.error(e)
        return message.reply({ content: "Je n'ai pas réussi à bannir cet utilisateur.", allowedMentions: { repliedUser: false }})
      }
      await message.reply({ content: `<@${member.id}> à été **ban**` }).catch(err => err)
      try {
       await member.send({ content: `Tu as été banni par **${author}** de \`${message.guild.name}\` pour la raison suivante: \n\n ${raison}` })
      } catch (e) {
        // si ça n'arrive pas à lui send le dm, pas grave
      }
}