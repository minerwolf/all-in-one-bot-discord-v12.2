const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'antivc',
    aliases: ['novc'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: 'Chống người dùng vào kênh voice',
    usage: '[COMMAND] + [user]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let voicemember = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!voicemember) return message.reply(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Hãy nhắc đến ai đó`)
                .setFooter(ee.footertext)
        )

        if (voicemember.id === message.author.id) return message.reply(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Bạn không thể chống kênh voice từ chính mình 🤣🥱🥱`)
                .setFooter(ee.footertext)
        )

        if (message.member.roles.highest.position <= voicemember.roles.highest.position) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Không thể chống vào kênh voice của người dùng này. Thành viên có vai trò cao hơn hoặc bằng bạn`)
                    .setFooter(ee.footertext)
            )
        }

        let antivcrole = message.guild.roles.cache.find((r) => r.name === "ANTI-VC");
        if (!antivcrole) {
            try {
                message.author.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Vai trò Anti-VC không được tìm thấy! Để tui tạo vậy, hế hế`)
                        .setFooter(ee.footertext)
                )

                let newrole = message.guild.roles.create({
                    data: {
                        name: "ANTI-VC",
                        permissions: []
                    }
                })
                message.guild.channels.cache.filter((ch) => ch.type = "voice")
                    .forEach(async (ch2) => {
                        await ch2.permissionOverwrites(antivcrole, {
                            VIEW_CHANNEL: false,
                            CONNECT: false
                        })
                    })
                message.channel.send(`${(await newrole).name} đã được tạo`)
            } catch (e) {
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(e)
                        .setFooter(ee.footertext)
                )
            }
        }

        await voicemember.roles.add(antivcrole.id);
        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`@<${voicemember.id}> bây giờ không thể vào kênh voice nào!`)
                .setFooter(ee.footertext)
        )
    }
}