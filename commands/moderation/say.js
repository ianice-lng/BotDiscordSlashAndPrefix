const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot} = require('../../config.json');
const fs = require('fs').promises;

module.exports = {
  description: "Commande de test pour le developpeur", 

  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription("Commande pour faire parler le bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption(option =>
        option
            .setName('message')
            .setDescription('Quel message voulez-vous que le bot dise ?')
            .setRequired(true)),
  async execute(interaction) {
    const message = interaction.options.getString('message');
    const channel = interaction.channel;
    interaction.reply({content: "Le message a été envoyé", ephemeral: true})
    channel.send(message)

},
async run(client, message, args){
    if(!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) return message.channel.send("Vous n'avez pas la permission de faire parler le bot")
    message.delete()
    message.channel.send(args.join(" "))
}
};