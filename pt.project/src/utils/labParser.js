function toNumber(str) {
    if (!str) return null;
    const n = Number(String(str).replace(/[, ]+/g, "").replace(/[^d.-]/g, ""));
     return Number.isFinite(n) ? n : null;
}

function matchOne(regex, text) {
  const m = regex.exec(text);
  return m && m[1] ? m[1].trim() : null;
}


function parseLabText(text = "") {
  const t = text.replace(/\u00A0/g, " ");
  const out = {};

  out.Hemoglobin = toNumber(matchOne(/hemoglobin[^0-9\-]*([0-9.,]+)/i, t));
  out.HCT = toNumber(matchOne(/hematocrit|hct[^0-9\-]*([0-9.,]+)/i, t));
  out.WBC = toNumber(matchOne(/\bWBC\b[^0-9\-]*([0-9.,]+)/i, t));
  out.RBC = toNumber(matchOne(/\bRBC\b[^0-9\-]*([0-9.,]+)/i, t));
  out.Platelets = toNumber(matchOne(/platelet[s]?\b[^0-9\-]*([0-9.,]+)/i, t));

  out.Glucose = toNumber(matchOne(/glucose[^0-9\-]*([0-9.,]+)/i, t));
  out.Cholesterol_Total = toNumber(matchOne(/(total\s+cholesterol|cholesterol\s+total)[^0-9\-]*([0-9.,]+)/i, t))
                          || toNumber(matchOne(/\bcholesterol\b[^0-9\-]*([0-9.,]+)/i, t));
  out.LDL = toNumber(matchOne(/\bLDL\b[^0-9\-]*([0-9.,]+)/i, t));
  out.HDL = toNumber(matchOne(/\bHDL\b[^0-9\-]*([0-9.,]+)/i, t));
  out.Triglycerides = toNumber(matchOne(/triglyceride[s]?\b[^0-9\-]*([0-9.,]+)/i, t));


  
  Object.keys(out).forEach(k => (out[k] == null) && delete out[k]);
  return out;
}


module.exports = { parseLabText };
