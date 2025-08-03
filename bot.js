const mineflayer = require('mineflayer');

const PASSWORD = process.env.MC_PASSWORD || '';

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
    function return_user(msg) {
        let no_rank_message = '';
        let get_username = '';

        if (msg.startsWith('[')) {
            no_rank_message = msg.split(']')[1];
            get_username = no_rank_message.split('»')[0];
        } else if (msg.includes('whispers')) {
            get_username = msg.split('whispers')[0];
        } else {
            get_username = msg.split('»')[0];
        }

        return get_username?.trim() || '';
    }

    if (return_user(message) === 'Damix2131' && message.includes("come catstar")) {
      bot.chat('/tpa Damix2131')
    }
  })
  
  bot.on('end', () => {
    console.log('🔄 Disconnected — reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => console.log('❗ Error:', err));
}

createBot();
