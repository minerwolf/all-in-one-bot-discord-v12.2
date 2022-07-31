const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'deleteallmessages',
    aliases: ['delmsg'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: 'Xóa tất cả tin nhắn trong kênh',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        if (!args.length) {
             new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Cách dùng >>> ${prefix}deleteallmessages <#channel>`)
        }
        let channel = message.mentions.channels.first();
        if (!channel) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(`Hãy cho biết kênh để xóa tin nhắn`)
            )
        } else {
            const position = channel.position;
            const topic = channel.topic;
            const channel2 = await channel.clone()
            channel2.setPosition(position);
            channel2.setTopic(topic);
            channel.delete();
            const nuke =  new MessageEmbed()
 .setColor(ee.color)
                .setColor("BLUE")
                .setDescription(" 🤣😂 **Tin nhắn trong kênh đã được xóa!**");
            return message.author.send(nuke)
        }


    }
}