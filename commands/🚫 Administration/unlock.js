const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require('ms')

module.exports = {
    name: 'unlock',
    aliases: ['pl'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: "Mở khóa kênh",
    usage: "unlock",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        message.channel.overwritePermissions([
            {
              id: message.guild.id,
              null: ["SEND_MESSAGES"]
            }
          ]);
        const embed =  new MessageEmbed()
 .setColor(ee.color)
            .setTitle("Cập nhật về kênh")
            .setDescription(`🔒 ${message.channel} đã được mở khóa`)
        await message.channel.send(embed).then((msg) => {
            msg.delete({timeout : 5000})
        })
    }
}