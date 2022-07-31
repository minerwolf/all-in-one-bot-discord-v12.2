const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
    name: "nowplaying",
    aliases: ["nowplay"],
    category: "🎶 Music",
    permissions: " ",
    description: "Hiển thị bài hát đang phát",
    usage: "",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
          
        const { channel } = message.member.voice;

        //if member not connected return error
        if (!channel)
            return message.channel
                .send(
                     new MessageEmbed()
                .setColor(ee.color).setDescription(
                        `Bạn cần vào kênh voice trước để xem bài hát đang phát`
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

        const queue = distube.getQueue(message);

        if (!queue) return message.channel
            .send(
                 new MessageEmbed()
                .setColor(ee.color).setDescription(
                    `Hiện tại đang không phát bài hát nào`
                )
            )
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });

        message.channel
            .send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(`** NOW PLAYING **\n 1 - ${queue.songs[0].name}`)
                    .setURL(queue.songs[0].url)
                    .setThumbnail(queue.songs[0].thumbnail)
            )

            .then((msg) => {
                msg.delete({ timeout: 10000 });
            });

        } catch (e) {
            message.channel.send(e)
        }
    }
};
