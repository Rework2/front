import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import openaiClient from "../src/components/roadmappage/openaiClient.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAREER_DATA_PATH = path.resolve(process.cwd(), "src/components/roadmappage/careerData.json");
const OUTPUT_CONFIG_PATH = path.resolve(process.cwd(), "src/components/roadmappage/openaiFiles.json");

async function uploadCareerDataFile() {
  const stream = fs.createReadStream(CAREER_DATA_PATH);

  const file = await openaiClient.files.create({
    file: stream,
    purpose: "assistants",
  });

  saveCareerFileId(file.id);
  return file.id;
}

function saveCareerFileId(fileId) {
  const payload = {
    careerFileId: fileId,
    updatedAt: new Date().toISOString(),
  };
  
  const configDir = path.dirname(OUTPUT_CONFIG_PATH);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_CONFIG_PATH, JSON.stringify(payload, null, 2));
}

export function getCareerFileId() {
  try {
    const raw = fs.readFileSync(OUTPUT_CONFIG_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed.careerFileId || null;
  } catch {
    return null;
  }
}

async function main() {
  try {
    console.log("업로드 중...");
    const fileId = await uploadCareerDataFile();
    console.log("✅ 업로드 완료!");
    console.log("📁 File ID:", fileId);
    console.log("💾 저장 위치:", OUTPUT_CONFIG_PATH);
  } catch (error) {
    console.error("❌ 업로드 실패:", error.message);
    if (error.response) {
      console.error("상세:", error.response.data);
    }
    process.exitCode = 1;
  }
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}

