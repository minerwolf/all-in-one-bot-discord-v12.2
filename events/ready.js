const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index');
const config = require('../config/config.json')
/** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */


client.on('ready', () => {
  console.log(
    `
    ..............................................................................
    ........................${client.user.username} Is Online ....................
    ..............................................................................
    `
  );
  client.user.setActivity(`make by 『2704』 MinerWolfYBT Vn#2279`, {type: 'PLAYING'});
 // will set the bot's activity to 'Watching a video' with the status Do Not Disturb
  client.user.setPresence({
    status: 'dnd',
    activity: {
        name: '-help',
        type: 'PLAYING'
    }
});
})



