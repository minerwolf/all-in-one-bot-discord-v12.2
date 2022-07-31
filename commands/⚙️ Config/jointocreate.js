const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');


module.exports = {
    name: 'jointocreate',
    aliases: ["j2c"],
    category: '⚙️ Config',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: "Cài đặt kênh Vào Để Tạo trong máy chủ",
    usage: "jointocreate",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        const channel = message.guild.channels.cache.find(ch => ch.name === "🔊｜Join To Create");

        if (!channel) {
            message.guild.channels.create('🔊｜ᴊᴏɪɴ-ᴛᴏ-ᴄʀᴇᴀᴛᴇ', {
                type: 'voice',
                topic: "Kênh này được dùng để VÀO ĐỂ TẠO và nếu bạn xóa kênh này thì bot có thể không hoạt động và cần thiết lập lại",
                // parent: channel.id,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT'],
                    },
                    { //giving the Bot himself permissions
                        id: client.user.id,
                        allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
                    }
                ]
            }).then((ch) => {
                return message.channel.send(
                     new MessageEmbed()
                .setColor(ee.color)
                        .setDescription(` > ** Kênh Vào Để Tạo đã được thiết lập hoàn tất <#${ch.id}> và vào để tạo kênh giọng nói của bạn ** \n > ** Không được đổi tên kênh này nếu có thì nó sẽ không hoạt động ** `)
                )
            })
        }

        if (channel) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(`> **Kênh chat đã được thiết lập <#${channel.id}> ** \n > ** Không được thay đổi tên kênh này, nếu có thì chat sẽ không hoạt động ** `)
            )
        }

    }
}

