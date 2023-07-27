// const { TiktokDL } = require("@tobyg74/tiktok-api-dl");
const tik = require("tiktod");
// const { shortenUrl } = require("./shorten_url");
const { isValidUrl } = require("./isValidUrl");
const { showVidMsg } = require("./show_tiktok_down_msg")
require("dotenv/config");

async function DownTikTokVid(ctx, bot) {
  const msg = ctx.update.message.text;
  const url_msg = msg.slice(msg.indexOf(" ") + 1);
  
  if (isValidUrl(url_msg)) {
    //  if (url_msg.startsWith("https://vm.tiktok.com")) {
    console.log(`${url_msg} is a valid TikTok video URL`);
    ctx.reply("♻️ Processing...");
    // Re-send the shortened link to the user

    tik.download(url_msg).then(data => {
      // pass the data & ctx to another func
      showVidMsg(data, ctx, bot)
      }).catch(err => ctx.reply("⛔️ Failed... try again after 20 seconds..\n" + err)
    )
  } else {
    ctx.reply("not valid url");
    console.log(`${url_msg} is not a valid TikTok video URL`);
  }
}

module.exports = { DownTikTokVid };
