const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class ignoredUsers extends Command {
  constructor (client) {
    super(client, {
      name: "ignoredusers",
      description: "Add or remove users from ignore user list.",
      category: "Settings",
      usage: "<add/remove> <@user/id>",
      enabled: false,
      guildOnly: true,
      aliases: [],
      permLevel: "Administrator",
      cooldown: 5,
      args: true
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
    Settings.findOne({
      guildID: message.guild.id
    }, async (err, settings) => {
      if (err) this.client.logger.log(err);
      const option = args[0].toLowerCase();

      if (option === "add") {
        const user = message.mentions.users.first() || this.client.users.get(args[1]);
        if (!user) return reply(t("commands:ignoredusers.add.noUser"));
        settings.ignoredUsers.push(user.id);
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(t("commands:ignoredusers.add.added", { user: user }));
      } else if (option === "remove") {
        const user = message.mentions.users.first() || this.client.users.get(args[1]) || args[1];
        if (!user) return reply(t("commands:ignoredusers.remove.noUser"));

        const index = settings.ignoredUsers.findIndex(i => i === user.id);
        if (index < 0) return reply(t("commands:ignoredusers.remove.notFound"));

        settings.ignoredUsers.splice(index, 1);
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(t("commands:ignoredusers.remove.removed"));
      } else {
        return reply(t("commands:ignoredusers.args"));
      }
    });
  }
}

module.exports = ignoredUsers;
