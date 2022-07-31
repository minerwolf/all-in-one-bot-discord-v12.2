const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config/config.json").prefix;

module.exports = {
  name: "help",
  aliases: ['h'],
  description: "Hiển thị tất cả lệnh của bot (tôi)",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Không có tên lệnh";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "Đang thực thi" : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Cần hỗ trợ? Đây là tất cả các lệnh của tôi:")
        .addFields(categories)
        .setDescription(
          `Dùng \`${prefix}help\` với tên của lệnh để biết thêm thông tin của lệnh đó. Ví dụ như là: \`${prefix}help ban\`.`
        )
        .setFooter(
          `Được yêu cầu bởi ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Câu lệnh không hợp lệ! Dùng \`${prefix}help\` để xem tất cả lệnh của tôi!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Thông tin của lệnh:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "Không có tên cho câu lệnh này"
        )
        .addField(
          "BÍ DANH:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Không có bí danh cho lệnh này"
        )
        .addField(
          "CÁCH DÙNG:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "MÔ TẢ:",
          command.description
            ? command.description
            : "Không có mô tả cho lệnh này"
        )
        .setFooter(
          `Được yêu cầu bởi ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};