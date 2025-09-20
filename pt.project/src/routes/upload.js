

// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const pdfParse = require("pdf-parse");
// const { fromPath } = require("pdf2pic");
// const Tesseract = require("tesseract.js");
// const { PDFDocument } = require("pdf-lib");
// const File = require("../models/file");
// const { parseLabText } = require("../utils/labParser");

// const router = express.Router();

// // إعداد مكان التخزين
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../../uploads");
//     if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });

// // 🟢 OCR helper: يحول PDF لصور ويقرأها
// async function ocrPdfByImages(filePath) {
//   const fileBuffer = fs.readFileSync(filePath);
//   const pdfDoc = await PDFDocument.load(fileBuffer);
//   const totalPages = pdfDoc.getPageCount();
//   const converter = fromPath(filePath, { density: 300, savePath: "./uploads", format: "png" });

//   let text = "";
//   for (let i = 1; i <= totalPages; i++) {
//     try {
//       const image = await converter(i);
//       const res = await Tesseract.recognize(image.path, "eng+ara");
//       text += `\n--- Page ${i} ---\n` + (res?.data?.text || "");
//     } catch (err) {
//       console.warn("⚠️ OCR failed on page", i, err?.message || err);
//     }
//   }
//   return text.trim();
// }

// // 📌 POST - رفع ملف
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: "File is required" });

//     let extractedText = "";

//     if (req.file.mimetype === "application/pdf") {
//       try {
//         const fileBuffer = fs.readFileSync(req.file.path);
//         const pdfData = await pdfParse(fileBuffer);
//         extractedText = (pdfData && pdfData.text) ? pdfData.text.trim() : "";

//         if (!extractedText) {
//           extractedText = await ocrPdfByImages(req.file.path);
//         }
//       } catch (pdfErr) {
//         console.warn("❌ pdf-parse failed, fallback to OCR:", pdfErr.message || pdfErr);
//         extractedText = await ocrPdfByImages(req.file.path);
//       }
//     } else if (req.file.mimetype.startsWith("image/")) {
//       const result = await Tesseract.recognize(req.file.path, "eng+ara");
//       extractedText = result?.data?.text || "";
//     }

//     const parsed = extractedText ? parseLabText(extractedText) : {};

//     const newFile = new File({
//       filename: req.file.filename,
//       originalName: req.file.originalname,
//       mimetype: req.file.mimetype,
//       size: req.file.size,
//       patientId: req.body.patientId,
//       docType: req.body.docType,
//       testDate: req.body.testDate,
//       notes: req.body.notes,
//       ocrText: extractedText,
//       parsedData: parsed,
//     });
//     await newFile.save();

//     res.status(201).json({
//       message: "File uploaded & processed successfully",
//       file: newFile,
//       extractedText,
//       parsedData: parsed,
//     });
//   } catch (err) {
//     console.error("❌ Upload Error:", err);
//     res.status(500).json({ error: "Server error", message: err.message || String(err) });
//   }
// });

// // 📂 GET - رجّع كل الملفات
// router.get("/", async (req, res) => {
//   try {
//     const files = await File.find().sort({ createdAt: -1 });
//     res.json({ files });
//   } catch (err) {
//     console.error("GET /api/uploads Error:", err);
//     res.status(500).json({ error: "Server error", message: err.message });
//   }
// });

// // 📂 GET - رجّع ملف واحد بالـ ID
// router.get("/:id", async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     if (!file) return res.status(404).json({ error: "File not found" });
//     res.json(file);
//   } catch (err) {
//     console.error("GET /api/uploads/:id Error:", err);
//     res.status(500).json({ error: "Server error", message: err.message });
//   }
// });

// // 🗑️ DELETE - احذف ملف بالـ ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const file = await File.findByIdAndDelete(req.params.id);
//     if (!file) return res.status(404).json({ error: "File not found" });

//     const filePath = path.join(__dirname, "../../uploads", file.filename);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     res.json({ message: "File deleted successfully", file });
//   } catch (err) {
//     console.error("DELETE /api/uploads/:id Error:", err);
//     res.status(500).json({ error: "Server error", message: err.message });
//   }
// });

// module.exports = router;







const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const File = require("../models/file");
const pdfParse = require("pdf-parse");
const { PDFDocument } = require("pdf-lib");
const Tesseract = require("tesseract.js");
const { parseLabText } = require("../utils/labParser");

const router = express.Router();

// مكان التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });

// OCR helper
async function ocrPdfByImages(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(fileBuffer);
  const totalPages = pdfDoc.getPageCount();
  const { fromPath } = require("pdf2pic");
  const converter = fromPath(filePath, { density: 300, savePath: "./uploads", format: "png" });

  let text = "";
  for (let i = 1; i <= totalPages; i++) {
    try {
      const image = await converter(i);
      const res = await Tesseract.recognize(image.path, "eng+ara");
      text += `\n--- Page ${i} ---\n` + (res?.data?.text || "");
    } catch (err) {
      console.warn("OCR failed on page", i, err?.message || err);
    }
  }
  return text.trim();
}

// رفع ملف
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File is required" });

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      try {
        const fileBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(fileBuffer);
        extractedText = (pdfData && pdfData.text) ? pdfData.text.trim() : "";
        if (!extractedText) {
          extractedText = await ocrPdfByImages(req.file.path);
        }
      } catch {
        extractedText = await ocrPdfByImages(req.file.path);
      }
    } else if (req.file.mimetype.startsWith("image/")) {
      const result = await Tesseract.recognize(req.file.path, "eng+ara");
      extractedText = result?.data?.text || "";
    }

    const parsed = extractedText ? parseLabText(extractedText) : {};

    const newFile = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      patientId: req.body.patientId,
      docType: req.body.docType,
      testDate: req.body.testDate,
      notes: req.body.notes,
      ocrText: extractedText,
      parsedData: parsed,
    });
    await newFile.save();

    res.status(201).json({
      message: "File uploaded & processed successfully",
      file: newFile,
      extractedText,
      parsedData: parsed,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Server error", message: err.message || String(err) });
  }
});

// جميع الملفات
router.get("/", async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

module.exports = router;
