const { Client, Events, GatewayIntentBits, Partials, Collection, EmbedBuilder, ActivityType } = require("discord.js");
//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.
const client = global.client = new Client({
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent, //Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.
  ],
});
const config = require('./config.json')
const moment = require('moment')
const mongoose = require('mongoose')
const fs = require('node:fs');
require("moment-duration-format");
require("moment-timezone");
moment.locale("tr");
client.once("ready", async () => {
  client.user.setStatus('dnd');
  console.log("Bot Başarıyla giriş yaptı!")

  console.log(client.user.username + ' aktif!')
});

mongoose.connect(config.mongodburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.log("MongoDB'ye Bağlanamadı."))
mongoose.connection.on("open", async () => {
  console.log("[MongoDB] bağlantısı kuruldu!")
})
mongoose.connection.on('error', (err) => {
  console.log(`[Mongoose Error]: ${err}`);
});
client.commands = new Collection();
const { readdirSync } = require("fs");
const { join } = require("path");

const commandFiles = readdirSync(join(__dirname, "Commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(join(__dirname, "Commands", `${file}`));
  client.commands.set(command.code, command)
  console.log('[ ' + command.code + ' ] adlı komut başarıyla çalışıyor.');
}

readdirSync("./Events").filter(file => file.endsWith(".js")).forEach(file => {
  let event = require(`./Events/${file}`);
  client.on(event.conf.event, event.execute);
  console.log(` { ${file.replace(".js", "")} } adlı event başarıyla çalışıyor.`);
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    var cmd = client.commands.get(command)
    if (!cmd) return;
    try { cmd.run(client, message, args, config); } catch (error) { console.error(error); }

  }
});
client.on("disconnect", () => console.log("Bot bağlantısı kesildi"))
client.on("reconnecting", () => console.log("Bot tekrar bağlanıyor..."))
client.on("error", e => console.log(e))
client.on("warn", info => console.log(info));
client.login(config.token);
//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.
