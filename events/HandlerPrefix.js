const { Events } = require('discord.js');
const { ownerBot } = require('../config.json');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;

    const prefix = '+';
    if (!message.content.startsWith(prefix)) return;
    console.log(message.content)
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    console.log(commandName)
    const command = message.client.commands.get(commandName);
    if (!command) return;
    console.log(command)
    if (typeof command.run === 'function') {
      try {
        await command.run(message, args);
      } catch (error) {
        console.error(error);
        message.reply('Il y a eu une erreur lors de l\'exécution de la commande.');
      }
    }
  }
};
