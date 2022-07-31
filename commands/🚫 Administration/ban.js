const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'ban',
    aliases: ['bhagja'],
    category: '🚫 Administration',
    memberpermissions: ['BAN_MEMBERS'],
    cooldown: 5,
    description: 'Cấm người dùng khỏi server',
    usage: 'ban + <@người dùng> + <lý do>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // if not a member
        if (!member) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`**Hãy nhắc tới ai đó để cấm**`)
                    .setDescription(`> Cách dùng =  ${prefix}ban + <@người dùng> + <lý do>`)
                    .setFooter(ee.footertext)
            )
        }

        // if member role not high
        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Vai trò của bạn chưa đủ cao để cấm thành viên này **`)
                    .setFooter(ee.footertext)
            )
        }

        let reason = args.slice(1).join(" ")

        // if not a Role
        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`** Xin hãy cho biết lý do cấm **`)
                    .setFooter(ee.footertext)
            )
        }
        // add role to user
        if (member) {
            await member.ban()
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`> <@${member.user.id}> đã bị cấm khỏi máy chủ \n\n > Lý do = \`\`${reason}\`\``)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setFooter(`Bị cấm bởi ${message.author.username}`)
            )
        }
    }
}