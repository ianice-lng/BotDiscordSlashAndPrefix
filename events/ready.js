const { SlashCommandBuilder, Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle,} = require('discord.js');
const {  Events, GuildChannelManager } = require('discord.js');
const fs = require('fs');
const dataFilePath = 'user.json';
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
	},
};