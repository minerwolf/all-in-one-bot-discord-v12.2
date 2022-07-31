const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "queue",
  aliases: ["qu"],
  category: "🎶 Music",
  permissions: " ",
  description: "Hiển thị hàng chờ bài hát hiện tại",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message.member.voice;

    //if member not connected return error
    if (!channel)
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Bạn cần vào kênh voice để xem hàng chờ bài hát`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(`Hiện tại đang không phát gì trong kênh voice`)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Hãy vào kênh voice của tôi ${message.guild.me.voice.channel.name}`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //get the queue
    let queue = distube.getQueue(message);

    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          "Hàng chờ hiện tại:\n" +
            queue.songs
              .map(
                (song, id) =>
                  `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
              )
              .slice(0, 10)
              .join("\n")
        )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  },
};
