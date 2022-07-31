const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'vcallmute',
    aliases: ['muteallvc'],
    category: '🚫 Administration',
    memberpermissions: ['DEAFEN_MEMBERS'],
    cooldown: 5,
    description: "Tắt tiếng hoặc bật tiếng thành viên trong kênh voice",
    usage: "vcallmute",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let voicechannel = message.member.voice.channel;

        if (!voicechannel) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(` <@${message.author.id}> xin hãy vào kênh voice trước!!!`)
                    .setFooter(ee.footertext)
            )
        }

        if (args[1].toLowerCase() === "true") {
            voicechannel.members.filter((x) => !x.permissions.has('ADMINISTRATOR')).forEach((channel) => {
                channel.voice.setMute(true);
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`${voicechannel.name} thành viên đã bị tắt tiếng`)
                )
            })
        }
        if (args[1].toLowerCase() === "false") {
            voicechannel.members.filter((x) => !x.permissions.has('ADMINISTRATOR')).forEach((channel) => {
                channel.voice.setMute(false);
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`${voicechannel.name} thành viên đã được bỏ tắt tiếng`)
                )
            })
        }
    }
}