const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
    name: 'membercount',
    category: "🔰 Info",
    aliases: ['members'],
    cooldown: 5,
    description: 'Hiển thị tất cả thành viên',
    usage: 'membercount',
    memberpermissions: [" "],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        message.channel.send(
             new MessageEmbed()
                .setDescription(`** 🔰Tổng số thành viên** :- \`\`${message.guild.memberCount}\`\` \n ** ✨ Tổng số bots** :- \`\`${message.guild.members.cache.filter(member => member.user.bot).size}\`\``))
    }
}