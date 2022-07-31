const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require("moment")

const flags = {
    DISCORD_EMPLOYEE: 'Nhân viên Discord',
    DISCORD_PARTNER: 'Nhân viên Discord',
    BUGHUNTER_LEVEL_1: 'Người truy tìm Bug (cấp độ 1)',
    BUGHUNTER_LEVEL_2: 'Người truy tìm Bug (cấp độ 2)',
    HYPESQUAD_EVENTS: 'Sự kiện HypeSquad',
    HOUSE_BRAVERY: 'House of Bravery (gan dạ)',
    HOUSE_BRILLIANCE: 'House of Brilliance (rực rỡ)',
    HOUSE_BALANCE: 'House of Balance (thăng bằng)',
    EARLY_SUPPORTER: 'Người hỗ trợ sớm',
    SYSTEM: 'Hệ thống',
    VERIFIED_BOT: 'Bot đã được xác minh',
    VERIFIED_DEVELOPER: 'Người tạo Bot đã được xác nhận'
};
function trimArray(arr, maxLen = 25) {
    if (arr.array().length > maxLen) {
        const len = arr.array().length - maxLen;
        arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
        arr.map(role => `<@&${role.id}>`)
        arr.push(`${len} more...`);
    }
    return arr.join(", ");
}
const statuses = {
    "online": "🟢",
    "idle": "🟠",
    "dnd": "🔴",
    "offline": "⚫️",
}


module.exports = {
    name: 'botinfo',
    aliases: ['binfo'],
    category: '🔰 Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Hiển thị thông tin của bot',
    usage: 'botinfo [@bot] [global]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var bot = message.mentions.users.first() || message.author.bot;

            if (!bot || bot == null || bot.id == null || !bot.id) return message.reply("Không tìm thấy bot!!!");

            const member = message.guild.members.cache.get(bot.id);
            //create the EMBED
            const embedbotinfo =  new MessageEmbed()
 .setColor(ee.color)
            embedbotinfo.setThumbnail(bot.displayAvatarURL({ dynamic: true, size: 512 }))
            embedbotinfo.setAuthor("Thông tin của:   " + bot.username + "#" + bot.discriminator ,bot.displayAvatarURL({ dynamic: true }))
            embedbotinfo.addField('**❱ tên bot:**', `<@${bot.username}>\n\`${bot.tag}\``, true)
            embedbotinfo.addField('**❱ ID:**', `\`${bot.id}\``, true)
            embedbotinfo.addField('**❱ Ảnh đại diện:**', `[\`Link ảnh đại diện\`](${bot.displayAvatarURL({ format: "png" })})`, true)
            embedbotinfo.addField('**❱ Ngày tham gia Discord:**', "\`" + moment(bot.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(bot.createdTimestamp).format("hh:mm:ss") + "\`", true)
            embedbotinfo.addField('**❱ Có là bot không:**', `\`${bot.bot ? "✔️" : "❌"}\``, true)
            embedbotinfo.setFooter(ee.footertext, ee.footericon)
            //send the EMBED
            message.channel.send(embedbotinfo)
        } catch (e) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}