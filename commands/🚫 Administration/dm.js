const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'dm',
    aliases: ['userdm'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Nhắn tin cho người dùng bằng bot',
    usage: '[COMMAND] + [văn bản]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let text = args.slice(1).join(' ');
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])

        if (!user) {
            return message.reply(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`**Hãy nhắc tới ai đó để gửi tin nhắn**`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 3000 }))
        }

        if (!text) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`**Hãy viết gì đó để gửi cho người dùng này**`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 3000 }))
        }

        let userembed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`A Message From ${message.author.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addField(`Để thêm thông tin hãy DM người dùng này <@${message.author.id}> `)
            .setDescription(`${message.author.username}s Message:`, `\`\` ${text} \`\``)
            .setFooter(ee.footertext)

        user.send(userembed).catch(e => {
            if (!e) {
                return message.reply(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(e)
                        .setFooter(ee.footertext)
                ).then(msg => msg.delete({ timeout: 3000 }))
            } else {
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Tin nhắn đã được gửi thành công tới <@${user.id}>`)
                        .setFooter(ee.footertext)
                ).then(msg => msg.delete({ timeout: 3000 }))
            }
        })
    }
}