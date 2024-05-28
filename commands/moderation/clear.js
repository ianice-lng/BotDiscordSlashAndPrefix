const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const {ownerBot} = require('../../config.json');
const fs = require('fs').promises;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription("Commande qui permet de supprimer des messages dans un salon")
    .addNumberOption(option =>
        option
            .setName('nombre')
            .setDescription('Combien de messages voulez-vous supprimer ?')
            .setMaxValue(100)
            .setMinValue(1)
            .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getNumber('nombre');
    command(interaction, interaction.user, amount - 1, 1)
},
async run(client, message, args){
    const amount = Number(args[0]);
    if(!message.member.permissions.has(PermissionFlagsBits.ManageMessages)){ 
        return message.reply("Vous n'avez pas les permissions pour utiliser cette commande")
        }
    if(!amount) return message.reply("Veuillez entrer un nombre valide de messages à supprimer");
    if(amount > 100) return message.reply("Vous ne pouvez pas supprimer plus de 100 messages à la fois");
    command(message, message.author, amount, 0)
}
};
async function command(interaction, user, amount, messageOrInteraction) {
    if(!ownerBot.includes(user.id)) return interaction.reply("Vous n'êtes pas autorisé à utiliser cette commande")
    const messages = await interaction.channel.messages.fetch({limit: amount + 1});
    interaction.channel.bulkDelete(messages)
    if(messageOrInteraction === 0) return interaction.reply({content: `Suppression de ${amount} messages`}).then(msg => {
        setTimeout(() => {
            msg.delete()
        }, 5000)
    })
    interaction.reply({content: `Suppression de ${amount + 1} messages`, ephemeral: true}).then(msg => {
        setTimeout(() => {
            msg.delete()
        }, 5000)
    })
}