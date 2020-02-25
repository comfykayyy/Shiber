const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Invite extends Command {
  constructor (client) {
    super(client, {
      name: "support",
      description: "Get a link to Shiber's Support server (MrDioogo's Community).",
      category: "General",
      usage: "",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: false
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
    const inviteEmbed = new Discord.MessageEmbed()
      .setTitle("My Support Server!")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription("- Instant Invite link: https://shiber.xyz/discord \nThis link will redirect you to Shiber's Support Server. There you can ask for assistance, report a bug, suggest new features or improvements to existing ones, or just to hang out with our friendly members. \r\nYou will also receive announcements and status updates, which are a necessity to keep yourself up to date.")
      .setColor("#36393e")
      .setTimestamp();
    reply(inviteEmbed);
  }
}

module.exports = Invite;
