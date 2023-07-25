const { TiktokDL } = require("@tobyg74/tiktok-api-dl");
const { shortenUrl } = require("./shorten_url");
const { isValidUrl } = require("./isValidUrl");
require("dotenv/config");

async function DownTikTokVid(ctx) {
  const msg = ctx.update.message.text;
  const url_msg = msg.slice(msg.indexOf(" ") + 1);
  console.log(url_msg);

  if (isValidUrl(url_msg)) {
    //  if (url_msg.startsWith("https://vm.tiktok.com")) {
    ctx.reply("♻️ Processing...");
    // Re-send the shortened link to the user
    try {
      const video_url = await TiktokDL(url_msg);
      const response = video_url.result;
      const shortenedUrl = await shortenUrl(response.video);
      // waiting message
      ctx.reply("♻️ Video URL Processing...");
      ctx.reply(shortenedUrl);
      ctx.reply("✅️ Your video URL here");
    } catch (error) {
      ctx.reply("⛔️ Failed... try again after 15 seconds..");
    }
  } else {
    ctx.reply("not valid url");
  }
  // }
}

module.exports = { DownTikTokVid };
