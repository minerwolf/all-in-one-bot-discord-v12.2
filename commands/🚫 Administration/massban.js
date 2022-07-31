const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'massban',
    aliases: ['bhagja'],
    category: '🚫 Administration',
    memberpermissions: ['BAN_MEMBERS'],
    cooldown: 5,
    description: 'Cấm nhiều hơn 1 người ở cùng 1 thời điểm',
    usage: 'massban + <@users> + <reason>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let member = message.mentions.members || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).slice(member.size).join(" ")

        // if not a member
        if (!member) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`**Hãy nhắc tới ai đó để cấm**`)
                    .setDescription(`> Cách dùng =  ${prefix}massban + <@thành viên> + <lý do>`)
                    .setFooter(ee.footertext)
            )
        }

        // if member role not high
        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`**Vai trò của bạn chưa đủ cao để cấm những người này**`)
                    .setFooter(ee.footertext)
            )
        }

        // if not a Reason
        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`**Hãy cho tôi biết lý do cấm**`)
                    .setFooter(ee.footertext)
            )
        }

        if (member.bannable) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`**Không thể cấm thành viên này**`)
            )
        }


        member.forEach((bans) => {
            message.guild.members.ban(bans, {
                reason: reason,
                days: 7
            })
        })
        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Tất cả thành viên được nhắc tới ✅ đã bị cấm! ${member.map(m => `**<@${m.user.id}>**`).join(", ")} | ${reason}`)
                .setFooter(ee.footertext)
        )
    }
}