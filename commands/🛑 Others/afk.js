const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const { afk } = require("../../utils/tools/afk")


module.exports = {
    name: 'afk',
    aliases: [''],
    category: '🛑 Others',
    memberpermissions: ["SEND_MESSAGES"],
    cooldown: '',
    description: 'Đưa người dùng vào trạng thái AFK',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const reason = args.join(" ") || 'Không có lý do nào được cung cấp!';

        afk.set(message.author.id, [Date.now(), reason]);

        message.channel.send(
            new MessageEmbed()
                .setDescription(`Bạn đã được đặt trạng thái AFK với lý do là \`${reason}\``)
                .setTimestamp()
                .setColor(ee.color)
                .setFooter(ee.footertext)
        )
    }
}