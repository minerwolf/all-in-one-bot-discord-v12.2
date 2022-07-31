const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const schema = require('../../utils/models/antiraid');



module.exports = {
    name: 'antiraid',
    aliases: ['anti-raid'],
    category: '⚙️ Config',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Bật bộ chống raid máy chủ và không cho thành viên mới gia nhập vào.',
    usage: "antiraid",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        options = [
            'enable',
            'disable'
        ]

        if (!args.length) return message.reply("Xin hãy nhập là **enable** hoặc **disable**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply('Xin hãy nhập là **enable** hoặc **disable**')


        if (!options.includes(opt)) return message.reply('Xin hãy nhập là **enable** hoặc **disable**')

        if (opt === 'enable') {
            schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (!data) {
                    data = new schema({
                        Guild: message.guild.id,
                    })
                    data.save()
                    message.reply(`Bộ chống raid đã được kích hoạt!`)
                } else {
                    message.reply(`Bộ chống raid đã kích hoạt rồi`)
                }
            })

        }

        if (opt === 'disable') {
            schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (!data) return message.reply('Bộ chống raid đã được vô hiệu hóa rồi')
                data.delete()
                message.reply('Bộ chống raid đã bị vô hiệu hóa!')

            })

        }
    }
}