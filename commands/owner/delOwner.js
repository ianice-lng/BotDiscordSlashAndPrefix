const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot} = require('../../config.json');
const fs = require('fs').promises;
const path = require('path');
module.exports = {
  description: "Commande de test pour le developpeur", 
  data: new SlashCommandBuilder()
    .setName('delowner')
    .setDescription("Commande de test pour le developpeur")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
        option
            .setName('utilisateur')
            .setDescription('Quel utilisateur vous voulez mettre owner sur le bot ?') 
            .setRequired(true)),
  async execute(interaction) {
    const addUser = interaction.options.getUser('utilisateur')
    command(interaction, addUser)
},
async run(client, message, args){
  if(args[0]){
    
  try{const user = message.mentions.users.first() !== undefined ? message.mentions.users.first() : client.users.cache.get(args[0])

    if(user.id){
    command(message, user)
   }else{
    message.reply("Veuillez mentionner un utilisateur")
  }}catch(err){
     message.reply("Veuillez mentionner un utilisateur")
    }
  
}else{
    message.reply("Veuillez mentionner un utilisateur")
  }
}};
async function command(interaction, user) {
  const configPath = path.resolve(__dirname, '../../config.json');

  try {
      const data = await fs.readFile(configPath, 'utf8');
      const config = JSON.parse(data);

      if (!config.ownerBot.includes(user.id)) {
          return interaction.reply({ content: "Il n'est pas owner du bot", ephemeral: true });
      }

      config.ownerBot.shift(user.id);

      await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
      await interaction.reply({ content: `${user.username} vient d'être supprimé des owners du bot`, ephemeral: true });
  } catch (error) {
      await interaction.reply({ content: "Une erreur s'est produite lors de la modification du fichier de configuration", ephemeral: true });
  }
}