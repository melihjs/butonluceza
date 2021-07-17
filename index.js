const { Client, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client();
client.commands = new Collection();
require('discord-buttons')(client);

client.on('ready', async () => console.log('ready'));

client.on('message', async (message) => {
  var prefix = "prefix";
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  var cmd = client.commands.get(command);
  if (!cmd) return;
  cmd.command.exe(client, message, args);
});

fs.readdir('./komutlar/', (err, files) => {
  if (err) throw new Error(err);
  files.forEach(f => {
    let cmd = require(`./komutlar/${f}`);
    client.commands.set(cmd.command.name, cmd);
  });
});

client.login("token");