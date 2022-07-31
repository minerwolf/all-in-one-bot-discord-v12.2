const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');


module.exports = {
    name: 'setuprules',
    aliases: ["rules", 'setup-rules'],
    category: '⚙️ Config',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: "Cài đặt luật trong máy chủ",
    usage: "setuprules",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        // rules 1
        let rules1 = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`\`\`🔰 Các luật cơ bản 🔰\`\``)
            .setFooter(ee.footertext)
            .setThumbnail("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
            .setDescription(`
            > 1. Tôn Trọng: Tôn trọng những người khác, cũng là một cách để tôn trọng bản thân. Chúng tôi nghiêm cấm mọi hành vi thiếu tôn trọng như: Chửi thề quá mức, xúc phạm tới một cá nhân tập thể, xúc phạm, bôi nhọ thành phần chính trị, bộ phận thuộc Nhà nước.\n
            > 2. General / Bot Channels: Các kênh được tạo ra trong server nhằm mục đích riêng của mỗi kênh. Hãy tuân thủ luật lệ của kênh đó. Tuyệt đối không được đi lạc topic của mỗi kênh. Điều này rất quan trọng.\n
            > 3. Spamming: Spam là một dạng gửi nhiều tin nhắn cùng một lúc hoặc một tin nhắn nhưng đúp kí tự / nhiều dòng, chữ trong 1 tin, nên chúng tôi cũng không cho phép điều đó. Tuyệt đối không được gửi nhiều tin nhắn cùng topic, nhiều kí tự trong một tin nhắn, và nhiều thứ nữa liên quan tới spam như : Lyrics, Copypasta, Attachment Spam...\n
            > 4. NSFW Contents: NSFW, hay còn được hiểu là Not Safe For Work, là những nội dung không dành cho người dưới 18 tuổi. Chúng tôi cũng tuyệt đối cấm những hành vi NSFW (Bao gồm : Ấu dâm, tình dục, bạo lực, máu me, giết chóc, tà đạo...) làm ảnh hưởng đến phần lớn các bạn trẻ trong server.\n
            > 5. Quảng Cáo / Advertising: Là hành vi không được cho phép, do nó làm ảnh hưởng đến người dùng, khiến họ cảm thấy khó chịu. Nội dung quảng cáo bao gồm : Discord Invites, tài khoản Mạng Xã Hội, trang mạng lợi nhuận, nghi vấn độc hại, scam.. là không được cho phép. Nhưng nếu bạn có nhu cầu quảng cáo, bạn có thể qua #deleted-channel để mua paid-ads (Quảng cáo được trả tiền).\n
            > 6. Rối loạn trật tự: Các hành vi gây ảnh hưởng, rối loạn trật tự của server như : Tokens qua ngôn ngữ lập trình, Webhooks, Raid Bots. Cũng như các hành vi tự phát nhằm gây thù oán, chiến tranh sẽ bị xử phạt cho tất cả trường hợp.\n
            > 7. Threats / Đe dọa: Chúng tôi muốn bảo vệ các thành viên trong server. Hành vi Bao gồm : Máu me, chết chóc, tà đạo, thế lực đen tối, DoX, thông tin cá nhân, bắt nạt, bắt cóc... là không được cho phép.\n
            > 8. TOS: Luôn tuân thủ luật của Discord - https://discord.com/terms - https://discord.com/privacy
            `)

        // punishments for violating the rules

        let punishment0 = new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
            .setTitle(`\`\`🔰 Hình phạt cho thành viên vi phạm 🔰\`\``)
            .setFooter(ee.footertext)
            .setDescription(`
       > Đối với thành viên bị mute\n
       > -----------------------------------------------------------------\n
       > ・ Tù nhân phải chấp hành các quy định nộp phạt. Đối với tù nhân đã qua thời hạn lao động, nếu chưa nộp đủ tiền phạt sẽ bị ban vĩnh viễn. Cụ thể như sau :\n
       > ・❗️. Nội dung liên quan đến NSFW - 18+ : Phạt 500 nghìn cowoncy (trong 2 tháng lao động)\n
       > ・❗️. Spam : Phạt 1 triệu cowoncy (trong 3 tháng lao động)\n
       > ・❗️. War : Phạt 3 triệu cowoncy (trong 4 tháng lao động)\n
       > ・❗️. Raid : Phạt 10 triệu cowoncy (trong 12 tháng lao động)\n
       `)

        let follow = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`🔰 ** Đọc tất cả luật kỹ càng và cẩn thận ** 🔰`)
            .setDescription(`\`\`Read the above rules carefully and do follow them.\n⭕ Note: The rules will be changed as per the requirements in the future.  \`\``)
            .setImage("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
            .setFooter(ee.footertext)

        message.channel.send(`@everyone`)
        message.channel.send(rules1);
        message.channel.send(punishment0);
        message.channel.send(follow).then(msg => msg.react("✅"))
    }
}

