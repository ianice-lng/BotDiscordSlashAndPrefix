// Déclarer toute les variables importantes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits,SlashCommandBuilder , ActivityType} = require('discord.js');
const { token } = require('./config.json');
const { type } = require('node:os');


// Déclare les Intents
const client = new Client({ intents: [Object.keys(GatewayIntentBits)] });

// Code Qui Permet D'enregister les slash commands
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();
const commandDossiers = fs.readdirSync('./commands');

for (const dossier of commandDossiers) {
  const commandsPath = path.join(__dirname, `commands/${dossier}`);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);

    const command = require(filePath);
    client.commands.set(command.data.name, command);
  }
}


// Bout de code qui permet déclarer le statut du bot et son username.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity({ type: ActivityType.Custom, name: "Dev By Zaphir.21" });
})


// Bout de code qui permet de retourner une erreur lors ce que une commande est mal écrite dans le code.
client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()){

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Une erreur s\'est produite.', ephemeral: true });
	}}else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
	}
});
client.on(Events.MessageCreate, async message => {
	if (message.author.bot) return;
    const prefix = '+';
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = message.client.commands.get(commandName);
    if (!command) return;
    if (typeof command.run === 'function') {
      try {
        await command.run(client, message, args);
      } catch (error) {
        console.error(error);
        message.reply('Il y a eu une erreur lors de l\'exécution de la commande.');
      }
    }
});
// client.once('ready', () => {
// 	console.log('Bot prêt !');
// 	sendRecurringMessage();
//   });
//   const u = 1
//   async function sendRecurringMessage() {
// 	const channel = await client.channels.fetch("1124099866025537709");
// 	if (u === 1) {
// 	  channel.send('<@706184131838476309>');
  
// 	  // Attendre 1 seconde avant d'envoyer le prochain message
// 	  setTimeout(sendRecurringMessage, 700);
// 	}
//   }
// Connecte le bot à Discord avec le const { token }.

client.login(token);