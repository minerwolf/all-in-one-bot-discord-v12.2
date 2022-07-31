const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'kick',
    aliases: ['nikal ja'],
    category: '🚫 Administration',
    memberpermissions: ['KICK_MEMBERS'],
    cooldown: 5,
    description: 'Đuổi thành viên khỏi máy chủ',
    usage: 'kick + <@người dùng> + <lý do>',
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
                    .setTitle(`**Hãy nhắc tới ai đó để đuổi**`)
                    .setDescription(`> Cách dùng =  ${prefix}kick + <@thành viên> + <lý do>`)
                    .setFooter(ee.footertext)
            )
        }

        // if member role not high
        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`**Vai trò của bạn chưa đủ cao để đuổi thành viên này**`)
                    .setFooter(ee.footertext)
            )
        }

        let reason = args.slice(1).join(" ")

        // if not a Role
        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`**Hãy cho biết lý do đuổi**`)
                    .setFooter(ee.footertext)
            )
        }

        // if role is high


        // add role to user
        if (member) {
            await member.kick()
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`> <@${member.user.id}> đã bị đuổi khỏi server \n\n > Lý do = \`\`${reason}\`\``)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setFooter(`Bị đuổi bởi ${message.author.username}`)
            )
        }
    }
}