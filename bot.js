const mineflayer = require('mineflayer');

const PASSWORD = process.env.MC_PASSWORD;

function createBot() {
  const bot = mineflayer.createBot({
    host: 'eu.6b6t.org',
    port: 25565,
    username: 'CatStarLOL',
    version: '1.19.4'
  });

  bot.on('login', () => {
    console.log('✅ Logged in');
    if (PASSWORD) {
      bot.chat(`/l ${PASSWORD}`);
    }
    setInterval(() => {
      bot.setControlState('forward', true);
    }, 50);
  });

  bot.on('messagestr', (message) => {
    console.log(message)

    if (message.includes("Damix2131") && message.includes("come catstar")) {
      bot.chat("/tpa Damix2131")
    }
  })

  bot.on('end', () => {
    console.log('🔄 Disconnected — reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log('❗ Error:', err));
}

createBot();
