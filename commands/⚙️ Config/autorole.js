const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const roleData = require('../../utils/models/autorole');


module.exports = {
    name: 'autorole',
    aliases: ['arole'],
    category: '⚙️ Config',
    memberpermissions: ['MANAGE_ROLES'],
    cooldown: 5,
    description: "Cài đặt vai trò tự động trong máy chủ",
    usage: "autorole",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        if (!args[0]) {
            return message.channel.send(`\`Cách dùng: ${prefix}autorole <@role|off>\``)
        }
        if (message.mentions.roles.first()) {
            const data = await roleData.findOne({
                GuildID: message.guild.id
            });

            if (data) {
                await roleData.findOneAndRemove({
                    GuildID: message.guild.id
                });

                message.channel.send(`Vai trò tự động đã được kích hoạt và vai trò đó là ${message.mentions.roles.first()}`);

                let newData = new roleData({
                    Role: message.mentions.roles.first().id,
                    GuildID: message.guild.id
                });
                newData.save();
            } else if (!data) {
                message.channel.send(`Vai trò tự động đã được kích hoạt và vai trò đó là ${message.mentions.roles.first()}`);

                let newData = new roleData({
                    Role: message.mentions.roles.first().id,
                    GuildID: message.guild.id
                });
                newData.save();
            }
        } else if (args[0] === "off") {
            const data2 = await roleData.findOne({
                GuildID: message.guild.id
            });

            if (data2) {
                await roleData.findOneAndRemove({
                    GuildID: message.guild.id
                });

                return message.channel.send(`Vai trò tự động đã được vô hiệu hóa!`);

            } else if (!data2) {
                return message.channel.send(`Vai trò tự động chưa được cài đặt!`)
            }
        }
    }
}