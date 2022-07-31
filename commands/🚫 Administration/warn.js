const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'warn',
    aliases: ['warn'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_GUILD'],
    cooldown: 5,
    description: 'Cảnh cáo thành viên',
    usage: '[COMMAND] + [@user] + [reason]',
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
                    .setDescription(`\`\` Hãy nhắc tới ai đó để cảnh cáo \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // it user is bot
        if (bot) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Bạn không thể cảnh cáo bot \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // if user is message author
        if (message.author.id === warnmember.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Bạn không thể tự cảnh cáo chính mình \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // if warn guild owner
        if (warnmember.id === message.guild.owner.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Bạn không thể cảnh cáo chủ server \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // define reason
        let reason = args.slice(1).join(" ");

        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Bạn phải cho biết lý do cảnh cáo thành viên này \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // database

        let warnings = client.db.get(`warnings_${message.guild.id}_${warnmember.id}`);

        if (warnings === null) {
            client.db.set(`warnings_${message.guild.id}_${warnmember.id}`, 1);
        //    try {
        //     warnmember.send(
        //         new MessageEmbed()
        //             .setColor(ee.color)
        //             .setDescription(`\`\` Bạn đã bị cảnh cáo trong **${message.guild.name}** với lý do **${reason}** \`\``)
        //             .setFooter(ee.footertext)
        //     )
        //    } catch (e) {
        //        console.log(`DM OFF ${warnmember.user.username}`);
        //    }
            await message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** <@${warnmember.id}> đã bị ✅ cảnh cáo với lý do ${reason}`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        } else if (warnings !== null) {
            client.db.add(`warnings_${message.guild.id}_${warnmember.id}`, 1);

            warnmember.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(warnmember.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`\`\` Bạn đã bị cảnh cáo trong **${message.guild.name}** với lý do **${reason}** \`\``)
                    .setFooter(ee.footertext)
            )
            await message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** <@${warnmember.id}> đã bị ✅ cảnh cáo với lý do ${reason}`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }
    }
}