const { Client, Events, GatewayIntentBits, Partials, Collection, EmbedBuilder, ActivityType } = require("discord.js");
const client = global.client;//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.
const moment = require('moment')//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.
moment.locale("tr")//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.
exports.execute = async (message) => {
//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.
  client.user.setActivity("rainybey aşkını", { type: ActivityType.Listening });//Bu kısım bot dinliyor kısmı kendine göre ayarla dostum.
  console.log(client.user.username + ' aktif!')
  const { joinVoiceChannel } = require('@discordjs/voice');
  var JoinChannel = client.channels.cache.get("SES_KANAL_ID");

  if (JoinChannel) {//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.

    const connection = joinVoiceChannel({
      channelId: JoinChannel.id,
      guildId: JoinChannel.guild.id,
      adapterCreator: JoinChannel.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false
    });//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.
  } else {
    console.log("Bot failed to login to a voice channel")
  }//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.
};
exports.conf = {
  event: "ready"
};//Bu Bot råiny.ٴ#0001 tarafından hazırlanmıştır.