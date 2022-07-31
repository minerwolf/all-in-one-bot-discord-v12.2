const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'poll',
    aliases: ['pl'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Làm một cuộc bình chọn trong máy chủ',
    usage: '[COMMAND] + [#kênh] + [câu hỏi]',
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
                .setDescription(`Cách dùng >>> ${prefix}poll <#kênh> <câu hỏi>`))
        if (!channel) {
            message.reply(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription("Hãy cho biết kênh để gửi bình chọn này")
            )
            return
        } else {
            let announce = args.slice(1).join(" ")
            if (!announce) return message.channel.send(`Hãy cho tôi biết cần thông báo gì`)
            const embed =  new MessageEmbed()
 .setColor(ee.color)
                .setTitle(`🔰Bình chọn 🔰`)
                .setDescription(`${announce}`)
                .setFooter("Bắt đầu bình chọn bởi: " + message.author.username + '#' + message.author.discriminator)
            let msgEmbed = await channel.send(embed)
            await msgEmbed.react('✅')
            await msgEmbed.react('❌')
        }
    }
}