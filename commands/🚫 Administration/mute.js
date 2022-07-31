const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const ms = require("ms");
const Schema = require("../../utils/models/mute");

module.exports = {
  name: "mute",
  aliases: ["chup"],
  category: '🚫 Administration',
  memberpermissions: ['MUTE_MEMBERS'],
  description: 'Tắt tiếng thành viên trong một thời gian nhất định!',
  useage: 'mute @User <Time+Format(e.g: 10m)> [lý do]',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MUTE_MEMBERS"))
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**Bạn chưa có đủ quyền để tắt tiếng thành viên! - [ADMINISTRATOR]**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    // if not member
    let member = message.mentions.members.first();
    if (!member)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "Hãy nhắc tới ai đó để tắt tiếng! Cách dùng: `mute @User <Time+Format(e.g: 10m)> [LÝ DO]` Ví dụ như là: `mute @User 10m He/She is Abusing!`"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    args.shift(); //shift args

    // if role is same
    if (
      member.roles.highest.position >= message.member.roles.highest.position
    ) {
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              ":x: Tôi không thể tắt tiếng thành viên này bởi người đó có vai trò bằng hoặc cao hơn bạn!"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }

    // removing role
    if (!message.guild.me.permissions.has("MANAGE_ROLES"))
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**Tôi cần quyền, như là Quẩn Lý Vai Trò để thêm vai trò**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    // time
    let time = args[0];
    if (!time)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**Xin hãy thêm thời gian! Cách dùng: `mute @User ``<Time+Format(e.g: 10m)>`` [LÝ DO]` Ví dụ như là: `mute @User 10m He/She is Abusing`**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    args.shift();

    // reason

    let reason = args.join(" ");

    let allguildroles = message.guild.roles.cache.array();

    let mutedrole = false;
    for (let i = 0; i < allguildroles.length; i++) {
      if (allguildroles[i].name.toLowerCase().includes("Muted")) {
        mutedrole = allguildroles[i];
        break;
      }
    }

    if (!mutedrole) {
      if (!message.guild.me.permissions.has("MANAGE_GUILD"))
        return message.channel
          .send(
            new MessageEmbed()
              .setColor(ee.color)
              .setColor(ee.color)

              .setDescription(
                "**Tôi cần quyền, như là Quẩn Lý Vai Trò để thêm vai trò**"
              )
              .setFooter(
                client.user.displayAvatarURL({ dynamic: true }),
                ee.footertext
              )
          )
          .then((msg) => {
            msg.delete({ timeout: 5000 });
          });

      let highestrolepos = message.guild.me.roles.highest.position;
      console.log(Number(highestrolepos) - 1);
      mutedrole = await message.guild.roles
        .create({
          data: {
            name: "muted",
            color: "#222222", //grey color
            hoist: false, //hoist true
            position: Number(highestrolepos) - 1, //muted role under highest Bot Role!
            //permissions: ["SEND_MESSAGES"]
          },
          reason: "Vai trog này đã được tạo để tắt tiếng thành viên!",
        })
        .catch((e) => {
          console.log(e);
          message.channel
            .send(
              new MessageEmbed()
                .setColor(ee.color)
                .setColor(ee.color)

                .setDescription("**TÔI KHÔNG THỂ TẠO VAI TRÒ, xin lỗi**")
                .setFooter(
                  client.user.displayAvatarURL({ dynamic: true }),
                  ee.footertext
                )
            )
            .then((msg) => {
              msg.delete({ timeout: 5000 });
            });
        });
    }

    if (mutedrole.position > message.guild.me.roles.highest.position) {
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**:x: Tôi không thể truy cập vai trò bởi vì nó ở vị trí cao hơn tôi!**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }

    let mutetime;
    try {
      mutetime = ms(time);
    } catch {
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**Có lỗi xảy ra, xin vui lòng thêm thời gian! Cách dùng: `mute @User <Time+Format(e.g: 10m)> [LÝ DO]` Ví dụ như là: `mute @User 10m He is doing bad stuff!`**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }
    if (!mutetime || mutetime === undefined)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**Có lỗi xảy ra, xin vui lòng thêm thời gian! Cách dùng: `mute @User <Time+Format(e.g: 10m)> [LÝ DO]` Ví dụ như là: `mute @User 10m He is doing bad stuff!`**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    await message.guild.channels.cache.forEach((ch) => {
      try {
        ch.updateOverwrite(mutedrole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false,
          SPEAK: false,
        });
      } catch (e) {
        console.log(e);
      }
    });

    // mute add add

    try {
      member.roles.add(mutedrole);

      Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          new Schema({
            Guild: message.guild.id,
            Users: member.id,
          }).save();
        } else {
          data.Users.push(member.id);
          data.save();
        }
      });
    } catch {
      message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription("**Đã có lỗi xảy ra!**")
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }

    // send messages

    let embed = new MessageEmbed()
      .setColor(ee.color)
      .setColor(ee.color)
      .setTitle(`Đã tắt tiếng: \`${member.user.tag}\``)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(
        `By: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `He/you is now muted for \`${ms(mutetime, {
          long: true,
        })} Nói tới kiểm duyệt viên để tắt tiếng bạn...\`${reason ? `\n\n**LÝ DO**\n> ${reason.substr(0, 1800)}` : "\nKHÔNG CÓ LÝ DO"
        }`
      );
    message.channel.send(embed).catch((e) => console.log(e));

    member
      .send(embed.setTitle(`Bạn bị tắt tiếng bởi: \`${message.author.tag}\``))
      .catch((e) => console.log(e));

    setTimeout(() => {
      try {
        member.send(
          embed
            .setTitle(`Bạn được bỏ tắt tiếng: \`${member.user.tag}\``)
            .setDescription("\u200b")
        )
          .catch((e) => console.log(e));
        member.roles.remove(mutedrole);
      } catch {
        message.channel.send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)
            .setDescription("**Đã có lỗi xảy ra!**")
            .setFooter(ee.footertext)
        );
      }
    }, mutetime);
  },
};
