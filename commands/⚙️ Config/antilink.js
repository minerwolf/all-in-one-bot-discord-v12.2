const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const antilink = require('../../utils/models/antilink');


module.exports = {
    name: 'antilink',
    aliases: ['pl'],
    category: '⚙️ Config',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: "Bật hoặc tắt bộ chống link",
    usage: "lock",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        if (!args[0]) {
            return message.channel.send(
                `Usage: \`${prefix}antilink <on|off>\``
            );
        }
        if (args[0] === "On" || args[0] === "on") {
            const data = await antilink.findOne({
                GuildID: message.guild.id,
            });

            if (data) {
                await antilink.findOneAndRemove({
                    GuildID: message.guild.id,
                });

                message.channel.send(`Bộ chống link hiện đang BẬT!`);

                let newData = new antilink({
                    GuildID: message.guild.id,
                });
                newData.save();
            } else if (!data) {
                message.channel.send(`Bộ chống link hiện đang BẬT`);

                let newData = new antilink({
                    GuildID: message.guild.id,
                });
                newData.save();
            }
        } else if (args[0] === "off" || args[0] === "Off") {
            const data2 = await antilink.findOne({
                GuildID: message.guild.id,
            });

            if (data2) {
                await antilink.findOneAndRemove({
                    GuildID: message.guild.id,
                });

                return message.channel.send(`Bộ chống link đã được vô hiệu hóa!`);
            } else if (!data2) {
                return message.channel.send(`Bộ chống link hiện đang tắt!`);
            }
        }
    }
}