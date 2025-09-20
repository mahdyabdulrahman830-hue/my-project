const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  
  {
    filename: { type: String, required: true},
    originalName: {type: String, required: true},
    mimetype: {type: String, required: true},
    size: {type: Number, required: true},
    patientId: {type: String}, 
    docType: {
        type: String,
        enum: ["lab", "radiology", "report", "other"]
        
    },
testDate: {type: Date },
notes: {type:String},


 ocrText: { type: String }, // النص الخام بعد OCR
  parsedData: { type: mongoose.Schema.Types.Mixed }, // JSON منظم
},{timestamps: true}
);

module.exports = mongoose.model("File", fileSchema);