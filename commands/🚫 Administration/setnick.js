const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'setnick',
    aliases: ['nickname'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_NICKNAMES'],
    cooldown: 5,
    description: 'Đặt biệt danh cho thành viên',
    usage: '[COMMAND] + [user] + [Name]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let nickname = args[1];

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

        if (!nickname) {
            return message.reply(
                new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`**Hãy cho biết một biệt danh**`)
                    .setFooter(ee.footertext)
            )
        }

        if (nickname.length > 32) {
            return message.reply(
                new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`**Biệt danh quá dài, hãy cho biết một biệt danh không dài quá 32 ký tự**`)
                    .setFooter(ee.footertext)
            )
        }

        if (user) {
            try {
                const OldName = `\`${user.nickname}\``;
                await user.setNickname(nickname);

                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`✅ Biệt danh đã thay đổi`)
                        .setDescription(`✅ <@${user.id}> đã được đổi biệt danh thành công!!`)
                        .addField(`> 🔰 Được đổi bởi <@${message.author.id}>`,true)
                        .addField(`> Tên cũ :- ${OldName} || > Tên mới :- ${nickname}`,true)
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