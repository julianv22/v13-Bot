exports.name = "ping";
// exports.aliases = []
exports.description = "⤷Ping Pong!";
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
    if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.ussage);    
    await message.reply(`**⏱ | Ping:** ${client.ws.ping}`);
}