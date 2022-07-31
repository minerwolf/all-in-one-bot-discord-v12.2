const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const antiwordsSchema = require('../../utils/models/antilink');


module.exports = {
    name: 'antiword',
    aliases: ['aw'],
    category: '⚙️ Config',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: "Cài đặt bộ chống từ trong máy chủ",
    usage: "antiword",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        if (!args[0]) {
            return message.channel.send(`Cách dùng: \`(prefix)antiwords <on|off>\``)
        }
        if (args[0] === "On" || args[0] === "on") {
            const data = await antiwordsSchema.findOne({
                GuildID: message.guild.id,
            });

            if (data) {
                await antiwordsSchema.findOneAndRemove({
                    GuildID: message.guild.id,
                });

                message.channel.send(`**Bộ chống từ đang hoạt động!**`);

                let newData = new antiwordsSchema({
                    GuildID: message.guild.id,
                });
                newData.save();
            } else if (!data) {
                message.channel.send(`**Bộ chống từ đã được kích hoạt!**`);

                let newData = new antiwordsSchema({
                    GuildID: message.guild.id,
                });
                newData.save();
            }
        } else if (args[0] === "Off" || args[0] === "off") {
            const data2 = await antiwordsSchema.findOne({
                GuildID: message.guild.id,
            });

            if (data2) {
                await antiwordsSchema.findOneAndRemove({
                    GuildID: message.guild.id,
                });

                return message.channel.send(`**Bộ chống từ đã được vô hiệu hóa!**`);

            } else if (!data2) {
                return message.channel.send(`**Bộ chống từ chưa được thiết lập!**`);
            }
        }
    }
}