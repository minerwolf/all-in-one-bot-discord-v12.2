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
    TEAM_USER: 'Người theo đội',
    SYSTEM: 'Hệ thống',
    VERIFIED_BOT: 'Bot đã được xác minh',
    VERIFIED_DEVELOPER: 'Người tạo Bot đã được xác nhận'
};
function trimArray(arr, maxLen = 25) {
    if (arr.array().length > maxLen) {
        const len = arr.array().length - maxLen;
        arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
        arr.map(role => `<@&${role.id}>`)
        arr.push(`${len} nữa...`);
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
    name: 'userinfo',
    aliases: ['uinfo'],
    category: '🔰 Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Hiển thị thông tin người dùng nào đó',
    usage: 'userinfo [@USER] [global]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var user = message.mentions.users.first() || message.author;
            if (!user || user == null || user.id == null || !user.id) return message.reply("Không tìm thấy người dùng");

            const member = message.guild.members.cache.get(user.id);
            const roles = member.roles;
            const userFlags = member.user.flags.toArray();
            const activity = member.user.presence.activities[0];
            //create the EMBED
            const embeduserinfo =  new MessageEmbed()
 .setColor(ee.color)
            embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            embeduserinfo.setAuthor("Thông tin của:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
            embeduserinfo.addField('**❱ Tên người dùng:**', `<@${member.user.id}>\n\`${member.user.tag}\``, true)
            embeduserinfo.addField('**❱ ID:**', `\`${member.id}\``, true)
            embeduserinfo.addField('**❱ Ảnh đại diện:**', `[\`Link ảnh đại diện\`](${member.user.displayAvatarURL({ format: "png" })})`, true)
            embeduserinfo.addField('**❱ Ngày tham gia Discord:**', "\`" + moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`", true)
            embeduserinfo.addField('**❱ Ngày tham gia máy chủ:**', "\`" + moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(member.joinedTimestamp).format("hh:mm:ss") + "\`", true)
            embeduserinfo.addField('**❱ Cờ:**', `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``, true)
            embeduserinfo.addField('**❱ Hiện trạng:**', `\`${statuses[member.user.presence.status]} ${member.user.presence.status}\``, true)
            embeduserinfo.addField('**❱ Vai trò cao nhất:**', `${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`, true)
            embeduserinfo.addField('**❱ Có là bot không:**', `\`${member.user.bot ? "✔️" : "❌"}\``, true)
            var userstatus = "Đang không có hoạt động";
            if (activity) {
                if (activity.type === "CUSTOM_STATUS") {
                    let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a" : ""}:${activity.emoji.name}:${activity.emoji.id}>` : activity.emoji.name : ""}`
                    userstatus = `${emoji} \`${activity.state || 'Không có hoạt động nào'}\``
                }
                else {
                    userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
                }
            }
            embeduserinfo.addField('**❱ Hoạt động:**', `${userstatus}`)
            embeduserinfo.addField('**❱ Quyền lợi:**', `${message.member.permissions.toArray().map(p => `\`${p}\``).join(", ")}`)
            embeduserinfo.addField(`❱ [${roles.cache.size}] Roles: `, roles.cache.size < 25 ? roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'None')
            embeduserinfo.setFooter(ee.footertext, ee.footericon)
            //send the EMBED
            message.channel.send(embeduserinfo)
        } catch (e) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}