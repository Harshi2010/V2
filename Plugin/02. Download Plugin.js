// 01. Song DL | 0005



const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const pdfUrl = 'https://i.ibb.co/2PLgSdj/Picsart-24-09-16-17-49-35-655.jpg';

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return https://www.youtube.com/watch?v=${videoId};
    }
    return q;
}

cmd({
    pattern: "song",
    desc: "To download songs.",
    react: "🎧",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `乂  𝖡 𝖧 𝖠 𝖲 𝖧 𝖨  𝖲 𝖮 𝖭 𝖦  𝖨 𝖭 𝖥 𝖮 𝖬 𝖠 𝖳 𝖨 𝖮 𝖭

*🎬 𝖢𝗁𝖺𝗇𝖾𝗅 :* ${data.author}
*📻 𝖵𝗂𝗐𝖾𝗌 :* ${data.views}
*📤 𝖴𝗉𝗅𝗈𝖺𝖽 𝖮𝗇 :* ${data.ago}
*🖇️ 𝖫𝗂𝗇𝗄 :* ${data.url}

乂  𝖱 𝖤 𝖯 𝖫 𝖸  𝖳 𝖧 𝖤  𝖮 𝖯 𝖳 𝖨 𝖮 𝖭

*1️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 :* 𝖠𝗎𝖽𝗂𝗈 𝖳𝗒𝗉𝖾.
*2️⃣  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 :* 𝖣𝗈𝖼𝗎𝗆𝖾𝗇𝗍 𝖳𝗒𝗉𝖾.`;






        
        // Send the initial message and store the message ID
        const sentMsg = await conn.sendMessage(from, {
            document: { url: pdfUrl }, // Path to your PDF file
            fileName: 'V2', // Filename for the document
            mimetype: "application/xmlf",
            fileLength: 99999999999999,
            caption: desc,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'B H A S H I',
                    newsletterJid: "",
                },
                externalAdReply: {
                    title: data.title,
                    body: data.ago,
                    thumbnailUrl: data.thumbnail, // Use the URL directly here
                    sourceUrl: 'www.google.com',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        const messageID = sentMsg.key.id; // Save the message ID for later reference

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                // React to the user's reply (the "1" or "2" message)
                await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

                if (messageType === '1' || messageType === '2') {
                    const down = await fg.yta(url);
                    const downloadUrl = down.dl_url;

                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

                    if (messageType === '1') {
                        // Handle option 1 (Audio File)
                        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
                    } else if (messageType === '2') {
                        // Handle option 2 (Document File)
                        await conn.sendMessage(from, {
                            document: { url: downloadUrl },
                            mimetype: "audio/mpeg",
                            fileName: ${data.title}.mp3,
                            caption: "> Qᴜᴇᴇɴ-ᴢᴀᴢɪᴇ-ᴍᴅ"
                        }, { quoted: mek });
                    }

                    // React to the successful completion of the task
                    await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

                    console.log("Response sent successfully");
                } else {
                    // Handle invalid input (not 1 or 2)
                    await conn.sendMessage(from, { react: { text: '❓', key: mek.key } });
                    reply("Type 1 or 2.");
                }
            }
        });

    } catch (e) {
        console.log(e);
        reply(${e});
    }
});
//
cmd({
    pattern: "video",
    desc: "To download videos.",
    react: "🎬",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `Tatile : ${data.title}

Viwes : ${data.views}
Duration : ${data.timestamp}
Time Ago : ${data.ago}
Url : ${data.url}

Select An Option.
1 • Video File.
2 • Document File.`;

        // Send the initial message and store the message ID
        const sentMsg = await conn.sendMessage(from, {
            document: { url: pdfUrl }, // Path to your PDF file
            fileName: 'V2', // Filename for the document
            mimetype: "application/xml",
            fileLength: 99999999999999,
            caption: desc,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'B H A S H I',
                    newsletterJid: "",
                },
                externalAdReply: {
                    title: data.title,
                    body: data.ago,
                    thumbnailUrl: data.thumbnail, // Use the URL directly here
                    sourceUrl: 'www.google.com',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        const messageID = sentMsg.key.id; // Save the message ID for later reference

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                // React to the user's reply (the "1" or "2" message)
                await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

                if (messageType === '1' || messageType === '2') {
                    const down = await fg.yta(url);
                    const downloadUrl = down.dl_url;

                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

                    if (messageType === '1') {
                        // Handle option 1 (Audio File)
                        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
                    } else if (messageType === '2') {
                        // Handle option 2 (Document File)
                        await conn.sendMessage(from, {
                            document: { url: downloadUrl },
                            mimetype: "video/mp4",
                            fileName: ${data.title}.mp4,
                            caption: "> Qᴜᴇᴇɴ-ᴢᴀᴢɪᴇ-ᴍᴅ"
                        }, { quoted: mek });
                    }

                    // React to the successful completion of the task
                    await conn.sendMessage(from, { react: { text: '✔', key: mek.key } });

                    console.log("Response sent successfully");
                } else {
                    // Handle invalid input (not 1 or 2)
                    await conn.sendMessage(from, { react: { text: '❓', key: mek.key } });
                    reply("Type 1 or 2.");
                }
            }
        });

    } catch (e) {
        console.log(e);
        reply(${e});
    }
});
