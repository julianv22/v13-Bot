exports.name = "command";
exports.aliases = ["cmd"]
exports.description = "⤷Command";
exports.ussage = `\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
    if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.ussage);
}