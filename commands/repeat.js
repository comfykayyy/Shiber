const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Repeat extends Command {
    constructor (client) {
        super(client, {
            name: "repeat",
            description: "Repeat the current track.",
            category: "Music",
            usage: "",
            enabled: true,
            guildOnly: true,
            aliases: ['loop'],
            permLevel: "User",
            cooldown: 5,
            args: false
        });
    }

    async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
        if(this.client.player.get(message.guild.id).repeat === false) {
            this.client.player.get(message.guild.id).repeat = true
            reply("Repeat mode enabled!")
        } else {
            this.client.player.get(message.guild.id).repeat = false
            reply("Repeat mode disabled!")
        }
    }
}

module.exports = Repeat;
