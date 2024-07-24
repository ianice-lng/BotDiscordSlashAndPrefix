const {  Events, GuildChannelManager, Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { execute } = require('./interactionCreate');
let { soutien } = require('../config.json')
module.exports = {
    name: Events.PresenceUpdate,
    async execute(oldPresence, newPresence){
        const user = newPresence.member.user;
        if (user.bot) return;
        let activite = newPresence.activities.filter(act => act.type == 4)
        activite = activite[0]
        msg = soutien.msg
        soutienRole = soutien.role
        const embed = new EmbedBuilder()
        embed.setFooter({text: "Merci à ce G.O.A.T du nom de Zaphir.21 pour ce merveilleux bot !"})
        embed.setTimestamp()
        const channel = newPresence.guild.channels.cache.get("1249995016873709589")
        try{
        if (!newPresence.member.roles.cache.has(soutienRole)) {
                if (activite.state.includes(msg)) {
                    // alors, ajouter le role
                    newPresence.member.roles.add(soutienRole, "Soutien")
                    embed.setTitle("Nouveau Soutien")
                    embed.setDescription(`${user.username} vient de recevoir le rôle soutien !`)
                    embed.setColor("#00FF00")
                    channel.send({ embeds: [embed] })
                }
            
        }
        // Pour retirer le rôle
        else {
                if (activite.state.includes(msg)) {
                    return // s'il contient un msg de soutien
                }
                newPresence.member.roles.remove(soutienRole, "Soutien")
                embed.setTitle("Soutien Perdu")
                    embed.setDescription(`${user.username} vient de perdre le rôle soutien ce noubs!`)
                    embed.setColor("#FF0000")
                    channel.send({ embeds: [embed] })
            

        }
        }catch (e){
            if(!oldPresence.member.roles.cache.has(soutienRole)) return
            newPresence.member.roles.remove(soutienRole, "Soutien")
            embed.setTitle("Soutien Perdu")
                embed.setDescription(`${user.username} vient de perdre le rôle soutien ce noubs!`)
                embed.setColor("#FF0000")
                channel.send({ embeds: [embed] })}
        }
    }
