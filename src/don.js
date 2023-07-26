// Import Libs
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv/config");
// Import FuNCtiOns
const { DownTikTokVid } = require("./functions/tiktok_video");

// IMPORT SERVER FUNCTIONS
const { server } = require("./server");

// RUN EXPRESS SERVER
server();

// inshlizlize Bot
const bot = new Telegraf(process.env["BOT_TOKEN"]);

// SETUP Commands
const commands = [
  {
    command: "start",
    description: "active bot",
    regexp: /\/start/,
  },
  {
    command: "check",
    description: "check bot status",
    regexp: /\/check/,
  },
  {
    command: "tiktok",
    description: "download TikTok video",
    regexp: /\/tiktok/,
  },
  {
    command: "youtube",
    description: "download YouTube video",
    regexp: /\/youtube/,
  },
  {
    command: "insta",
    description: "download Instagram reel",
    regexp: /\/insta/,
  },
];

// EVENTS
bot.start((ctx) => ctx.reply("SeND /help to KNoW HOw tO UsE."));
bot.hears("/check", (ctx) => ctx.reply("Working ✅️"));
bot.help((ctx) =>
  ctx.reply(
    "HoW To USe @DonDownloader_bot 👑\n\nFiRSt THiNG /check to CheCk The StaTus & FuNCtiOns.\n\n~ PUt ThE LiNk iN (URL) PlaCE\n\n/start To Polling The Server\n----------------------------------------\n/tiktok (URL) To Download Tik Tok Video\n----------------------------------------\n/youtube (URL) To Download YouTube Video 720p\n----------------------------------------\n/insta (URL) To Download Instagram Reel\n\n - @a_7kmah"
  )
);
// SEND TIKTOK VIDEO
bot.on("message", async (ctx) => {
  const msg = ctx.update.message.text;
  if (msg.startsWith("/tiktok")) {
    DownTikTokVid(ctx);
  }
});

// functions

// SET Commands
bot.telegram.setMyCommands(commands);
// POLLING THE BOT
bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
