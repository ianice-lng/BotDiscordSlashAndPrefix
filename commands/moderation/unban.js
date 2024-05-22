const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs').promises;

module.exports = {
  description: "Pour avoir son avatar ou l'avatar d'une personne", 
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription("Commande pour debannir un utilisateur")
    .addStringOption(option =>
        option
            .setName('utilisateur')
            .setDescription('Quel utilisateur vous voulez debannir ?')
            .setRequired(true)
            .setAutocomplete(true)),
  async autocomplete(interaction){
    const bans = await interaction.guild.bans.fetch();
    const choices = bans.map(ban => {
      return {name: ban.user.username, value: ban.user.id}
    })
    interaction.respond(
        bans.map(ban => {
          return {name: ban.user.username, value: ban.user.id}
        })
    )
  },
  async execute(interaction) {
    const user = interaction.options.getString('utilisateur');
    command(interaction, user)
},
  async run(client, message, args){
    const user = args[0];
    command(message, user)
  }
};
async function command(message, userID) {
  try{
  const user = await message.guild.members.unban(userID)
  message.reply(`L'utilisateur ${user.username} a été debanni`)}
    catch(err){
        message.reply("Merci de mettre une ID valide, vous pouvez utiliser la slash command c'est plus simple")
    }
}