const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const Joinmsg = require('../../utils/models/joinmsg');


module.exports = {
    name: 'welcome-msg',
    aliases: ["joinmsg", "welcomemsg", "jmsg"],
    category: '⚙️ Config',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: "Cài đặt tin nhắn chào mừng thành viên trong máy chủ",
    usage: "welcome-msg",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const text = args.join(" ");
        if (!args[0]) {
            return message.channel.send(`\`Cách dùng: ${prefix}welcome-msg <Text|off>\``);
        }
        if (text !== "off") {
            const data = await Joinmsg.findOne({
                GuildID: message.guild.id,
            });

            if (data) {
                await Joinmsg.findOneAndRemove({
                    GuildID: message.guild.id,
                });
                let newData = new Joinmsg({
                    JoinMsg: args.join(" "),
                    GuildID: message.guild.id,
                });
                newData.save();
                message.channel.send(`Tin nhắn tham gia đã được đặt thành ${newData.JoinMsg}`);
            } else if (!data) {
                let newData = new Joinmsg({
                    JoinMsg: args.join(" "),
                    GuildID: message.guild.id,
                });
                newData.save();
                message.channel.send(`Tin nhắn tham gia đã được đặt thành ${newData.JoinMsg}`);
            }
        } else if (text === "off") {
            const data2 = await Joinmsg.findOne({
                GuildID: message.guild.id,
            });

            if (data2) {
                await Joinmsg.findOneAndRemove({
                    GuildID: message.guild.id,
                });

                return message.channel.send(`Tin nhắn tham gia đã được vô hiệu hóa!`);
            } else if (!data2) {
                return message.channel.send(`Tin nhắn tham gia chưa được cài đặt!`);
            }
        }
    }
}