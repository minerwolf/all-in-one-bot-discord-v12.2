const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'invite',
    category: "🔰 Info",
    aliases: ['inv'],
    description: "Mời bot vào server của bạn",
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        message.channel.send(
             new MessageEmbed()
                .setColor(ee.color)
                .setColor('BLUE')
    
                .setTitle("Invite & Support Link!")
                .addField("**Link mời bot**", `[Nhấn vào đây để mời tôi](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)
                .addField("**Server hỗ trợ**", `[Nhấn vào đây để tham gia máy chủ hỗ trợ](https://discord.gg/REAW5VM)`)
                .setFooter(`Requested by ${message.author.tag}`, client.user.displayAvatarURL())
                .setTimestamp()
        )
    }
}