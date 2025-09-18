const ImageKit = require("imagekit");
const axios = require("axios");
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

async function uploadFile(file, fileName) {
  const result = await imagekit.upload({
    file: file,
    fileName: fileName,
  });

  return result;
}

async function deleteFromImageKit(fileId) {
  if (!fileId) return;
  try {
    await axios.delete(`https://api.imagekit.io/v1/files/${fileId}`, {
      auth: {
        username: process.env.IMAGEKIT_PRIVATE_KEY,
        password: "",
      },
    });
    console.log("✅ File deleted from ImageKit:", fileId);
  } catch (error) {
    console.warn("⚠️ Failed deleting from ImageKit:", error.message);
  }
}
module.exports = {
  uploadFile,
  deleteFromImageKit,
};