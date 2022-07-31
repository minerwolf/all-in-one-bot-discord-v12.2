const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "filter",
  aliases: ["sk"],
  category: "🎶 Music",
  permissions: " ",
  description: "Thêm bộ lọc vào bài hát đang phát",
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
            `Bạn cần vào kênh voice trước để thêm bộ lọc vào bài hát đang phát`
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
                .setColor(ee.color).setDescription(`Hiện đang không phát gì trong kênh voice`)
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

    let queue = distube.getQueue(message);

    const filters = [
      "3d",
      "bassboost",
      "echo",
      "karaoke",
      "nightcore",
      "vaporwave",
      "flanger",
      "gate",
      "haas",
      "reverse",
      "surround",
      "mcompand",
      "phaser",
      "tremolo",
      "earwax",
      "clear"
    ];
    //set some temporary variables
    let varforfilter;
    let choice;
    //get user input
    switch (args[0]) {
      case "bassboost":
        varforfilter = 0;
        break;
      case "3d":
        varforfilter = 1;
        break;
      case "echo":
        varforfilter = 2;
        break;
      case "karaoke":
        varforfilter = 3;
        break;
      case "nightcore":
        varforfilter = 4;
        break;
      case "vaporwave":
        varforfilter = 5;
        break;
      case "flanger":
        varforfilter = 6;
        break;
      case "gate":
        varforfilter = 7;
        break;
      case "haas":
        varforfilter = 8;
        break;
      case "reverse":
        varforfilter = 9;
        break;
      case "surround":
        varforfilter = 10;
        break;
      case "mcompand":
        varforfilter = 11;
        break;
      case "phaser":
        varforfilter = 12;
        break;
      case "tremolo":
        varforfilter = 13;
        break;
      case "earwax":
        varforfilter = 14;
        break;

      case "clear":
        varforfilter = 15;
        break;
      default:
        //fires if not valid input
        varforfilter = 404;
        message.channel.send(
           new MessageEmbed()
                .setColor(ee.color)
            .setTitle("``Đây là tất cả các bộ lọc mà có thể thêm vào bài hát của bạn``")
            .setDescription(
              `
              \`"3d"\`,
              \`"bassboost"\`,
              \`"echo"\`,
             \`"karaoke"\`,
              \`"nightcore"\`,
              \`"vaporwave" \`,
              \`"flanger" \`,
              \`"gate" \`,
              \`"haas" \`,
              \`"reverse" \`,
              \`"surround" \`,
              \`"mcompand" \`,
              \`"phaser" \`,
              \`"tremolo" \`,
              \`"earwax" \`,
              \`clear\`   ---  xóa tất cả bộ lọc`
            )
            .setFooter(`Ví dụ: ${config.prefix}filter bassboost`)
        );
        break;
    }

    choice = filters[varforfilter];
    if (varforfilter === 404) return;

    try {
      message.channel
        .send( new MessageEmbed()
 .setColor(ee.color).setAuthor("Đang áp dụng: " + args[0]))
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      distube.setFilter(message, choice);
      //catch any errors while searching
    } catch (error) {
      //log them
      console.error(error);
    }
    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Bộ lọc được đặt bởi <@${message.author.id}>`
        )
      )
      .then((msg) => {
        msg.delete({ timeout: 7000 });
      });
  },
};
