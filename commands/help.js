const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Help extends Command {
  constructor (client) {
    super(client, {
      name: "help",
      description: "Learn how to use Shiber's commands.",
      category: "General",
      usage: "[category/alias]",
      enabled: true,
      guildOnly: false,
      aliases: ["halp"],
      permLevel: "User",
      cooldown: 5,
      args: false
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars
      if (!args[0]) {
        const emb = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor("#2A7AAF")
          .addField(t("commands:help.categories.mod") + message.guild.settings.prefix + "help moderation`", t("commands:help.desc.mod"))
          .addField(t("commands:help.categories.general") + message.guild.settings.prefix + "help general`", t("commands:help.desc.general"))
          .addField(t("commands:help.categories.settings") + message.guild.settings.prefix + "help settings`", t("commands:help.desc.settings"))
          .addField(t("commands:help.categories.tools") + message.guild.settings.prefix + "help tools`", t("commands:help.desc.tools"))
          .addField(t("commands:help.categories.banlist") + message.guild.settings.prefix + "help banlist`", t("commands:help.desc.banlist"))
          .addField(t("commands:help.categories.tags") + message.guild.settings.prefix + "help tags`", t("commands:help.desc.tags"));
        reply(emb);
     } else if (args[0].toLowerCase() === "moderation") {
       var cmds = this.client.commands.filter(c => c.help.category === "Moderation" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${cmds.join("\n")}\n\nPatreon: [https://patreon.com/MrDioogo](https://patreon.com/MrDioogo)`);
        reply(emb);
     } else if (args[0].toLowerCase() === "general") {
       var cmds = this.client.commands.filter(c => c.help.category === "General" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${cmds.join("\n")}\n\nPatreon: [https://patreon.com/MrDioogo](https://patreon.com/MrDioogo)`);
        reply(emb);
     } else if (args[0].toLowerCase() === "settings") {
       var cmds = this.client.commands.filter(c => c.help.category === "Settings" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${cmds.join("\n")}\n\nPatreon: [https://patreon.com/MrDioogo](https://patreon.com/MrDioogo)`);
        reply(emb);
     } else if (args[0].toLowerCase() === "tools") {
       var cmds = this.client.commands.filter(c => c.help.category === "Tools" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${cmds.join("\n")}\n\nPatreon: [https://patreon.com/MrDioogo](https://patreon.com/MrDioogo)`);
        reply(emb);
     } else if (args[0].toLowerCase() === "banlist") {
       var cmds = this.client.commands.filter(c => c.help.category === "Ban List" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${cmds.join("\n")}\n\nPatreon: [https://patreon.com/MrDioogo](https://patreon.com/MrDioogo)`);
        reply(emb);
     } else if (args[0].toLowerCase() === "tags") {
       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${message.guild.settings.tags.map(t => `${t.name}`).join(", ") || "Use `" + message.guild.settings.prefix +"tags add` to add custom commands."}\n\nPatreon: [https://patreon.com/MrDioogo](https://patreon.com/MrDioogo)`);
       reply(emb);
     } else {
       const command = this.client.commands.get(args[0].toLowerCase());
       if (!command) return reply(t("commands:help.noCommand"));
       var enab = command.conf.enabled ? "Yes" : "No";
       var cperm = command.conf.permLevel;
       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${command.help.name.toProperCase()} - Info\n**Name**: ${command.help.name}\n**Description**: ${command.help.description}\n**Category**: ${command.help.category}\n**Usage**: \`${message.guild.settings.prefix}${command.help.name} ${command.help.usage}\`\n**Cooldown**: ${command.conf.cooldown} Seconds\n**Minimum Rank**: ${command.conf.rank}\n**Enabled**: ${enab}\n**Permission Level**: ${cperm}\n\nPatreon: [https://patreon.com/MrDioogo](https://patreon.com/MrDioogo)`);
       reply(emb);
     }

  }
}

module.exports = Help;
