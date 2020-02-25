const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Define extends Command {
  constructor (client) {
    super(client, {
      name: "define",
      description: "Dictionary lookup!",
      category: "Tools",
      usage: "",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: false,
      rank: "Upvoter"
    });
  }

  async run ({message, args, level, reply}, t) { // eslint-disable-line no-unused-vars

    const apiKey = "ba63b517-9f88-4196-a502-2b4a795f7d57";
    const fetch = require("node-fetch");
    const arg = message.content.split(" ").join(" ").slice(9);
    if (!arg) {
      return reply("Please specify a word to define.");
    }
    fetch("https://www.dictionaryapi.com/api/v3/references/learners/json/" + args + "?key=" + apiKey)
      .then(res => {
        return res.json();
      }).then(json => {
        if (json[0].meta.id === undefined) {
          return reply(t("commands:define.notFound", { args: args }));
        }
        const word = json[0].meta.id;
        const type = json[0].fl;
        const def = json[0].shortdef;

        const embed = new Discord.MessageEmbed()
          .setColor("36393e")
          .setTitle(t("commands:define.title"))
          .addField(t("commands:define.field1"), t("commands:define.field2", { word: word, type: type, def: def }));
        reply(embed)
          .catch(console.error);
      }).catch(err => {
        if (err) {
          reply(t("commands:define.notFound", { args: args }));
        }
      });
  }
}

module.exports = Define;
