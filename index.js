const UTC1_OFFSET_MS = -(60 * 60 * 1000);
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MS_PER_BEAT = MS_IN_DAY / 1000;

function swatchTime(now = new Date()) {
  const startOfBeatsDayMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0) + UTC1_OFFSET_MS;
  const nowMs = now.getTime();
  const elapsedMs = (nowMs - startOfBeatsDayMs) % MS_IN_DAY;
  const beats = elapsedMs / MS_PER_BEAT;
  return beats;
}

// load environment
require('dotenv').config()
const token = process.env.TOKEN;

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'beat') {
    await interaction.reply('The current .beat time is @' + swatchTime().toFixed(3) + '.');
  }
});

// Login to Discord with your client's token
client.login(token);