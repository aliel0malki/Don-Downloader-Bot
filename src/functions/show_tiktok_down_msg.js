const showVidMsg = async (data, ctx, bot) => {
  if (data.result.is_video) {
    await ctx.replyWithPhoto({ url: data.result.cover });
    // ctx.reply(`*Download TikTok Video*\n - Author: ${data.author}`)
    const keyboard = [
      [
        {
          text: "Download Video",
          callback_data: "download_video",
        },
      ],
      [
        {
          text: "Download Music",
          callback_data: "download_music",
        },
      ],
    ];
    try {
      await bot.telegram.sendMessage(
        ctx.chat.id,
        `<strong>Download TikTok Video or Music 🤔</strong>\n~~~~~~~~~~~~~~~~~~~~\n<b>Author: </b>${data.result.author.nickname}\n~~~~~~~~~~~~~~~~~~~~\n<b>UserName: </b>${data.result.author.username}\n~~~~~~~~~~~~~~~~~~~~\n<b>Caption: </b>${data.result.caption}\n~~~~~~~~~~~~~~~~~~~~\n<b>ID: </b>${data.result.stats.aweme_id}\n~~~~~~~~~~~~~~~~~~~~\n<b>Music: </b>${data.result.music.title}\n\n~~~~~~~~~~~~~~~~~~~~\n\nPress on "Download Video" to send video.\n~~~~~~~~~~~~~~~~~~~~\nPress on "Download Music" to send music.`,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: keyboard,
          },
        }
      );
    } catch (err) {
      ctx.reply(
        "⛔️ Failed... problem in your link, try again later\nError >\n" + err
      );
    }
    // Register download_video callback function
    bot.action("download_video", async (ctx) => {
      // Download the TikTok video and save it to the user's device.
      const video_url = data.result.media;
      console.log("info video is ready");
      ctx.reply("♻️ wait...");
      try {
        await ctx.replyWithVideo({
          url: video_url,
        });
        ctx.answerCbQuery();
        // Edit the message that was sent with the inline keyboard.
        ctx.reply("✅️ You can download it");
      } catch (err) {
        ctx.reply("⛔️ Failed... try again later\nError >\n" + err);
      }
    });
    // Register download_music callback function
    bot.action("download_music", async (ctx) => {
      // Download the TikTok video and save it to the user's device.
      const music_url = data.result.music.url;
      console.log("info music is ready");
      ctx.reply("♻️ wait...");
      try {
        await ctx.replyWithAudio({
          url: music_url,
        });
        ctx.answerCbQuery();
        // Edit the message that was sent with the inline keyboard.
        ctx.reply("✅️ Now.. You can download");
      } catch (err) {
        ctx.reply("⛔️ Failed... try again later\nError >\n" + err);
      }
    });
  } else {
    ctx.reply("⛔️ Failed...\n That is not a video link.");
  }
};

module.exports = { showVidMsg };
