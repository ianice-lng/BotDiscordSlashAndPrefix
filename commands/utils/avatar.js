const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs').promises;

module.exports = {
  description: "Pour avoir son avatar ou l'avatar d'une personne", 
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Commande pour avoir l'avatar d'un utilisateur")
    .addUserOption(option =>
        option
            .setName('utilisateur')
            .setDescription('De quel utilisateur voulez-vous l\'avatar ?')
            .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur') || interaction.user;
    command(interaction, user)
},
  async run(client, message, args){
    const user = message.mentions.users.first() || message.author;
    command(message, user)
  }
};
async function command(message, user) {
  const avatarImage = user.displayAvatarURL({dynamic: true})
    message.reply({content: `Voici l'avatar de **${user.username}**`, files: [{
        attachment: avatarImage
      }]})
}