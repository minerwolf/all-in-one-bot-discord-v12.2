const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const Schema = require("../../utils/models/mute");


module.exports = {
    name: 'unmute',
    aliases: ['mafkiya'],
    category: '🚫 Administration',
    memberpermissions: ['MUTE_MEMBERS'],
    description: 'Bỏ tắt tiếng người dùng!',
    useage: 'unmute @User [REASON]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let member = message.mentions.members.first();
        if (!member) return message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription("**Hãy nhắc tới ai đó. Cách dùng: `unmute @thành viên lý do`**")
                .setFooter(ee.footertext)
        )
        args.shift(); //shift args

        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("**Tôi không thể bỏ tắt tiếng thành viên này bởi người đó có vai trò bằng hoặc cao hơn bạn!**")
                    .setFooter(ee.footertext)
            )
        }

        let allguildroles = message.guild.roles.cache.array();

        let mutedrole = false;
        for (let i = 0; i < allguildroles.length; i++) {
            if (allguildroles[i].name.toLowerCase().includes("Muted")) {
                mutedrole = allguildroles[i];
                break;
            }
        }
        if (!mutedrole) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("**Không phát hiện vai trò tắt tiếng**")
                    .setFooter(ee.footertext)
            )
        }
        if (!message.member.permissions.has("ADMINISTRATOR") && mutedrole.position > message.guild.me.roles.highest.position) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("**Tôi không thể truy cập vai trò bởi vì nó ở vị trí cao hơn tôi!**")
                    .setFooter(ee.footertext)
            )
        }

        let reason = args.slice(1).join(" ")

        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("**Hãy cho biết lý do để bỏ tắt tiếng người dùng này**")
                    .setFooter(ee.footertext)
            )
        }
        Schema.findOne({
            Guild: message.guild.id,
        }, async (err, data) => {
            if (!data) return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("**Bạn chưa bao giờ tắt tiếng ai, vai trò tắt tiếng không tồn tại**")
                    .setFooter(ee.footertext)
            )
            const user = data.Users.findIndex((prop) => prop === member.id)
            if (user == -1) return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setAuthor(message.author.tag)
                    .setDescription("**Bạn chưa bao giờ tắt tiếng ai, vai trò tắt tiếng không tồn tại**")
                    .setFooter(ee.footertext)
            )
            data.Users.splice(user, 1)
        })
        try {
            await member.roles.remove(mutedrole);
        } catch {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("**Đã có lỗi xảy ra!**")
                    .setFooter(ee.footertext)
            )
        }

        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`> <@${member.user.id}> đã được bỏ tắt tiếng \n\n > Lý do = \`\`${reason}\`\``)
                .setFooter(`Được bỏ tắt tiếng bởi ${message.author.username}`)
        )
        try {
            member.send(embed.setTitle(`Bạn được bỏ tắt tiếng bởi: \`${message.author.tag}\``))
        } catch {
        }
    }
}