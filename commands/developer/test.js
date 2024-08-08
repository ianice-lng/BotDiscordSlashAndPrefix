const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot, soutienRole} = require('../../config.json');
const fs = require('fs').promises;

module.exports = {
  description: "Commande de test pour le developpeur", 

  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription("Commande de test pour le developpeur")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    command(interaction, interaction.user)
},
async run(client, message, args){
  
  command(message, message.author)
}
};
async function command(interaction, user) {
    console.log(ownerBot.includes(user.id))
    if(!ownerBot.includes(user.id)) return interaction.reply("Vous n'êtes pas autorisé à utiliser cette commande")
    interaction.reply({content: "Commande de test pour le developpeur", ephemeral: true})
}