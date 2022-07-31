const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require('moment');


module.exports = {
    name: 'roleinfo',
    aliases: ['rinfo'],
    category: '🔰 Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Xem thông tin của vai trò',
    usage: "roleinfo <@ROLE>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var role = message.mentions.roles.first();
            if (!role) return message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(`Không tìm thấy vai trò/vai trò không hợp lệ`)
            )

            //create the EMBED
            const embeduserinfo =  new MessageEmbed()
 .setColor(ee.color)
            embeduserinfo.setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            embeduserinfo.setAuthor("Thông tin của:   " + role.name, message.guild.iconURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
            embeduserinfo.addField('**❱ Tên:**', `\`${role.name}\``, true)
            embeduserinfo.addField('**❱ ID:**', `\`${role.id}\``, true)
            embeduserinfo.addField('**❱ Màu:**', `\`${role.hexColor}\``, true)
            embeduserinfo.addField('**❱ Ngày tạo:**', "\`" + moment(role.createdAt).format("DD/MM/YYYY") + "\`\n" + "`" + moment(role.createdAt).format("hh:mm:ss") + "\`", true)
            embeduserinfo.addField('**❱ Vị trí:**', `\`${role.rawPosition}\``, true)
            embeduserinfo.addField('**❱ Số lượng thành viên:**', `\`${role.members.size} Members have it\``, true)
            embeduserinfo.addField('**❱ Được vận hành không:**', `\`${role.hoist ? "✔️" : "❌"}\``, true)
            embeduserinfo.addField('**❱ Có thể nhắc tới:**', `\`${role.mentionable ? "✔️" : "❌"}\``, true)
            embeduserinfo.addField('**❱ Quyền lợi:**', `${role.permissions.toArray().map(p => `\`${p}\``).join(", ")}`)
            embeduserinfo.setFooter(ee.footertext, ee.footericon)
            //send the EMBED
            message.channel.send(embeduserinfo)
        } catch (e) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}