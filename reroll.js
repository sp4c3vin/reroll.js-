const ms = require('ms');

module.exports = {
    name: "reroll",
    description: "Rerolls giveaway",

    async run (client, message, args){

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have permission to rerol giveaways');

        if(!args[0]) return message.channel.send('Ne ispravan Giveaway ID ste dali');

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway) return message.channel.send('Nismo pronasli id/ime giveawaya');

        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send('Giveaway rerolled')
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway id  ${giveaway.messageID} nije endovan`)){
                message.channel.send('Giveaway je endovan kako ce te rerollovat?')
            } else {
                console.error(e);
                message.channel.send('Error Reroll!')
            }
        })
    }
}
