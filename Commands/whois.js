const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const cmdHelp = require("../Functions/cmdHelp")

exports.name = "whois"
//exports.aliases = [""]
exports.description = `⤷Xem thông tin thành viên (vi).`
exports.ussage = `Xem thông tin của thành viên (vi): \n\`${cfg.prefix}${exports.name} @tên thành viên\``

exports.callback = (client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') return cmdHelp(message, exports.name, exports.ussage)

    let user = message.mentions.users.first() || message.author
    let member = message.mentions.members.first()
    if (!member) {
      return message.reply(`${cfg.erroremoji} | Cú pháp: \`${cfg.prefix}whois @tên thành viên\``)
    }
    var acknowledgements = "";
    if (member.id == message.guild.ownerId) { acknowledgements = "Chủ sở hữu" }
    if (member.premiumSince) {
      // If there was an acknowledgement, add a comma
      if (acknowledgements.length > 0) {
        acknowledgements += ", Server Booster"
      } else { acknowledgements = "Server Booster" }
    }
    // If no acknowledgement, set it to None
    if (!acknowledgements) { acknowledgements = "Không có" }
    const embed = new MessageEmbed()
      .setColor(cfg.embedcolor)
      .setTitle("Thông tin thành viên")
      .setDescription(`**Tên thành viên:** ${user}`)
      .setAuthor({
        name: member.user.tag,
        iconURL: member.displayAvatarURL(true),
      })
      .setThumbnail(user.displayAvatarURL(true))
      .addFields(
        { name: "Ngày tham gia server", value: `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm")}`, inline: true },
        { name: "Ngày tạo tài khoản", value: `${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm")}`, inline: true },
        { name: "User ID", value: `${user.id}`, inline: true }
      )
      .addField("Chức danh", `${acknowledgements}`, true)
      .addField(
        `Vai trò [${member.roles.cache
          .filter((r) => r.id !== message.guild.id)
          .map((roles) => `\`${roles.name}\``).length
        }]`,
        `${member.roles.cache
          .filter((r) => r.id !== message.guild.id)
          .map((roles) => `<@&${roles.id}>`)
          .join(" ") || "No Roles"
        }`
      )
      .setFooter(`Requested by ${message.member.user.tag}`, `${message.member.displayAvatarURL(true)}`)
      .setTimestamp()
    message.reply({ embeds: [embed] })

    throw Error
  } catch (error) {
    console.error(error);
  }
}