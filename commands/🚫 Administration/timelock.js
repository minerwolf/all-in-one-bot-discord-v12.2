const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require('ms')

module.exports = {
    name: 'timelock',
    aliases: ['pl'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: "Bắt đầu khóa kênh trong 1 thời gian nhất định",
    usage: "timelock <time>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const time = args.join(" ");
        if (!time) {
            return message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription("Nhập một thời gian hợp lệ trong Giây/Phút/Giờ")
            );
        }
        message.channel.overwritePermissions([
            {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
            }
        ]);
        const embed =  new MessageEmbed()
 .setColor(ee.color)
            .setTitle("Channel Updates")
            .setDescription(
                `${message.channel} đã được khóa trong \`${time}\``
            )
        message.channel.send(embed);

        setTimeout(function () {
            message.channel.overwritePermissions([
                {
                    id: message.guild.id,
                    null: ["SEND_MESSAGES"]
                }
            ]);
            const embed2 =  new MessageEmbed()
 .setColor(ee.color)
                .setTitle("Channel Updates")
                .setDescription(`Chế độ khóa đã được dỡ bỏ trong ${message.channel}`)
            message.channel.send(embed2);
        }, ms(time));
    }
}