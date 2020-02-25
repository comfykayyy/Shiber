const config = {
  "token":  "",
  "prefix": "",
  "admins": [],
  "dbUrl": "",
  "patreons": [],
  "supporters": [],

  "dashboard" : {
    "oauthSecret": "",
    "callbackURL": "",
    "sessionSecret": "",
    "domain": "",
    "port": 80
  },

  /* Channels */
  "appealEmbedChannel": "",
  "banListLogChannel": "",
  "reportRejectedEmbedChannel": "",
  "reportApprovedEmbedChannel": "",
  "newReportEmbed": "",
  "guildLogChannel": "",
  "commandLogChannel": "",
  "errorChannel": "",

  permLevels: [
    { level: 0,
      name: "User",
      check: () => true
    },

    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("MANAGE_GUILD") ||  message.member.roles.cache.get(message.guild.settings.modRole) !== undefined) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator",
      check: (message) => {
        try {
          if (message.member.hasPermission("ADMINISTRATOR") ||  message.member.roles.cache.get(message.guild.settings.adminRole) !== undefined) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
    },

    { level: 4,
      name: "Server Owner",
      check: (message) => {
        if (message.channel.type === "text" && message.guild.ownerID) {
          if (message.guild.ownerID === message.author.id) return true;
        } else {
          return false;
        }
      }
    },

    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: "Bot Owner",
      check: (message) => message.client.appInfo.owner.id === message.author.id
    }
  ]
};

module.exports = config;
