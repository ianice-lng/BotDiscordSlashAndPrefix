const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		
    if (!interaction.isButton()) return;
	// console.log(interaction);
	const selected = interaction.customId;
	// console.log(selected)
	if (selected === 'primary') {//si le bouton est appuyez
		interaction.reply("test")
	}
}}