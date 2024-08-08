const { SlashCommandBuilder, StringSelectMenuBuilder,ActivityType, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot} = require('../../config.json');
const fs = require('fs').promises;
const path = require('path');
module.exports = {
  description: "Commande de test pour le developpeur", 

  data: new SlashCommandBuilder()
    .setName('status-bot')
    .setDescription("Commande pour faire parler le bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
        option
            .setName('message')
            .setDescription('Quel status voulez-vous que le bot ait ?')
            .setRequired(true)),
  async execute(interaction) {
    const message = interaction.options.getString('message');
    interaction.client.user.setActivity({ type: ActivityType.Custom, name: message });
    command(interaction, interaction.user, message)
},
async run(client, message, args){
    if(!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        client.user.setActivity({ type: ActivityType.Custom, name: args.join(" ") });
        command(message, message.author, args.join(" "))
}
};
async function command(interaction, user, message) {
    if(!ownerBot.includes(user.id)) return interaction.reply({content: "Vous n'êtes pas autorisé à utiliser cette commande", ephemeral: true})
        const configPath = path.resolve(__dirname, '../../config.json');
    const data = await fs.readFile(configPath, 'utf8');
      const config = JSON.parse(data);
      config.status = message;
      console.log(config)
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8').then(() => {
     interaction.reply({content: "le status a été modifié", ephemeral: true})
    })

}