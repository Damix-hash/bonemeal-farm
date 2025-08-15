const mineflayer = require('mineflayer');

const PASSWORD = process.env.MC_PASSWORD;
const possible_anwsers = {
  "Unscramble: TINREHHE": "thermite",
  "What block can't be destroyed by TNT?": "obsidian",
  //"": "enderman",
  //"": "kreit", //?
  "Unscramble: TNERD": "render",
  "1, 3, 5, 7, ?": "9",
  "Say: Redstone rules": "redstone rules",
  "I'm red, I'm dust": "redstone",
  "2, 4, 8, ?": "16",
  //"": "build",
  "TNT can't break what?": "bedrock", // It's the strongest block in the game
  "1, 3, 5, ?": "7",
  "Unscramble: NIT": "tin",
  "Unscramble: LAV": "val",
  "I can be red or blue, but I'm not a dye. I can be found in the Overworld, but I'm not a tree. What am I?": "wool",
  "Unscramble: LAVAR": "lavar", // misspell LMAO
  //"": "rite",
  "Unscramble: KITS": "kits",
  "2, 4, 8, 16, 32, ?": "64",
  "Say: Anarchy builds": "anarchy builds"
}
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
    function getRightAnwser(message) {
      if (message.startsWith('[Prime] royalburner »')) {
        console.log(message)
        for (key in possible_anwsers) {
          if (message.includes(key)) {
            setTimeout(() => {
              bot.chat(possible_anwsers[key])
            }, Math.floor((Math.random() * 2000) + 1000))
          }
        }
      }
    }
    getRightAnwser(message)

    if (message.includes("royalburner wants to teleport to you.")) {
      bot.chat("/tpy royalburner")
    }

    if (message.includes("[Elite] Damix2131 » come catstar")) {
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
