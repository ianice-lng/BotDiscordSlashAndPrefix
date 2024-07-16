const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

// description: "Pour voir les informations sur toute les commandes", 
const ascii = require("ascii-table");
const fs = require("fs");
module.exports = {
  description: "Pour avoir les informations sur toute les commandes", 
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Pour voir les informations sur toute les commandes")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    command(interaction, interaction.user);
},
  async run(client, message, args){ 
    command(message, message.author);
    
  }
};

async function command(interaction, user) {
  const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle("Commande Help")
  
const table = new ascii().setHeading("Commands", "Status");
commandDossiers = fs.readdirSync('./commands');
for (const dossier of commandDossiers){
if(dossier === "developer") continue; 
const commandFiles = fs.readdirSync(`./commands/${dossier}/`).filter(file => file.endsWith('.js'));
let commandNameDescription = [];

for (const folder of commandFiles) {
const folderPath = `./commands/${dossier}/${folder}`;

const isFile = fs.statSync(folderPath).isFile();
if (isFile && folderPath.endsWith(".js")) {
  const commandFile = require(`../../commands/${dossier}/${folder}`);

  const properties = { folder, ...commandFile };
  commandNameDescription.push(`**${commandFile.data.name}**:  ${commandFile.data.description}`)
}
}
const fieldsValue = commandNameDescription.join('\n');
exampleEmbed.addFields({ name: `__${dossier.toUpperCase()}__`, value: `${fieldsValue}`, inline: false})

}
await interaction.reply({embeds: [exampleEmbed]})
}