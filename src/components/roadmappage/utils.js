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
 * OpenAI 파일 ID 반환
 * @returns {string|null} careerFileId
 */
export function getCareerFileId() {
  return openaiFiles?.careerFileId || null;
}

/**
 * AI를 사용하여 targetJob과 careerData.json을 기반으로 각 activityType에 맞는 항목을 1개씩 반환한다.
 * @param {string} targetJob - 희망 직무
 * @param {string[]} activityTypes - 선택한 활동 타입 배열 (예: ["competition", "certification", "internship"])
 * @returns {Promise<Array<{id: string, type: string, typeId: string, label: string, startYear?: number, startMonth?: number, endYear?: number, endMonth?: number}>>}
 */
/**
 * careerData.json을 기반으로 각 activityType별로 1개씩 활동을 선택하여 반환
 * @param {string} targetJob - 희망 직무
 * @param {string[]} activityTypes - 선택한 활동 타입 배열
 * @returns {Promise<Array>} 각 타입별로 1개씩 선택된 활동 배열
 */
export async function getAIRecommendedActivities(targetJob, activityTypes) {
  if (!activityTypes || activityTypes.length === 0) {
    return [];
  }

  // 풀스택 개발자의 경우 frontend와 backend 데이터를 합침
  let relevantData = {};
  let availableActivityTypes = [];

  if (targetJob === "풀스택 개발자") {
    const frontendData = careerData.frontend;
    const backendData = careerData.backend;

    if (!frontendData && !backendData) {
      return [];
    }

    // 각 activityType별로 frontend와 backend 데이터를 합침
    for (const activityType of activityTypes) {
      const frontendList = frontendData?.[activityType] || [];
      const backendList = backendData?.[activityType] || [];
      const combinedList = [...frontendList, ...backendList];

      if (combinedList.length > 0) {
        relevantData[activityType] = combinedList;
        availableActivityTypes.push(activityType);
      }
    }
  } else {
    const careerKey = mapTargetJobToCareerKey(targetJob);
    if (!careerKey) {
      return [];
    }

    const jobData = careerData[careerKey];
    if (!jobData) {
      return [];
    }

    availableActivityTypes = activityTypes.filter(activityType =>
      jobData[activityType] && Array.isArray(jobData[activityType]) && jobData[activityType].length > 0
    );

    if (availableActivityTypes.length === 0) {
      return [];
    }

    for (const activityType of availableActivityTypes) {
      if (jobData[activityType] && Array.isArray(jobData[activityType])) {
        relevantData[activityType] = jobData[activityType];
      }
    }
  }

  if (Object.keys(relevantData).length === 0) {
    return [];
  }

  /**
   * 각 activityType별로 직접 1개씩 선택
   */
  const selectOnePerType = () => {
    const currentYear = new Date().getFullYear();
    const result = [];

    for (const activityType of availableActivityTypes) {
      const typeData = relevantData[activityType];
      if (!typeData || !Array.isArray(typeData) || typeData.length === 0) {
        continue;
      }

      const selectedItem = getRandomItem(typeData) || typeData[0];
      if (!selectedItem) {
        continue;
      }

      result.push({
        id: `ai-${activityType}-${Date.now()}-${Math.random()}`,
        type: activityType,
        typeId: activityType,
        label: selectedItem.label,
        title: selectedItem.label,
        startYear: selectedItem.startYear ?? currentYear,
        startMonth: selectedItem.startMonth ?? 1,
        endYear: selectedItem.endYear ?? currentYear,
        endMonth: selectedItem.endMonth ?? 12,
      });
    }

    return result;
  };

  return selectOnePerType();
}

/**
 * 타겟 직무와 활동 타입에 맞는 기본 활동을 생성 (랜덤 선택)
 * @param {string} targetJob - 희망 직무
 * @param {string[]} activityTypes - 활동 타입 배열
 * @returns {Array} 각 타입별로 1개씩 선택된 활동 배열
 */
export function getDefaultActivitiesForTargetJobWithTypes(targetJob, activityTypes) {
  if (!activityTypes || activityTypes.length === 0) {
    return [];
  }

  const result = [];
  const currentYear = new Date().getFullYear();

  // 풀스택 개발자의 경우 frontend와 backend 데이터를 합침
  if (targetJob === "풀스택 개발자") {
    const frontendData = careerData.frontend;
    const backendData = careerData.backend;

    for (const activityType of activityTypes) {
      const frontendList = frontendData?.[activityType] || [];
      const backendList = backendData?.[activityType] || [];
      const combinedList = [...frontendList, ...backendList];

      if (combinedList.length === 0) {
        continue;
      }

      const picked = getRandomItem(combinedList);
      if (!picked) continue;

      result.push({
        id: `${activityType}-${Date.now()}-${Math.random()}`,
        type: activityType,
        typeId: activityType,
        label: picked.label,
        title: picked.label,
        startYear: picked.startYear ?? currentYear,
        startMonth: picked.startMonth ?? 1,
        endYear: picked.endYear ?? currentYear,
        endMonth: picked.endMonth ?? 12,
      });
    }
  } else {
    const careerKey = mapTargetJobToCareerKey(targetJob);
    if (!careerKey) {
      return [];
    }

    const jobData = careerData[careerKey];
    if (!jobData) {
      return [];
    }

    for (const activityType of activityTypes) {
      const list = jobData[activityType];
      if (!list || !Array.isArray(list) || list.length === 0) {
        continue;
      }

      const picked = getRandomItem(list);
      if (!picked) continue;

      result.push({
        id: `${activityType}-${Date.now()}-${Math.random()}`,
        type: activityType,
        typeId: activityType,
        label: picked.label,
        title: picked.label,
        startYear: picked.startYear ?? currentYear,
        startMonth: picked.startMonth ?? 1,
        endYear: picked.endYear ?? currentYear,
        endMonth: picked.endMonth ?? 12,
      });
    }
  }

  return result;
}
