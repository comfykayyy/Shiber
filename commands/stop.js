const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Stop extends Command {
    constructor (client) {
        super(client, {
            name: "stop",
            description: "Stops the music playback.",
            category: "Music",
            usage: "",
            enabled: true,
            guildOnly: true,
            aliases: [],
            permLevel: "User",
            cooldown: 5,
            args: false
        });
    }

    async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
        this.client.player.get(message.guild.id).player.stop()
        await this.client.lavalinkManager.manager.leave(message.guild.id)
        this.client.lavalinkManager.manager.delete(message.guild.id)
        this.client.player.delete(message.guild.id)

        reply(`Sucessfully stopped!`)
    }
}

module.exports = Stop;
