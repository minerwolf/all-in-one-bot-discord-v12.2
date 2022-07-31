const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'embed',
    aliases: ['pl'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Thêm mã nhúng vào máy chủ',
    usage: '[COMMAND] + [Channel]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let channel = message.mentions.channels.first() || message.channel;

        if (!channel) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Hãy cho biết tên kênh để gửi mã nhúng`)
                    .setFooter(ee.footertext)
            )
        }

        let embed = new MessageEmbed();
        message.reply(
            new MessageEmbed()
                .setDescription(`> Tiêu đề của mã nhúng nên là gì? || Nếu không có thì nhấn vào là \`\`'none'\`\``)
        )
            .then(m => m.delete({ timeout: 30000 }));
        let title = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (title.size) {
            if (title.first().content !== "none") {
                if (title.first().length > 256)
                    return message.reply(
                        new MessageEmbed()
                            .setDescription(`> Tiêu đề không được dài hơn 256 ký tự!!!`)
                    )
                        .then(m => m.delete({ timeout: 5000 }));
                embed.setTitle(title.first().content);
            }
        }

        message
            .reply(
                new MessageEmbed()
                    .setDescription(`> Mô tả của mã nhúng nên là gì? || Nếu không có thì nhập vào là \`\`'none'\`\``)
            )
            .then(m => m.delete({ timeout: 30000 }));
        let description = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (description.size) {
            if (description.first().content !== "none") {
                if (description.first().length > 2048)
                    return message.reply(
                        new MessageEmbed()
                            .setDescription(`Mô tả không được dài hơn 2048 ký tự!!!`)
                    )
                        .then(m => m.delete({ timeout: 5000 }));
                embed.setDescription(description.first().content);
            }
        }

        message
            .reply(
                new MessageEmbed()
                    .setDescription(`> Màu của mã nhúng nên là gi? Hãy nhập mã hex của màu || Nếu không có thì nhập là \`\`'none'\`\``)
            )
            .then(m => m.delete({ timeout: 30000 }));
        let color = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        embed.setColor(color.first().content);

        message
            .reply(
                new MessageEmbed()
                    .setDescription(`> Đuôi của mã nhúng nên là gì? || Nếu không có thì nhập vào là \`\`'none'\`\``)
            )
            .then(m => m.delete({ timeout: 30000 }));
        let footer = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (footer.size) {
            if (footer.first().content !== "none") {
                if (footer.first().length > 100)
                    return message
                        .reply(
                            new MessageEmbed()
                                .setDescription(`> Đuôi không được dài hơn 100 ký tự!!!`)
                        )
                        .then(m => m.delete({ timeout: 5000 }));
                embed.setFooter(footer.first().content);
            }
        }

        // message.channel.send(embed);
        channel.send(embed)
        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`> Mã nhúng đã được gửi vào <#${channel.id}>`)
                .setFooter(ee.footertext)
        ).then(msg => msg.delete({ timeout: 3000 }))
    }
}