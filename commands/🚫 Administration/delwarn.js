const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'delwarn',
    aliases: ['paradon'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_GUILD'],
    cooldown: 5,
    description: 'Xóa cảnh cáo khỏi thành viên',
    usage: '[COMMAND] + [@user]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        const warnmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const bot = message.mentions.users.first().bot

        // if not member
        if (!warnmember) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Hãy nhắc đến ai đó để xóa cảnh cáo \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // it user is bot
        if (bot) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Không thể xóa cảnh cáo khỏi Bot \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // if user is message author
        if (message.author.id === warnmember.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Không thể xóa cảnh cáo của chính mình \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // if warn guild owner
        if (warnmember.id === message.guild.owner.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Không thể xóa cảnh cáo của chủ server \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // database

        let warnings = client.db.get(`warnings_${message.guild.id}_${warnmember.id}`);

        client.db.delete(`warnings_${message.guild.id}_${warnmember.id}`);
        await message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`** <@${warnmember.id}> đã được xóa bởi  <@${message.author.id}> trong ${message.guild.name} `)
                .setFooter(ee.footertext)
        ).then(msg => msg.delete({ timeout: 5000 }))


    }
}