const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'removerole',
    aliases: ['delrole'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_ROLES'],
    cooldown: 5,
    description: 'Xóa vai trò khỏi người dùng',
    usage: 'removerole + <@user> + <@role>',
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
                    .setTitle(`**Please Mention a User to Remove role**`)
                    .setDescription(`> Cách dùng =  ${prefix}removerole + <@thành viên> + <@vai trò>`)
                    .setFooter(ee.footertext)
            )
        }

        // if member role not high
        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Vai trò của bạn chưa đủ cao để xóa vai trò cho người này **`)
                    .setFooter(ee.footertext)
            )
        }

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        // if not a Role
        if (!role) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`** Hãy nhắc tới vai trò nào đó **`)
                    .setFooter(ee.footertext)
            )
        }

        if (role.managed) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Không thể xóa vai trò của người này **`)
            )
        }

        // if role is high

        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) {
            new MessageEmbed()
                .setColor(ee.colour)
                .setDescription(`**Vai trò được nhắc tới hiện tai đang ở vị trí cao hơn tôi nên tôi không thể xóa khỏi thành viên này!!**`)
                .setFooter(ee.footertext)
        }

        // add role to user
        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role.id);
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`${role} đã bị xóa khỏi thành viên <@${member.user.id}>`)
                    .setFooter(`Role Removed by ${message.author.username}`)
            )
        }
    }
}