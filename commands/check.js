const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const mongoose = require("mongoose");
const Infractions = require("../models/infractions.js");
const config = require("../config.js");
const databaseUrl = config.dbUrl;
const Command = require("../base/Command.js");

class Check extends Command {
  constructor (client) {
    super(client, {
      name: "check",
      description: "Checks a user's audit.",
      category: "Moderation",
      usage: "<user>",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Moderator",
      cooldown: 5,
      args: true
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
    const user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    if (!user) return reply(t("commands:check.noUser"));

    Infractions.findOne({
      guildID: message.guild.id,
      userID: user.id
    }, async (err, u) => {
      if (err) this.client.logger.log(err, "error");
      if (!u) u = "ProperyNone";
      reply(t("commands:check.infractions", { user: user.user.tag, infractions: u.infractions || 0 }));
    });
  }
}

module.exports = Check;
