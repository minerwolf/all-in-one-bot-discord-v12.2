const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require('ms')

module.exports = {
    name: 'voicemove',
    aliases: ['vcmove'],
    category: '🚫 Administration',
    memberpermissions: ['MOVE_MEMBERS'],
    cooldown: 5,
    description: "Di chuyển thành viên trong kênh voice",
    usage: "voicemove",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let memberchannel = message.member.voice.channel;

        if (!memberchannel) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Bạn cần vào kênh voice trước`)
                    .setFooter(ee.footertext)
            )
        }

        if (!message.guild.me.voice.connection) {

            memberchannel.join().then((c) => {

                message.guild.me.voice.setSelfDeaf(true);

                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`\`\` Tôi đang ở trong kênh voice của bạn. Bây giờ di chuyển tôi để muốn tôi tới đâu \`\``)
                        .setFooter(ee.footertext, "Cảm ơn Tyson")

                )

                client.on('voiceStateUpdate', async (oldstate, newstate) => {
                    const channel = oldstate.member.voice.channel;
                    const targetchannel = message.guild.channels.cache.get(newstate.member.voice.channel.id)


                    if (newstate.member.voice.channel && newstate.member.voice.channel.id != memberchannel.id) {
                        if (client.user.id === newstate.member.user.id) {
                            memberchannel.members.forEach((move) => {
                                move.voice.setChannel(targetchannel)

                                targetchannel.leave()
                            })
                        }
                    } else {
                        message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`Tôi đã ở trong kênh voice của bạn rồi`)
                                .setFooter(ee.footertext, "Cảm ơn Tyson")
                        )
                    }
                })
            })
        }
    }
}