import { MONTH_LABELS } from "./constants";
import careerData from "./careerData.json";
import openaiFiles from "./openaiFiles.json";

/**
 * 월 번호를 월 레이블로 변환
 * @param {number} monthNumber - 월 번호 (1-12)
 * @returns {string} 월 레이블
 */
export const getMonthLabel = (monthNumber) => MONTH_LABELS[monthNumber - 1] || "";

/**
 * 기간을 포맷팅 (시작연도/월 - 종료연도/월)
 * 시작월과 종료월이 같으면 하나의 월만 반환
 * @param {number} startYear - 시작연도
 * @param {number} startMonth - 시작월
 * @param {number} endYear - 종료연도
 * @param {number} endMonth - 종료월
 * @returns {string} 포맷팅된 기간 문자열
 */
export const formatPeriod = (startYear, startMonth, endYear, endMonth) => {
  const startLabel = getMonthLabel(startMonth);
  const endLabel = getMonthLabel(endMonth);
  
  if (startYear === endYear && startMonth === endMonth) {
    return `${startYear}. ${startLabel}`;
  }
  
  if (startYear === endYear) {
    return `${startYear}. ${startLabel} - ${endLabel}`;
  }
  
  return `${startYear}. ${startLabel} - ${endYear}. ${endLabel}`;
};

/**
 * 랜덤 파스텔 색상 생성
 * HSL 색상 공간을 사용하여 파스텔 톤의 색상을 생성
 * @returns {string} HSL 색상 문자열
 */
export const generatePastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

/**
 * 문자열을 슬러그로 변환
 * URL이나 ID에 사용할 수 있는 형태로 변환 (소문자, 하이픈 구분)
 * @param {string} value - 변환할 문자열
 * @returns {string} 슬러그 문자열
 */
export const createSlug = (value) => {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
  return base || "custom-type";
};

/**
 * targetJob 문자열을 career JSON 키로 매핑한다.
 * @param {string} targetJob
 * @returns {"frontend"|"backend"|"data_scientist"|"ai_ml_engineer"|null}
 */
export function mapTargetJobToCareerKey(targetJob) {
  switch (targetJob) {
    case "프론트엔드 개발자":
      return "frontend";
    case "백엔드 개발자":
      return "backend";
    case "데이터 사이언티스트":
      return "data_scientist";
    case "AI/ML 엔지니어":
      return "ai_ml_engineer";
    case "풀스택 개발자":
      return "backend";
    default:
      return null;
  }
}

/**
 * 배열에서 임의의 항목을 1개 반환한다.
 * @template T
 * @param {T[]} arr
 * @returns {T|null}
 */
export function getRandomItem(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * 타겟 직무에 맞는 기본 활동을 생성한다.
 * competition / certification / extracurricular / internship 만 자동 생성한다.
 * @param {string} targetJob
 * @returns {Array<{id: string, type: string, label: string, startYear?: number|string, startMonth?: number|string, endYear?: number|string, endMonth?: number|string}>}
 */
export function getDefaultActivitiesForTargetJob(targetJob) {
  const careerKey = mapTargetJobToCareerKey(targetJob);
  if (!careerKey) {
    return [];
  }

  const jobData = careerData[careerKey];
  if (!jobData) {
    return [];
  }

  /** @type {("competition"|"certification"|"extracurricular"|"internship")[]} */
  const candidateIds = ["competition", "certification", "extracurricular", "internship"];
  /** @type {Array<{id: string, type: string, label: string, startYear?: number|string, startMonth?: number|string, endYear?: number|string, endMonth?: number|string}>} */
  const result = [];

  for (const id of candidateIds) {
    const list = jobData[id];
    if (!list || list.length === 0) continue;

    const picked = getRandomItem(list);
    if (!picked) continue;

    result.push({
      id,
      type: id,
      label: picked.label,
      startYear: picked.startYear ?? "",
      startMonth: picked.startMonth ?? "",
      endYear: picked.endYear ?? "",
      endMonth: picked.endMonth ?? "",
    });
  }

  return result;
}

export function getCareerFileId() {
  return openaiFiles?.careerFileId || null;
}
