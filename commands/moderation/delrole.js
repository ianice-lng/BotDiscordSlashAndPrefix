const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot} = require('../../config.json');
const fs = require('fs').promises;
const path = require('path');
module.exports = {
  description: "Commande de test pour le developpeur", 
  data: new SlashCommandBuilder()
    .setName('delrole')
    .setDescription("Commande pour ajouter un role à un utilisateur")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption(option =>
        option
            .setName('utilisateur')
            .setDescription('Quel utilisateur vous voulez mettre owner sur le bot ?') 
            .setRequired(true))
    .addRoleOption(option =>
        option
            .setName('role')
            .setDescription('Quel role voulez vous ajouter à l\'utilisateur ?')
            .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur')
    const role = interaction.options.getRole('role')
    const memberHighestRole = interaction.member.roles.highest.position;
    const targetHighestRole = role.rawPosition;
    
    if (targetHighestRole >= memberHighestRole) {
      return interaction.reply("Tu ne peux pas supprimer ce role");
    }
    const member = interaction.guild.members.cache.get(user.id)
    
    commandBan(interaction, member, interaction.member, role)
},
async run(client, message, args){
  
  if(!message.member.permissions.has(PermissionFlagsBits.ManageRoles)){ 
    return message.reply("Vous n'avez pas les permissions pour utiliser cette commande")
    }
   
  if(args[0]){ 
  try{
    const user = message.mentions.users.first() !== undefined ? message.mentions.users.first() : client.users.cache.get(args[0])
    const memberHighestRole = message.member.roles.highest.position;
    const targetRole = message.mentions.roles.first();
    const targetHighestRole = targetRole.rawPosition;
    
    if (targetHighestRole >= memberHighestRole) {
      return message.reply("Tu ne peux pas supprimer ce role!");
    }
    if(user.id){
        
    commandBan(message, message.mentions.members.first(), message.member, targetRole)
   }else{
    message.reply("Veuillez mentionner un utilisateur ou un role")
  }}catch(err){
     message.reply("Veuillez mentionner un utilisateur ou un role") 
    }
  
}else{
    message.reply("Veuillez mentionner un utilisateur ou un role")
  }
}};
async function commandBan(message, member, author, role) {
    member.roles.remove(role).then(() => {
        message.reply(`Le role ${role.name} a bien été retiré à ${member.user.tag}`)
    }).catch(err => {
        message.reply("Une erreur est survenue")
    })
}