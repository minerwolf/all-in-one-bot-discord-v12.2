const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const backup = require("discord-backup");


module.exports = {
    name: 'backup',
    aliases: ["backupserver"],
    category: '⚙️ Config',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: "Tạo và mở bản sao lưu trong máy chủ",
    usage: "backup",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        if(message.author.id === message.guild.owner.id) return;
        
        if (!args[0]) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`1. \`\`Để tạo sao lưu hãy nhập ${prefix}backup create\`\` \n 2.  \`\`Để mở bản sao lưu hãy nhập ${prefix}backup load \`\` \n 3. \`\`Để xem thông tin bản sao lưu hãy nhập ${prefix}backup info \`\` `)
                    .setFooter(ee.footertext)
            )
        }

        // creating backup
        if (args[0] === 'create') {
            // Create the backup
            backup.create(message.guild, {
                jsonBeautify: true
            }).then((backupData) => {
                // And send informations to the backup owner
                message.author.send("Bản sao lưu đã được tạo! Để mở nó, hãy nhập lệnh sau ở trong máy chủ bạn muốn: `" + prefix + "backup load " + backupData.id);
                message.channel.send(new MessageEmbed()
                    .setDescription('Bản sao lưu đã được tạo và lưu vào cơ sở dữ liệu của tôi. Để mở nó, hãy vào tin nhắn trực tiếp của bạn, sao chép mã ID tôi cấp cho và mở nó')
                    .setColor(ee.color)
                    .setFooter('Backup created at')
                    .setTimestamp());
            }).catch((e) => {
                return message.reply(
                    new MessageEmbed()
                        .setDescription(`'Hãy mở tin nhắn trực tiếp của bạn, tôi không thể nhắn mã sao lưu!'`)
                )
            })
        }


        // loading backup
        if (args[0] === 'load') {
            let backupID = args[1];
            if (!backupID) {
                return message.reply(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Bạn cần cho biết ID sao lưu hợp lệ!`)
                        .setFooter(ee.footertext)
                )
            }

            // Fetching the backup to know if it exists
            backup.fetch(backupID).then(async () => {
                // If the backup exists, request for confirmation
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(":warning: | Khi bản sao lưu được mở, tất cả các vai trò, kênh,... sẽ bị thay thế với những gì có trong bản sao lưu! Nhập `-confirm` để xác nhận!")
                        .setFooter(ee.footertext)
                );
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "-confirm"), {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch((err) => {
                    // if the author of the commands does not confirm the backup loading
                    return message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(":x: | Đã hết thời gian chờ! Bỏ qua việc mở bản sao lưu!")
                            .setFooter(ee.footertext)
                    );
                });
                // When the author of the command has confirmed that he wants to load the backup on his server
                message.author.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(":white_check_mark: | Bắt đầu mở bản sao lưu!")
                        .setFooter(ee.footertext)
                );
                // Load the backup
                backup.load(backupID, message.guild).then(() => {
                    // When the backup is loaded, delete them from the server
                    backup.remove(backupID);
                }).catch((err) => {
                    // If an error occurred
                    return message.author.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(":x: | Xin lỗi, đã có lỗi xảy ra... Xin hãy kiểm tra lại là tôi đã có quyền quản trị viên chưa?")
                            .setFooter(ee.footertext)
                    );
                });
            }).catch((err) => {
                console.log(err);
                // if the backup wasn't found
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(":x: | Không tìm thấy sao lưu cho `" + backupID + "`!")
                        .setFooter(ee.footertext)
                );
            });

        }


        // info backup


        if (args[0] === 'info') {
            let backupID = args[1];
            if (!backupID) {
                return message.reply(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Bạn cần cho biết ID sao lưu hợp lệ!!`)
                        .setFooter(ee.footertext)
                )
            }

            // fetch backup

            backup.fetch(backupID).then((backupInfos) => {
                const date = new Date(backupInfos.data.createdTimestamp);
                const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
                const formatedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`;
                let embed = new MessageEmbed()
                    .setAuthor("Backup Informations")
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    // Display the backup ID
                    .addField(`>\`\` Backup ID = ${backupInfos.id} \`\``, false)
                    // Displays the server from which this backup comes
                    .addField(`> \`\` Server ID = ${backupInfos.data.guildID}\`\``, false)
                    // Display the size (in mb) of the backup
                    .addField(`> \`\` Backup Size = ${backupInfos.size} \`\``, false)
                    // Display when the backup was created
                    .addField(`> \`\` Created at ${formatedDate} \`\``, false)
                    .setColor(ee.color)
                    .setFooter(ee.footertext)
                message.channel.send(embed);
            }).catch((err) => {
                // if the backup wasn't found
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`> \`\` Không có bản sao lưu cho ${backupID} \`\``)
                        .setFooter(ee.footertext)
                );
            });
        }
    }
}
