const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const config = require("../config.js");
const mongoose = require("mongoose");
const databaseUrl = config.dbUrl;
const preReports = require("../models/prereports.js");
const afterReports = require("../models/aftreports.js");
const Ban = require("../models/bans.js");
const Command = require("../base/Command.js");

class Case extends Command {
  constructor (client) {
    super(client, {
      name: "case",
      description: "Approve/Deny BanList reports.",
      category: "Ban List",
      usage: "<case id> <approve/deny> [reason]",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "Bot Admin",
      cooldown: 15,
      args: true
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
    const complaint = await preReports.findOne({ caseID: args[0] });
    if (!complaint || complaint === null) return reply(t("commands:case.noComplaint"));
    if (!args[1]) return reply(t("commands:case.noArgs"));

    if (args[1].toLowerCase() === "approve") {
      const newBan = new Ban({
        caseID: complaint.caseID,
        reportedID: complaint.reportedID,
        reportedByID: complaint.reportedByID,
        caseReason: complaint.caseReason,
        caseAcceptedAt: message.createdTimestamp,
        proofs: complaint.proofs
      });

      await newBan.save().catch(e => this.client.logger.log(e, "error"));
      await preReports.findOneAndDelete({ caseID: parseInt(args[0]) });
      this.client.users.cache.get(complaint.reportedByID).send(t("commands:case.approved", { caseID: complaint.caseID, author: message.author.tag }));
      const reportedUser = await this.client.users.fetch(complaint.reportedID);
      const reportAuthor = await this.client.users.fetch(complaint.reportedByID);

      const approvedEmbed = new Discord.MessageEmbed()
        .setTitle("Report Approved")
        .addField("[User]:", `▫ Username: ${reportedUser.username}\n▫ Tag: ${reportedUser.tag}\n▫ ID: ${reportedUser.id}`)
        .addField("[Complaint]:", `▫ Complaint Author: ${reportAuthor.tag}\n▫ Complaint Author ID: ${reportAuthor.id}\n▫ Complaint Reason: ${complaint.caseReason}\n▫ Complaint Proofs: ${complaint.proofs.join(", ")}`)
        .addField("[Moderator]:", `▫ Moderator: ${message.author.tag}\n▫ Moderator ID: ${message.author.id}`)
        .setColor("GREEN")
        .setTimestamp();
      this.client.channels.cache.get(this.client.config.reportApprovedEmbedChannel).send(approvedEmbed);

      reply(t("commands:case.reportApproved", { caseID: complaint.caseID }));
    } else if (args[1].toLowerCase() === "reject") {
      const reason = args.slice(2).join(" ");
      if (!reason) return reply(t("commands:case.noReason"));

      const newAfter = new afterReports({
        caseID: complaint.caseID,
        reportedID: complaint.reportedID,
        reportedByID: complaint.reportedByID,
        caseReason: complaint.caseReason,
        caseAcceptedAt: message.createdTimestamp,
        proofs: complaint.proofs,
        caseDenialReason: reason
      });

      await newAfter.save().catch(e => this.client.logger.log(e, "error"));
      await preReports.findOneAndDelete({ caseID: args[0] });
      this.client.users.cache.get(complaint.reportedByID).send(t("commands:case.rejected", { caseID: complaint.caseID, author: message.author.tag, reason: reason }));
      const reportedUser = await this.client.users.fetch(complaint.reportedID);
      const reportAuthor = await this.client.users.fetch(complaint.reportedByID);

      const rejectedEmbed = new Discord.MessageEmbed()
        .setTitle("Report Rejected")
        .addField("[User]:", `▫ Username: ${reportedUser.username}\n▫ Tag: ${reportedUser.tag}\n▫ ID: ${reportedUser.id}`)
        .addField("[Complaint]:", `▫ Complaint Author: ${reportAuthor.tag}\n▫ Complaint Author ID: ${reportAuthor.id}\n▫ Complaint Reason: ${complaint.caseReason}\n▫ Complaint Proofs: ${complaint.proofs.join(", ")}`)
        .addField("[Moderator]:", `▫ Moderator: ${message.author.tag}\n▫ Moderator ID: ${message.author.id}\nRejection Reason: ${reason}`)
        .setColor("RED")
        .setTimestamp();
      this.client.channels.cache.get(this.client.config.reportRejectedEmbedChannel).send(rejectedEmbed);

      reply(t("commands:case.reportRejected", { caseID: complaint.caseID }));
    } else {
      return reply(t("commands:case.unknownType"));
    }
  }
}

module.exports = Case;
