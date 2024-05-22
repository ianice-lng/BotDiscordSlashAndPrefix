const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot} = require('../../config.json');
const fs = require('fs').promises;

module.exports = {
  description: "Commande de test pour le developpeur", 

  data: new SlashCommandBuilder()
    .setName('listeban')
    .setDescription("Commande pour lister les bans du serveur"),
  async execute(interaction) {
    commandListeBan(interaction, interaction.user)
},
async run(client, message, args){
  commandListeBan(message, message.author)
}
};
async function commandListeBan(interaction, user) {
    const bans = await interaction.guild.bans.fetch();
    const embed = new EmbedBuilder()
    .setTitle("Liste des bans du serveur")
    .setColor("#FF0000")
    .setTimestamp()
    if(bans.size === 0){embed.setDescription("Aucun utilisateur banni sur ce serveur")}else{
    embed.setDescription(bans.map(ban => `${ban.user.username} - ${ban.user.id}`).join('\n'))}
    await interaction.reply({embeds: [embed], ephemeral: false})
}