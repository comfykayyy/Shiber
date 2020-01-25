const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const prettyMs = require("pretty-ms");

class Fetch extends Command {
  constructor (client) {
    super(client, {
      name: "fetch",
      description: "Track a user by theyr id.",
      category: "Tools",
      usage: "<user id>",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: true
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
    const id = args[0];

    try {
      await this.client.users.fetch(id);
    } catch (e) {
      return reply(t("commands:fetch.error", { id: id}));
    }

    const statuses = {
      "online": t("commands:fetch.status.online"),
      "dnd": t("commands:fetch.status.dnd"),
      "idle": t("commands:fetch.status.idle"),
      "offline": t("commands:fetch.status.offline")
    };

    const bot = {
      true: t("commands:fetch.bot.true"),
      false: t("commands:fetch.bot.false")
    };

    const user = await this.client.users.fetch(id);

    if (user.presence.game === null) user.presence.game = t("commands:fetch.notPlaying");

    const uEmbed = new Discord.MessageEmbed()
      .setTitle(`${user.tag}`)
      .addField(t("commands:fetch.embed.fieldName1"), t("commands:fetch.embed.fieldValue1", { username: user.username, usertag: user.tag, id: id, bot: bot[user.bot] }))
      .addField(t("commands:fetch.embed.fieldName2"), t("commands:fetch.embed.fieldValue2", { presence: user.presence.game || t("commands:fetch.notPlaying"), status: statuses[user.presence.status] }))
      .addField(t("commands:fetch.embed.fieldName3"), t("commands:fetch.embed.fieldValue3", { time: prettyMs(message.createdTimestamp - user.createdTimestamp) }))
      .setThumbnail(user.displayAvatarURL())
      .setColor("#36393e")
      .setTimestamp();

    reply(uEmbed);
  }
}

module.exports = Fetch;
