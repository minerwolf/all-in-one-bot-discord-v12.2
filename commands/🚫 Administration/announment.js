const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'announce',
    aliases: ['anc'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Làm thông báo trong máy chủ',
    usage: '[lệnh] + [kênh] + [văn bản]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const channel = message.mentions.channels.first()
        if (!args.length) return message.channel.send(
             new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Usage >>> ${prefix}announce <#channel> <text>`))
        if (!channel) {
            message.reply(
                 new MessageEmbed()
                .setColor(ee.color)
                .setDescription("Hãy cho biết kênh để gửi thông báo này")
            )
            return
        } else {
            let announce = args.slice(1).join(" ")
            if (!announce) return message.channel.send(`Hãy cho biết bạn muốn thông báo gì?`)
            const embed =  new MessageEmbed()
 .setColor(ee.color)
                .setTitle(`🔰Thông báo🔰`)
                .setDescription(`${announce}`)
                .setFooter("Được gửi bởi:" + message.author.username + '#' + message.author.discriminator)
            channel.send(embed)
        }
    }
}