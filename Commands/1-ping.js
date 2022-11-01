module.exports = {
    "code": "ping","aliases": [], async run (client,message,args){
     
message.channel.send({content : `Ping : **${client.ws.ping}ms**`})  
  }};
