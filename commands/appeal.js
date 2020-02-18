const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const config = require("../config.js");
const mongoose = require("mongoose");
const databaseUrl = config.dbUrl;
const bans = require("../models/bans.js");
const validUrl = require("valid-url");
const Command = require("../base/Command.js");

class Appeal extends Command {
  constructor (client) {
    super(client, {
      name: "appeal",
      description: "Appeal your report.",
      category: "Ban List",
      usage: "",
      enabled: false,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: false
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
    bans.findOne({
      reportedID: message.author.id
    }, async (err, r) => {
      if (err) this.client.logger.log(err, "error");
      if (!r) return reply(t("commands:appeal.notbanned"));

      const q = await this.client.awaitReply(message, t("commands:appeal.want", { caseID: r.caseID, caseReason: r.caseReason }));
      if (q === false) return reply(t("commands:appeal.timedOut"));

      if (q.toLowerCase() === "yes") {
        const prof = await this.client.awaitReply(message, t("commands:appeal.sendProofs"));
        const [l1, l2, l3, l4] = prof.split(", ");
        const t = prof.split(", ");

        if (!validUrl.isUri(l1)) t.length = 0;


        let links;
        if (t.length === 1) {
          links = `1) ${l1}`;
        } else if (t.length === 2) {
          links = `1) ${l1}\n2) ${l2}`;
        } else if (t.length === 3) {
          links = `1) ${l1}\n2) ${l2}\n3) ${l3}`;
        } else if (t.length === 3) {
          links = `1) ${l1}\n2) ${l2}\n3) ${l3}\n4) ${l4}`;
        } else {
          links = "No Proof Specified!";
        }

        const previewEmbed = new Discord.MessageEmbed()
          .setTitle("New Appeal Awaiting")
          .addField("User:", `${message.author.tag} [ID: ${message.author.id}]`)
          .addField("Case ID Apealed:", `${r.caseID}`)
          .addField("Case Apealed Reson:", `${r.caseReason}`)
          .addField("Proof:", `${links}`)
          .setColor("BLUE")
          .setThumbnail(`${message.author.displayAvatarURL}`)
          .setTimestamp();

        await reply(t("commands:appeal.submit"));
        const conf = await this.client.awaitReply(message, previewEmbed);
        if (conf === false) return reply(t("commands:appeal.timedOut"));

        if (conf.toLowerCase() === "yes") {
          await this.client.channels.cache.get(this.client.config.appealEmbedChannel).send(previewEmbed);
        } else {
          return reply(t("commands:appeal.aborted"));
        }
      }
    });
  }
}
module.exports = Appeal;
