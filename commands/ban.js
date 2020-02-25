const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const logHandler = require("../handlers/serverLogger.js");
const Command = require("../base/Command.js");

class Ban extends Command {
  constructor (client) {
    super(client, {
      name: "ban",
      description: "Bans a user from your server.",
      category: "Moderation",
      usage: "<user> [reason]",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Moderator",
      cooldown: 5,
      args: true
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
    const user = message.mentions.members.first() || message.guild.members.get(args[0]);
    let reason = args.slice(1).join(" ");
    if (!user) return reply(t("commands:ban.specifyUser"));
    if (!reason) reason = t("commands:ban.noReason");

    if (user.id === message.author.id) return reply(t("commands:ban.sameUser"));
    if (!user.bannable) return reply(t("commands:ban.noBannabled"));

    try {
      user.ban(reason);
    } catch (e) {
      return message.channel.send(t("commands:ban.error", { error: e }));
    }

    if (message.guild.settings.moderationLogs.toLowerCase() === "on") {
      const Logger = new logHandler({ client: this.client, case: "banAdd", guild: message.guild.id, member: user.user, moderator: message.author, reason: reason });
      Logger.send().then(t => Logger.kill());
    }

    return reply(t("commands:ban.sucess", { user: user.user.tag }));
  }
}

module.exports = Ban;
