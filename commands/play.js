const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Play extends Command {
    constructor (client) {
        super(client, {
            name: "play",
            description: "Plays a certain song or adds it to the queue.",
            category: "Music",
            usage: "<music name>",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permLevel: "User",
            cooldown: 5,
            args: true
        });
    }

    async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
        if(this.client.lavalinkManager.manager.has(message.guild.id)) {
            this.client.player.get(message.guild.id).play(args.join(' ')).then(info => {
                reply(`\`${info.title}\` has been added to queue`)
            })
        } else {
            let player = await this.client.lavalinkManager.join(message.member.voice.channel.id)
            player.on('playingNow', track => {
                reply(`Playing now: \`${track.info.title}\``)
                this.client.player.get(message.guild.id).playingNow = track
            })
            player.play(args.join(' '))
            this.client.player.set(message.guild.id, player)
        }
    }
}

module.exports = Play;
