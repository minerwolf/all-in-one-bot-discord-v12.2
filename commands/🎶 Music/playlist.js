const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
const { prefix } = require("../..");

module.exports = {
    name: "playlist",
    aliases: ["s"],
    category: "🎶 Music",
    permissions: " ",
    description: "Phát bài hát trong danh sách phát",
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
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(
                        `Bạn cần vào kênh voice trước để phát bài hát trong danh sách phát`
                    )
            ).then((msg) => {
                msg.delete({ timeout: 5000 })
            })

        //If Bot not connected, return error
        if (message.guild.me.voice.channel)
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Tôi đã được kết nối trong kênh voice rồi`)
            ).then((msg) => {
                msg.delete({ timeout: 5000 })
            })

        //if they are not in the same channel, return error only check if connected
        if (
            message.guild.me.voice.channel &&
            channel.id != message.guild.me.voice.channel.id
        )
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color).
                    setDescription(
                        `Hãy vào kênh voice của tôi ${message.guild.me.voice.channel.name}`
                    )
            ).then((msg) => {
                msg.delete({ timeout: 5000 })
            })

        await distube.playCustomPlaylist(message, {
            search: args.join(" "),
            maxsongs: -1
        })
    },
};
