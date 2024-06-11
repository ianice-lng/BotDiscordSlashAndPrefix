const {  Events, GuildChannelManager } = require('discord.js');
const { execute } = require('./interactionCreate');
module.exports = {
    name: Events.PresenceUpdate,
    async execute(oldPresence, newPresence){
        const user = newPresence.member.user;
        let activite = newPresence.activities.filter(act => act.type == 4)
        activite = activite[0]
        let role = "1249990069826097202"
        msg = "eisfr"
        try{
        if (!newPresence.member.roles.cache.has(role)) {
            
                if (activite.state.includes(msg)) {
                    // alors, ajouter le role
                    newPresence.member.roles.add(role, "Soutien")
                    console.log(`${user.tag} a reçu le rôle soutien.`);
                }
            
        }
        // Pour retirer le rôle
        else {
                if (activite.state.includes(msg)) {
                    return // s'il contient un msg de soutien
                }
                newPresence.member.roles.remove(role, "Soutien")
                console.log(`${user.tag} a perdu le rôle soutien.`);
            

        }
        }catch (e){
            
        }
    }
}