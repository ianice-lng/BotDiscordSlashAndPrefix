const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs').promises;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription("Commande pour unlock un salon")
    .addChannelOption(option =>
        option
            .setName('salon')
            .setDescription('Quel salon voulez-vous unlock ?') 
            .setRequired(false)),
  async execute(interaction) {
    const channel = interaction.options.getChannel('salon') || interaction.channel;
    let everyone = interaction.guild.roles.cache.find(x => x.name === '@everyone');
        // Lock the current channel
        if(!channel.permissionsFor(everyone).serialize().SendMessages){
        // Lock the current channel
        channel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, { SendMessages: true });  
        // Optional: Send a confirmation message
        interaction.reply({content: "Le salon a été déverrouillé !", ephemeral: true});}else{
            interaction.reply({content: "Le salon est déjà déverrouillé !" , ephemeral: true})
        }
},
  async run(client, message, args){
    let everyone = message.guild.roles.cache.find(x => x.name === '@everyone');
        // Lock the current channel
        if(!message.channel.permissionsFor(everyone).serialize().SendMessages){
        // Lock the current channel
        message.channel.permissionOverwrites.edit(message.guild.roles.everyone.id, { SendMessages: true });
        // Optional: Send a confirmation message
        message.channel.send("Le salon a été déverrouillé !");}else{
            message.channel.send("Le salon est déjà déverrouillé !")
        }
  }
};



