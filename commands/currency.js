const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const axios = require("axios")
const cheerio = require("cheerio")

class Currency extends Command {
    constructor (client) {
        super(client, {
            name: "currency",
            description: "Exchange your money to other currencies",
            category: "General",
            usage: "<from> <to> <quantity>",
            enabled: true,
            guildOnly: false,
            aliases: ['exchange', 'money'],
            permLevel: "User",
            cooldown: 5,
            args: true
        });
    }

    async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
        const from = args[0]
        const to = args[1]
        const quantity = parseFloat(args[2]) || 1

        const converted = await this.convert(quantity, from, to)

        reply(`**\`${quantity} ${from}\`** -> **\`${to}\` »** \`${converted} ${to}\` 💸`)
    }

    async convert(quantity, from, to) {
        const request = await axios.get(`https://www.investing.com/currencies/${from.toLowerCase()}-${to.toLowerCase()}`)
        const body = request.data

        const $ = cheerio.load(body)

        const text = $('#last_last').text()
        const rate = parseFloat(text)

        const converted = rate * quantity

        return converted
    }
}

module.exports = Currency;
