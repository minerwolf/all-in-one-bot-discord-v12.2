const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'unbanll',
    aliases: ['unball'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Bỏ cấm tất cả thành viên bị cấm trong server',
    usage: '[COMMAND]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            message.guild.fetchBans(bans => {
                if (bans.size == 0) {
                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`Không có ai bị cấm`)
                            .setFooter(ee.footertext)
                    )
                } else {
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                    });
                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`Tất cả thành viên bị cấm ✅ đã được dỡ bỏ lệnh cấm`)
                            .addField(`🔰 Được bỏ cấm bởi <@${message.author.id}>`)
                            .setFooter(ee.footertext)
                    )
                }
            })
        } catch (e) {
            message.channel.send(
                new MessageEmbed()
                    .setDescription(e)
            )
        }
    }
}