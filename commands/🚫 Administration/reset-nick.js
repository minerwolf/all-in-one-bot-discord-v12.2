const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'resetnick',
    aliases: ['rest-nick'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_NICKNAMES'],
    cooldown: 5,
    description: 'Bỏ biệt danh của thành viên nào đó',
    usage: '[COMMAND] + [user]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // if not a user
        if (!user) {
            return message.reply(
                new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`**Hãy nhắc tới ai đó để đổi biệt danh**`)
                    .setFooter(ee.footertext)
            )
        }

        if (user.roles.highest.position > message.member.roles.highest.position) {
            return message.reply(
                new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`**Không thể đổi biệt danh của thành viên có vai trò bằng bạn**`)
                    .setFooter(ee.footertext)
            )
        }

        if (user) {
            try {
                const OldName = `\`${user.nickname}\``;
                await user.setNickname(null);

                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`✅ Biệt danh đã được đặt về mặc định!`)
                        .setDescription(`✅ <@${user.id}> đã được xóa biệt danh!!`)
                        .addField(`> 🔰 Được đổi bởi <@${message.author.id}>`, true)
                        .addField(`> ✨ Tên cũ :- ${OldName} || > 🔴 Tên mới :- ${user.user.username}`,true)
                        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                ).then(msg => msg.delete({ timeout: 5000 }))

            } catch (e) {
                message.channel.send(
                    new MessageEmbed()
                        .setDescription(e)
                )
            }
        }
    }
}