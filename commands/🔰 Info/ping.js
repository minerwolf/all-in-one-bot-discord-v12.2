const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
  name: 'ping',
  category: "🔰 Info",
  aliases: ['api'],
  cooldown: 5,
  description: 'Kiểm tra ping của bot',
  usage: 'ping',
  memberpermissions: [" "],
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {

    message.channel.send(
       new MessageEmbed()
        .setDescription(`> 🎈 Ping ${Date.now() - message.createdTimestamp}ms`)
    )
  }
}