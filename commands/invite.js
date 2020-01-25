const Discord = require ('discord.js'); // eslint-disable-line no-unused-vars
const Command = require('../base/Command.js');

class Invite extends Command {
  constructor (client) {
    super(client, {
      name: 'invite',
      description: 'Get Shiber\'s invitation link.',
      category: 'General',
      usage: '',
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
      .setTitle(t("commands:invite.title"))
      .setDescription(t("commands:invite.info", { id: this.client.user.id }))
      .setColor('#36393e')
      .setTimestamp();
    message.channel.send(inviteEmbed);
  }
}

module.exports = Invite;
