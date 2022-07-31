const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "loop",
  aliases: ["s"],
  category: "🎶 Music",
  permissions: " ",
  description: "Lặp lại bài hát",
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
            `Bạn cần vào kênh voice trước để lặp bài hát`
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
                .setColor(ee.color).setDescription(
            `Không có gì đang phát trong kênh voice để lặp lại`
          )
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

    if (!args[0])
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            "Xin hãy cho biết kiểu lặp bài hát bạn muốn",
            `Những tùy chọn hợp lệ:\n\n\`0\`   /   \`1\`   /   \`2\`\n\`tắt\` / \`bài hát\` / \`hàng chờ\``
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //set variable
    let loopis = args[0];
    if (args[0].toString().toLowerCase() === "song") loopis = "1";
    else if (args[0].toString().toLowerCase() === "queue") loopis = "2";
    else if (args[0].toString().toLowerCase() === "off") loopis = "0";
    else if (args[0].toString().toLowerCase() === "s") loopis = "1";
    else if (args[0].toString().toLowerCase() === "q") loopis = "2";
    else if (args[0].toString().toLowerCase() === "disable") loopis = "0";
    loopis = Number(loopis);

    if (0 <= loopis && loopis <= 2) {
      await distube.setRepeatMode(message, parseInt(args[0]));
      message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            "Repeat mode set to:",
            `${args[0]
              .replace("0", "Tắt")
              .replace("1", "Lặp bài hát")
              .replace("2", "Lặp hàng chờ")}`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    } else {
      message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Hãy dùng một số trong khoảng **0** và **2**   |   *(0: tắt, 1: lặp bài hát hiện tại, 2: lặp toàn bộ hàng chờ)*`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }
    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Bài hát được lặp bởi <@${message.author.id}>`
        )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  },
};
