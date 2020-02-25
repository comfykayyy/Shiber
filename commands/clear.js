const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const logHandler = require("../handlers/serverLogger.js");
const request = require("request");

class Clear extends Command {
  constructor (client) {
    super(client, {
      name: "clear",
      description: "Deletes a specified amount of messages.",
      category: "Moderation",
      usage: "<amount> [user]",
      enabled: true,
      guildOnly: true,
      aliases: ["purge"],
      permLevel: "Moderator",
      cooldown: 5,
      args: true
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
    const user = message.mentions.members.first() || message.guild.members.get(args[1]);
    var amount = parseInt(message.content.split(" ")[0]) ? parseInt(message.content.split(" ")[0]) : parseInt(message.content.split(" ")[1]);
    if (user) {
      var reason = args.slice(2).join(" ") || t("commands:clear.noReason");
    } else {
      var reason = args.slice(1).join(" ") || t("commands:clear.noReason");
    }
    if (!amount) return reply(t("commands:clear.noAmount"));
    if (amount > 99) return reply(t("commands:clear.smallerThanOneHundred"));
    if (amount < 2) return reply(t("commands:clear.smallerThanOne"));
    if (!amount && !user) return reply(t("commands:clear.mentionUser"));
    amount = amount + 1;
    message.channel.messages.fetch({ limit: amount }).then(async (messages) => {
      if (user) {
        const filterBy = user ? user.id : this.client.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        try {
          await message.channel.bulkDelete(messages);
        } catch (e) {
          return reply(t("commands:clear.error", { error: e }));
        }
        if (message.guild.settings.moderationLogs.toLowerCase() === "on") {
          const Logger = new logHandler({ client: this.client, case: "clearMessages", guild: message.guild.id, moderator: message.author, reason: reason, channel: message.channel, amount: amount, member: user  });
          Logger.send().then(t => Logger.kill());
        }
        return reply(t("commands:clear.sucessUser", { length: message.length, user: user.user.tag }));
      }

      try {
        await message.channel.bulkDelete(amount);
      } catch (e) {
        return reply(t("commands:clear.error", { error: e }));
      }
      if (message.guild.settings.moderationLogs.toLowerCase() === "on") {
        const Logger = new logHandler({ client: this.client, case: "clearMessages", guild: message.guild.id, moderator: message.author, reason: reason, channel: message.channel, amount: amount  });
        Logger.send().then(t => Logger.kill());
      }
      reply(t("commands:clear.sucess"));
    });
  }
}

module.exports = Clear;
