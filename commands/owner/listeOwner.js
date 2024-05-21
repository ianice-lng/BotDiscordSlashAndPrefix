const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits} = require('discord.js');

const fs = require('fs').promises;
const path = require('path');
module.exports = {
  description: "Commande de test pour le developpeur", 

  data: new SlashCommandBuilder()
    .setName('liste-owner')
    .setDescription("Commande pour lister les owners du bot"),
  async execute(interaction) {
    command(interaction)
},
async run(client, message, args){
  command(message)
}
};
async function command(interaction) {
    const configPath = path.resolve(__dirname, '../../config.json');
    const data = await fs.readFile(configPath, 'utf8');
      const config = JSON.parse(data);
    const embed = new EmbedBuilder()
    .setTitle("Liste des owners du bot")
    .setColor("#00FF00")
    .setTimestamp()
    .setDescription(await config.ownerBot.map(owner => `<@${owner}>`).join('\n'))
    await interaction.reply({embeds: [embed], ephemeral: true})
}