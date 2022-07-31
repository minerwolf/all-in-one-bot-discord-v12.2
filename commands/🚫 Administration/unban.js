const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'unban',
    aliases: ['ajaback'],
    category: '🚫 Administration',
    memberpermissions: ['BAN_MEMBERS'],
    cooldown: 5,
    description: 'Dỡ bỏ lệnh cấm của thành viên',
    usage: 'unban + <@user> + <lý do>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let bannedMember = await client.users.fetch(args[0])
        // if not a member
        if (!bannedMember) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`**Hãy cho biết thành viên để dỡ bỏ lệnh cấm**`)
                    .setDescription(`> Cách dùng =  ${prefix}unban + <ID> + <lý do>`)
                    .setFooter(ee.footertext)
            )
        }

        if (isNaN(args[0])) return message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription("**Bạn cần cho biết ID người dùng hợp lệ**")
                .setFooter(ee.footertext)
        )


        let reason = args.slice(1).join(" ")

        // if not a Role
        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`**Hãy cho biết lý do**`)
                    .setFooter(ee.footertext)
            )
        }

        // add role to user
        if (bannedMember) {
            await message.guild.members.unban(bannedMember, reason).catch(e => console.log(e))
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`> ${bannedMember} đã được dỡ bỏ lệnh cấm khỏi server \n\n > Lý do = \`\`${reason}\`\``)
                    .setThumbnail(bannedMember.displayAvatarURL({ dynamic: true }))
                    .setFooter(`Được bỏ lệnh cấm bởi ${message.author.username}`)
            )
        }
    }
}