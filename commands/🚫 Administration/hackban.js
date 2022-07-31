const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'hackban',
    aliases: ['bns'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Cấm người dùng bên ngoài máy chủ',
    usage: '[COMMAND]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!user) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Hãy cho tôi biết ID người dùng! Cách dùng là **\`${prefix}hackban <@userid> <lý do>\`**`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        if (isNaN(user)) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Hãy cho tôi biết ID người dùng hợp lệ **ID người dùng chỉ có số, không có chữ cái**`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }


        if (user.id === client.user.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Xin đừng cấm tôi 😢😢😢 \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        if (user.id === message.author.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Bạn không thể tự cấm chính mình 😂😁😁 \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        const reason = args.slice(1).join(" ");

        try {
            if (user) {
                client.users.fetch(user).then(async (member) => {
                    await message.guild.members.ban(member.id, { reason: reason })
                    user.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`Bạn đã bị cấm từ ${message.guild.name}`)
                            .addField(`> Lý do :- \`\`${reason != " " ? reason : - "-"}\`\``, true)
                            .addField(`> Bị cấm bởi <@${message.author.id}>`, true)
                            .setFooter(ee.footertext)
                    )
                })

                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`<@${user}> đã bị cấm thành công từ ${message.guild.name}`)
                        .addField(`> Lý do :- \`\`${reason != " " ? reason : - "-"}\`\``, true)
                        .addField(`> Bị cấm bởi <@${message.author.id}>`, true)
                        .setFooter(ee.footertext)
                ).then(msg => msg.delete({ timeout: 5000 }))
            }
        } catch (e) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\`\`js\n ${e} \`\`\``)
                    .setFooter(ee.footertext)
            )
        }
    }
}