const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const db = require('croxydb');
const muteRole = "role"; // mute rol id

module.exports = {
  command: {
    name: "m",
    exe: async (client, message, args) => {
      var user = message.mentions.users.first();
      if (!user) return message.channel.send("Üye etiketle!");
      var puan = db.get(`ceza_${user.id}`);
      var btn1 = new MessageButton()
      .setStyle('blurple')
      .setLabel('1')
      .setID('1');
      var btn2 = new MessageButton()
      .setStyle('blurple')
      .setLabel('2')
      .setID('2');
      var btn3 = new MessageButton()
      .setStyle('blurple')
      .setLabel('3')
      .setID('3');
      var btn4 = new MessageButton()
      .setStyle('blurple')
      .setLabel('4')
      .setID('4');
      var btn5 = new MessageButton()
      .setStyle('blurple')
      .setLabel('5')
      .setID('5');
      return message.channel.send(`${user} (\`${user.id}\`) için ceza menüsü:\n__**Kullanıcının ceza puanı: ${puan || 0}**__\n\n**1)** Ailevi küfür - 20 Dakika\n**2)** Küfür - 10 Dakika\n**3)** Flood / Spam - 10 Dakika\n**4)** Tartışma / Kavga - 15 Dakika\n**5)** Ortam Bozma / Rahatsızlık Verme - 10 Dakika`, { buttons: [ btn1, btn2, btn3, btn4, btn5 ]}).then(async (msg) => {
        async function silici() {
          msg.delete();
        }
        var filter = m => m.clicker.user.id == message.author.id;
        var codeland = msg.createButtonCollector(filter);
        codeland.on('collect', async (button) => {
          button.reply.defer();
          if (button.id == "1") {
            silici()
            await button.clicker.fetch();
            button.clicker.member.roles.add(muteRole);
            return message.channel.send(`:white_check_mark: ${user} 20 dakika boyunca metin kanallarında susturuldu.`);
          } else if (button.id == "2") {
            silici()
            message.guild.members.cache.get(user.id).roles.add(muteRole);
            return message.channel.send(`:white_check_mark: ${user} 10 dakika boyunca metin kanallarında susturuldu.`);
          } else if (button.id == "3") {
            silici()
            message.guild.members.cache.get(user.id).roles.add(muteRole);
            return message.channel.send(`:white_check_mark: ${user} 10 dakika boyunca metin kanallarında susturuldu.`);
          } else if (button.id == "4") {
            silici()
            message.guild.members.cache.get(user.id).roles.add(muteRole);
            return message.channel.send(`:white_check_mark: ${user} 15 dakika boyunca metin kanallarında susturuldu.`);
          } else if (button.id == "5") {
            silici()
            message.guild.members.cache.get(user.id).roles.add(muteRole);
            return message.channel.send(`:white_check_mark: ${user} 10 dakika boyunca metin kanallarında susturuldu.`);
          }
        });
      });
    }
  }
}