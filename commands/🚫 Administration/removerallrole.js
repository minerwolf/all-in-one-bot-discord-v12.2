const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'delrolefromeveryone',
    aliases: ["rrall", "rroleall", "takeroleall"],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: "Xóa vai trò khỏi tất cả thành viên ở server hiện tại",
    usage: 'removeroleall <roles>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            const [key, ...value] = args;

            switch (key) {
                case "bot":
                    {
                        const role =
                            message.guild.roles.cache.find(
                                role => role.name === args.join(" ").slice(2)
                            ) ||
                            message.mentions.roles.first() ||
                            message.guild.roles.cache.get(args.join(" ").slice(2));

                        if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
                            return message.channel.send(
                                new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Vai trò của tôi chưa đủ cao so với **${role.name}**!`)
                            );
                        }

                        if (message.member.roles.highest.comparePositionTo(role) < 0) {
                            return message.channel.send(
                                new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Vai trò của bạn phải cao hơn **${role.name}**!`)
                            );
                        }

                        if (!role) {
                            return message.channel.send(new MessageEmbed()
                                .setColor(ee.color).setDescription("Xin hãy cho biết một vai trò hợp lệ"));
                        }

                        message.guild.bot.cache.forEach(member => member.roles.add(role));

                        message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(` ✅ Đã thêm vai trò **${role.name}** vào Bot`)
                        );
                    }
                    break;
                case "member": {
                    const role =
                        message.guild.roles.cache.find(
                            role => role.name === args.join(" ").slice(2)
                        ) ||
                        message.mentions.roles.first() ||
                        message.guild.roles.cache.get(args.join(" ").slice(2));

                    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`Vai trò của tôi chưa đủ cao so với **${role.name}**!`)
                        );
                    }

                    if (message.member.roles.highest.comparePositionTo(role) < 0) {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`Vai trò của bạn phải cao hơn **${role.name}**!`)
                        );
                    }

                    if (!role) {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription("Xin hãy cho biết một vai trò hợp lệ")
                        );
                    }

                    message.guild.members.cache.forEach(member => member.roles.add(role));

                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(` ✅ Đã thêm vai trò **${role.name}** vào thành viên`)
                    );
                }
            }

            const role =
                message.guild.roles.cache.find(
                    role => role.name === args.join(" ").slice(1)
                ) ||
                message.mentions.roles.first() ||
                message.guild.roles.cache.get(args.join(" ").slice(1));

            if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Vai trò của tôi chưa đủ cao so với **${role.name}**!`)
                );
            }

            if (message.member.roles.highest.comparePositionTo(role) < 0) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Vai trò của bạn phải cao hơn **${role.name}**!`)
                );
            }

            if (!role) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription("Xin hãy cho biết một vai trò hợp lệ")
                );
            }

            message.guild.members.cache.forEach(member => member.roles.remove(role));

            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Đã xóa thành công **${role.name}** khỏi tất cả mọi người`)
            );
        } catch (e) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}