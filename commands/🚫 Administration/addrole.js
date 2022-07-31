const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'addrole',
    aliases: ['giverole'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_ROLES'],
    cooldown: 5,
    description: 'Thêm vai trò vào người dùng',
    usage: 'addrole + <@user> + <@role>',
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
                    .setTitle(`**Hãy nhắc tới ai đó để thêm vai trò**`)
                    .setDescription(`> Cách dùng =  ${prefix}addrole + <@user> + <@role>`)
                    .setFooter(ee.footertext)
            )
        }

        // if member role not high
        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Vai trò của bạn chưa đủ cao để thêm vai trò cho người này **`)
                    .setFooter(ee.footertext)
            )
        }

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        // if not a Role
        if (!role) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`** Hãy nhắn tới vai trò nào đó **`)
                    .setFooter(ee.footertext)
            )
        }

        // if (role.managed) {
        //     return message.channel.send(
        //         new MessageEmbed()
        //             .setColor(ee.color)
        //             .setDescription(`** Không thể thêm vai trò này cho người dùng được nhắc tới **`)
        //     )
        // }

        // // if role is high

        // if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) {
        //     new MessageEmbed()
        //         .setColor(ee.colour)
        //         .setDescription(`** Vai trò được nhắc tới hiện tai đang ở vị trí cao hơn tôi nên tôi không thể thêm vào thành viên này! **`)
        //         .setFooter(ee.footertext)
        // }

        // add role to user
        if (!member.roles.cache.has(role.id)) {
            await member.roles.add(role.id);
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`${role} Vai trò đã được thêm vào <@${member.user.id}>`)
                    .setFooter(`Vai trò được thêm bởi ${message.author.username}`)
            )
        }
    }
}