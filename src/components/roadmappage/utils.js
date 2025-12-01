import { MONTH_LABELS } from "./constants";
import careerData from "./careerData.json";
import openaiFiles from "./openaiFiles.json";

export const getMonthLabel = (monthNumber) => MONTH_LABELS[monthNumber - 1] || "";

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

export const generatePastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

export const createSlug = (value) => {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
  return base || "custom-type";
};

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

export function getRandomItem(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function getCurrentUserId() {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.id;
    }
  } catch (e) {
    console.error("Failed to get user ID:", e);
  }
  return null;
}

export function getOnboardingData() {
  try {
    const onboardingData = localStorage.getItem("rework_onboarding");
    if (onboardingData) {
      const parsed = JSON.parse(onboardingData);
      return parsed.formData || {};
    }
  } catch (e) {
    console.error("Failed to parse onboarding data:", e);
  }
  return {};
}

export async function getAIRecommendedActivities(targetJob, activityTypes) {
  if (!activityTypes || activityTypes.length === 0) {
    return [];
  }

  let relevantData = {};
  let availableActivityTypes = [];

  if (targetJob === "풀스택 개발자") {
    const frontendData = careerData.frontend;
    const backendData = careerData.backend;

    if (!frontendData && !backendData) {
      return [];
    }

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

export function getDefaultActivitiesForTargetJobWithTypes(targetJob, activityTypes) {
  if (!activityTypes || activityTypes.length === 0) {
    return [];
  }

  const result = [];
  const currentYear = new Date().getFullYear();

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
