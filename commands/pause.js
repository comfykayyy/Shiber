const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Pause extends Command {
    constructor (client) {
        super(client, {
            name: "pause",
            description: "Pauses or resumes the music playback.",
            category: "Music",
            usage: "",
            enabled: true,
            guildOnly: true,
            aliases: ['resume'],
            permLevel: "User",
            cooldown: 5,
            args: false
        });
    }

    async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
        this.client.player.get(message.guild.id).player.pause()
    }
}

module.exports = Pause;
