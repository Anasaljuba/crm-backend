const Resize = require("../models/Resize");
const uuid = require("uuid"); // Include the uuid library
const archiver = require("archiver");

// Create a new image
exports.createImage = async (req, res) => {
  try {
    // Generate a new ID if none is provided
    const galleryId = req.body.galleryId || uuid.v4();
    const newImage = new Resize({
      _id: new mongoose.Types.ObjectId(),
      resizedImage: req.file.path, // This should store "uploads/{filename}.jpg"
      galleryId: galleryId,
      galleryName: req.body.galleryName,
    });

    const savedImage = await newImage.save();

    res.json(savedImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all images
exports.getImages = async (req, res) => {
  try {
    const images = await Resize.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all images by galleryId
exports.getImagesByGallery = async (req, res) => {
  try {
    const images = await Resize.find({ galleryId: req.params.id });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Download all images by galleryId
exports.downloadImagesByGallery = async (req, res) => {
  try {
    const images = await Resize.find({ galleryId: req.params.id });

    // Create a ZIP file
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.on("error", function (err) {
      res.status(500).send({ error: err.message });
    });

    // Send the file to the output.
    res.attachment("images.zip");

    archive.pipe(res);

    images.forEach((image) => {
      // Here we should add files to the ZIP.
      // But it's unclear how you're storing images, so this is just a pseudo code
      const pathToTheImage = getPathToTheImageSomehow(image);
      archive.file(pathToTheImage, { name: getFileNameSomehow(image) });
    });

    archive.finalize();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all unique galleries
exports.getGalleries = async (req, res) => {
  try {
    const galleries = await Resize.aggregate([
      {
        $group: {
          _id: "$galleryId",
          name: { $first: "$galleryName" },
          thumbnail: { $first: "$resizedImage" },
        },
      },
    ]);
    res.json(galleries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
