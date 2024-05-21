const { SlashCommandBuilder, StringSelectMenuBuilder, EmbedBuilder,ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs').promises;
// description: "Pour voir les informations sur toute les commandes", 

module.exports = {
  description: "Pour avoir les informations sur toute les commandes", 
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Pour voir les informations sur toute les commandes")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle("Commande Help")
    const ascii = require("ascii-table");
const fs = require("fs");
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
    commandNameDescription.push(`**${commandFile.data.name}**:  ${commandFile.description}`)
  }
}
const fieldsValue = commandNameDescription.join('\n');
exampleEmbed.addFields({ name: `__${dossier.toUpperCase()}__`, value: `${fieldsValue}`, inline: false})

}
await interaction.reply({embeds: [exampleEmbed]})
} 
};