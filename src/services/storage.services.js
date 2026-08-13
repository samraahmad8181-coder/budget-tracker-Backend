const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Upload image
const uploadImage = async (buffer, fileName) => {
    return await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName,
    });
};

// Delete image
const deleteImage = async (fileId) => {
    return await imagekit.files.delete(fileId);
};

module.exports = {
    uploadImage,
    deleteImage,
};