const { MessageEmbed, MessageButton } = require('discord.js');
const db = require('croxydb');
const muteRole = "role"; // mute rol id

module.exports = {
  command: {
    name: "m",
    exe: async (client, message, args) => {
      var user = message.mentions.users.first();
      if (!user) return message.reply("Üye etiketle!");
      var puan = db.get(`ceza_${user.id}`);
      var btn1 = new MessageButton()
      .setStyle('PRIMARY')
      .setLabel('1')
      .setCustomId('1');
      var btn2 = new MessageButton()
      .setStyle('PRIMARY')
      .setLabel('2')
      .setCustomId('2');
      var btn3 = new MessageButton()
      .setStyle('PRIMARY')
      .setLabel('3')
      .setCustomId('3');
      var btn4 = new MessageButton()
      .setStyle('PRIMARY')
      .setLabel('4')
      .setCustomId('4');
      var btn5 = new MessageButton()
      .setStyle('PRIMARY')
      .setLabel('5')
      .setCustomId('5');
      return message.channel.send({
        content: `${user} (\`${user.id}\`) için ceza menüsü:\n__**Kullanıcının ceza puanı: ${puan || 0}**__\n\n**1)** Ailevi küfür - 20 Dakika\n**2)** Küfür - 10 Dakika\n**3)** Flood / Spam - 10 Dakika\n**4)** Tartışma / Kavga - 15 Dakika\n**5)** Ortam Bozma / Rahatsızlık Verme - 10 Dakika`, 
        components: [ 
          {
            type: 1, components: [
              btn1, btn2, btn3, btn4, btn5
            ]
          } 
        ]
      }).then(async (msg) => {
        async function silici(time) {
          msg.delete();
          setTimeout(async () => {
            await message.guild.members.cache.get(user.id).roles.remove(muteRole);
          }, time * 1000);
        }
        var filter = m => m.user.id == message.author.id;
        var codeland = msg.createMessageComponentCollector({ filter });
        codeland.on('collect', async (button) => {
          if (button.customId == "1") {
            silici('1200')
            message.guild.members.cache.get(user.id).roles.add(muteRole);
            db.add(`ceza_${user.id}`, 1);
            return button.channel.send(`:white_check_mark: ${user} 20 dakika boyunca metin kanallarında susturuldu.`);
          } else if (button.customId == "2") {
            silici('600')
            message.guild.members.cache.get(user.id).roles.add(muteRole);
            db.add(`ceza_${user.id}`, 1);
            return message.channel.send(`:white_check_mark: ${user} 10 dakika boyunca metin kanallarında susturuldu.`);
          } else if (button.customId == "3") {
            silici('600')
            message.guild.members.cache.get(user.id).roles.add(muteRole);
            db.add(`ceza_${user.id}`, 1);
            return message.channel.send(`:white_check_mark: ${user} 10 dakika boyunca metin kanallarında susturuldu.`);
          } else if (button.customId == "4") {
            silici('900')
            message.guild.members.cache.get(user.id).roles.add(muteRole);
            db.add(`ceza_${user.id}`, 1);
            return message.channel.send(`:white_check_mark: ${user} 15 dakika boyunca metin kanallarında susturuldu.`);
          } else if (button.customId == "5") {
            silici('600')
            message.guild.members.cache.get(user.id).roles.add(muteRole);
            db.add(`ceza_${user.id}`, 1);
            return message.channel.send(`:white_check_mark: ${user} 10 dakika boyunca metin kanallarında susturuldu.`);
          }
        });
      });
    }
  }
}
