const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'purge',
    aliases: ['delmsg', 'clear', 'delete', 'prune'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_MESSAGES'],
    cooldown: 5,
    description: 'Xóa tin nhắn cũ hơn 14 ngày trong kênh',
    usage: '[COMMAND] + [lượng tin nhắn] <loại>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            const commands = [
                `> bots\`       >  ✅ \`\`Xóa tin nhắn được gửi bởi bot (bỏ qua con người)\`\`\n`,
                `> humans\`     >  ✅ \`\`Xóa tin nhắn được gửi bởi con người (bỏ qua bot)\`\`\n`,
                `> embeds\`     >  ✅ \`\`Xóa tin nhắn có chứa mã nhúng\`\`'n`,
                `> files\`      >  ✅ \`\`Xóa tin nhắn chứa tệp/ảnh/đính kèm\`\`\n`,
                `> mentions\`   >  ✅ \`\`Xóa tin nhắn chứa nhắc tới người dùng/thành viên/vai trò/kênh\`\`\n`,
                `> pins\`       >  ✅ \`\`Xóa tin nhắn đã được ghim\`\`\n`,
                `> text\`       >  ✅ \`\`Xóa tin nhắn chứa chữ (bỏ qua tệp/ảnh/đính kèm/mã nhúng...)\`\`\n`,
                `> match\`      >  ✅ \`\`<text> - Xóa tin nhắn chứa chữ với\`\`\n`,
                `> not\`        >  ✅ \`\`<text> - Xóa tin nhắn không chứa chữ với\`\`\n`,
                `> startswith\` >  ✅ \`\`<text> - Xóa tin nhắn bắt đầu với\`\`\n`,
                `> endswith\`   >  ✅ \`\`<text> - Xóa tin nhắn kết thúc với\`\`\n`
            ]

            let delembed = new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`\`\` **PURGE | CLEAR | DELETE | PRUNE** \`\``)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .addField(`**Bạn có thể xóa một số lượng tin nhắn nhất định trong kênh**`)
                .setDescription(`> Cách dùng:- \`${prefix}purge <amount>\` - Xóa một số lượng tin nhắn.\n\`${prefix}purge <amount>  ${commands.join(`\n\`${prefix}purge <amount>  `)}`)
                .setFooter(`${prefix}purge, ${prefix}clear, ${prefix}delete, ${prefix}prune`)


            if (!args[0] || !args.length) return message.channel.send(delembed);
            let amount = Number(args[0], 10) || parseInt(args[0]);
            if (isNaN(amount) || !Number.isInteger(amount)) return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Hãy nhập số lượng tin nhắn cần xóa trong khoảng từ 1 đến 99`)
                    .setFooter(ee.footertext)
            )
            if (!amount || amount < 2 || amount > 100) return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Hãy nhập số lượng tin nhắn cần xóa trong khoảng từ 1 đến 99`)
                    .setFooter(ee.footertext)
            )
            if (!args[1]) {

                try {
                    await message.delete()
                    await message.channel.bulkDelete(amount).then(async (m) => {

                        let embed = new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                            .setFooter(ee.footertext)

                        message.channel.send(embed).then(msg => msg.delete({ timeout: 4000 }));
                    })

                } catch (e) {
                    message.channel.send(
                        new MessageEmbed()
                            .setDescription(e)
                    )
                }

            } else if (args[1]) {
                let msg;
                let data;
                let embed;
                switch (args[1]) {
                    case "bots":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (ms.author.bot && !ms.pinned) data.push(ms)
                        })

                        try {
                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                botsdel = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(botsdel).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    case "humans":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (!ms.author.bot && !ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                humanembed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(humanembed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    case "embeds":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (ms.embeds.length && !ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                embed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    case "files":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (ms.attachments.first() && !ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                embed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break; case "text":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (!ms.attachments.first() && !ms.embeds.length && !ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                embed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    case "mentions":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if ((ms.mentions.users.first() || ms.mentions.members.first() || ms.mentions.channels.first() || ms.mentions.roles.first()) && !ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                embed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    case "pins":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                embed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    case "match":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (!args[2]) return message.channel.send(embd);
                            if (ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                embed = new MessageEmbed()
                                    .setColor(ee.footertext)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    case "not":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (!args[2]) return message.channel.send(embd);
                            if (!ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                embed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    case "startswith":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (!args[2]) return message.channel.send(embd);
                            if (ms.content.startsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                embed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    case "endswith":
                        msg = await message.channel.messages.fetch({ limit: amount })
                        data = []
                        msg.map(m => m).forEach(ms => {
                            if (!args[2]) return message.channel.send(embd);
                            if (ms.content.endsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
                        })

                        try {

                            await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {

                                embed = new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`✅ Đã xóa **${m.size}**/**${amount}** tin nhắn!`)
                                    .setFooter(ee.footertext)

                                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            })

                        } catch (e) {
                            message.channel.send(
                                new MessageEmbed()
                                    .setDescription(e)
                            )
                        }

                        break;
                    default:
                        message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`**Bạn không thể xóa tin nhắn cũ hơn 14 ngày**`)
                                .setFooter(ee.footertext)
                        )
                        break;
                }

            } else {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`**Bạn không thể xóa tin nhắn cũ hơn 14 ngày**`)
                        .setFooter(ee.footertext)
                )
            }

        } catch (e) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(e)
                    .setFooter(ee.footertext)
            )
        }
    }
}