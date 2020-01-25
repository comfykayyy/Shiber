const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Skip extends Command {
    constructor (client) {
        super(client, {
            name: "skip",
            description: "Skips the current song.",
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
        this.client.player.get(message.guild.id).skip()
        reply("Music skipped successfully")
    }
}

module.exports = Skip;