import { useState, useEffect } from "react";
import { roadmapApi } from "../api/roadmap";
import { activities as mockActivities, evidenceFiles as mockFiles } from "../components/Activity/moi";
import careerData from "../components/roadmappage/careerData.json";

const ONBOARDING_STORAGE_KEY = "rework_onboarding";
const ACTIVITY_STORAGE_KEY = "activities";
const FILES_STORAGE_KEY = "files";
const INSIGHTS_STORAGE_KEY = "activity_insights";
const ROADMAP_STORAGE_KEY = "roadmap_activities_db";

// 현재 로그인한 사용자의 ID를 가져옴
const getCurrentUserId = () => {
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
};

// 사용자별 스토리지 키를 생성 (멀티 유저 지원)
const getStorageKey = (baseKey) => {
    const userId = getCurrentUserId();
    return userId ? `${baseKey}_${userId}` : baseKey;
};

// 로컬 스토리지에서 데이터를 불러옴
const loadFromStorage = (key, defaultValue = null) => {
    try {
        const storageKey = getStorageKey(key);
        const saved = localStorage.getItem(storageKey);
        if (saved === "undefined") return defaultValue;
        return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
        console.error(`Failed to load ${key}:`, e);
        return defaultValue;
    }
};

// 로드맵 API 데이터를 앱 내부 활동 데이터 형식으로 변환
const convertRoadmapToActivity = (roadmapActivities) => {
    const categorized = {
        planned: [],
        inProgress: [],
        completed: []
    };

    if (!roadmapActivities || roadmapActivities.length === 0) {
        return categorized;
    }

    const now = new Date();
    const activityTypeMap = {
        "competition": "공모전/대회",
        "certification": "자격증",
        "project": "개인/팀 프로젝트",
        "extracurricular": "대외활동",
        "internship": "인턴십",
        "study": "스터디/동아리"
    };

    roadmapActivities.forEach(roadmapActivity => {
        const type = roadmapActivity.type || roadmapActivity.typeId;
        const tag = activityTypeMap[type] || type;
        const startDate = new Date(roadmapActivity.startYear, roadmapActivity.startMonth - 1);
        const endDate = new Date(roadmapActivity.endYear, roadmapActivity.endMonth - 1);

        const activity = {
            id: roadmapActivity.id,
            title: roadmapActivity.label || roadmapActivity.title || `${tag} 활동`,
            tag: tag,
            categories: [tag],
            date: `${roadmapActivity.startYear}-${String(roadmapActivity.startMonth).padStart(2, '0')}-01`,
            files: 0,
            startYear: roadmapActivity.startYear,
            startMonth: roadmapActivity.startMonth,
            endYear: roadmapActivity.endYear,
            endMonth: roadmapActivity.endMonth,
            isAiRecommendation: !roadmapActivity.isUserCreated
        };

        if (startDate > now) {
            categorized.planned.push(activity);
        } else {
            // 과거 활동도 포함하여 모두 진행중으로 처리 (완료는 사용자가 직접 처리)
            categorized.inProgress.push(activity);
        }
    });

    return categorized;
};

const ACTIVITY_LABELS = {
    competition: "공모전/대회",
    certification: "자격증",
    project: "개인/팀 프로젝트",
    extracurricular: "대외활동",
    internship: "인턴십",
    study: "스터디/동아리"
};

const mapTargetJobToCareerKey = (targetJob) => {
    const mapping = {
        "프론트엔드 개발자": "frontend",
        "백엔드 개발자": "backend",
        "풀스택 개발자": "backend",
        "데이터 사이언티스트": "data_scientist",
        "AI/ML 엔지니어": "ai_ml_engineer"
    };
    return mapping[targetJob] || null;
};

// 온보딩 데이터를 기반으로 초기 활동 목록을 생성
const createActivitiesFromOnboarding = (onboardingData) => {
    try {
        const { formData } = onboardingData;
        if (!formData?.preferredActivities || formData.preferredActivities.length === 0) {
            return null;
        }

        const { targetJob, preferredActivities } = formData;
        const careerKey = mapTargetJobToCareerKey(targetJob);
        const jobCareerData = careerKey ? careerData[careerKey] : null;

        const today = new Date();
        const categorized = {
            planned: [],
            inProgress: [],
            completed: []
        };

        preferredActivities.forEach((activityId, index) => {
            const label = ACTIVITY_LABELS[activityId] || activityId;

            let activityTitle = `${label} 활동`;
            let startYear = today.getFullYear();
            let startMonth = today.getMonth() + 1 + index;
            let endYear = startYear;
            let endMonth = startMonth + 2;

            if (startMonth > 12) {
                startYear += Math.floor(startMonth / 12);
                startMonth = startMonth % 12 || 12;
            }
            if (endMonth > 12) {
                endYear += Math.floor(endMonth / 12);
                endMonth = endMonth % 12 || 12;
            }

            if (jobCareerData && jobCareerData[activityId] && jobCareerData[activityId].length > 0) {
                const recommendations = jobCareerData[activityId];
                const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];

                activityTitle = randomRec.label || activityTitle;

                if (randomRec.startYear) startYear = randomRec.startYear;
                if (randomRec.startMonth) startMonth = randomRec.startMonth;
                if (randomRec.endYear) endYear = randomRec.endYear;
                if (randomRec.endMonth) endMonth = randomRec.endMonth;
            }

            const activity = {
                id: `onboarding-${activityId}-${Date.now()}-${index}`,
                title: activityTitle,
                tag: label,
                categories: [label],
                date: `${startYear}-${String(startMonth).padStart(2, '0')}-01`,
                files: 0,
                startYear,
                startMonth,
                endYear,
                endMonth
            };

            const startDate = new Date(startYear, startMonth - 1);
            const endDate = new Date(endYear, endMonth - 1);
            const now = new Date();

            if (endDate < now) {
                categorized.completed.push(activity);
            } else if (startDate <= now && endDate >= now) {
                categorized.inProgress.push(activity);
            } else {
                categorized.planned.push(activity);
            }
        });

        return categorized;
    } catch (e) {
        console.error('온보딩 기반 활동 생성 실패:', e);
        return null;
    }
};

// 활동 목록의 파일 개수를 최신 상태로 업데이트
const updateActivityFileCounts = (activities, files) => {
    if (!activities || !files) return activities;

    const fileCounts = files.reduce((acc, file) => {
        if (file.relatedActivity) {
            acc[file.relatedActivity] = (acc[file.relatedActivity] || 0) + 1;
        }
        return acc;
    }, {});

    const updateList = (list) => list.map(a => ({
        ...a,
        files: fileCounts[a.id] || 0
    }));

    return {
        planned: updateList(activities.planned),
        inProgress: updateList(activities.inProgress),
        completed: updateList(activities.completed)
    };
};

// 로드맵 데이터와 로컬에 저장된(사용자가 추가/수정한) 데이터를 병합
const mergeRoadmapAndSaved = (roadmapActivities, savedActivities) => {
    if (!savedActivities) return roadmapActivities;

    const result = { planned: [], inProgress: [], completed: [] };
    const savedIds = new Set();

    const roadmapIds = new Set();
    Object.values(roadmapActivities).flat().forEach(a => roadmapIds.add(String(a.id)));

    Object.keys(savedActivities).forEach(status => {
        savedActivities[status].forEach(savedItem => {
            const idStr = String(savedItem.id);
            const isCustom = idStr.startsWith("new-") || idStr.startsWith("onboarding-");
            const existsInRoadmap = roadmapIds.has(idStr);

            let targetStatus = status;
            // 저장된 데이터 중 완료 상태인데 파일이 없는 경우 진행중으로 강제 이동
            if (status === 'completed' && (!savedItem.files || savedItem.files === 0)) {
                targetStatus = 'inProgress';
            }

            if (isCustom) {
                result[targetStatus].push(savedItem);
                savedIds.add(idStr);
            } else if (existsInRoadmap) {
                const roadmapItem = Object.values(roadmapActivities).flat().find(a => String(a.id) === idStr);
                result[targetStatus].push({ ...roadmapItem, ...savedItem, files: savedItem.files });
                savedIds.add(idStr);
            }
        });
    });

    Object.keys(roadmapActivities).forEach(status => {
        roadmapActivities[status].forEach(roadmapItem => {
            if (!savedIds.has(String(roadmapItem.id))) {
                result[status].push(roadmapItem);
            }
        });
    });

    return result;
};

// 활동 관리 메인 훅
export const useActivity = (files) => {
    const [roadmapActivities, setRoadmapActivities] = useState([]);
    const [activities, setActivities] = useState(() => {
        const initialActivities = loadFromStorage(ACTIVITY_STORAGE_KEY, mockActivities);
        const savedFiles = loadFromStorage(FILES_STORAGE_KEY, mockFiles);
        return updateActivityFileCounts(initialActivities, savedFiles);
    });

    useEffect(() => {
        // 로드맵 데이터 초기 로딩
        const fetchRoadmapData = async () => {
            try {
                const data = await roadmapApi.getRoadmap();
                console.log("🤖 OpenAI Recommended Activities:", data);
                setRoadmapActivities(data || []);
            } catch (error) {
                console.error("Failed to fetch roadmap data:", error);
            }
        };

        fetchRoadmapData();
    }, []);

    useEffect(() => {
        // 로드맵 데이터가 변경되면 로컬 데이터와 병합
        if (roadmapActivities.length > 0) {
            console.log("AI 추천 활동 데이터:", roadmapActivities);
            const converted = convertRoadmapToActivity(roadmapActivities);
            setActivities(prev => {
                const merged = mergeRoadmapAndSaved(converted, prev);
                return merged;
            });
        }
    }, [roadmapActivities]);

    useEffect(() => {
        // 활동 데이터 변경 시 로컬 스토리지에 저장
        const activityKey = getStorageKey(ACTIVITY_STORAGE_KEY);
        localStorage.setItem(activityKey, JSON.stringify(activities));
    }, [activities]);

    useEffect(() => {
        // 다른 탭이나 창에서 로드맵 데이터가 변경되었을 때 동기화
        const handleRoadmapChange = () => {
            const roadmapData = loadFromStorage(ROADMAP_STORAGE_KEY, []);
            if (roadmapData && roadmapData.length > 0) {
                const converted = convertRoadmapToActivity(roadmapData);
                setActivities(prev => {
                    const merged = mergeRoadmapAndSaved(converted, prev);
                    if (JSON.stringify(merged) === JSON.stringify(prev)) {
                        return prev;
                    }
                    return merged;
                });
            }
        };

        window.addEventListener('storage', handleRoadmapChange);

        const interval = setInterval(() => {
            const roadmapData = loadFromStorage(ROADMAP_STORAGE_KEY, []);
            if (roadmapData && roadmapData.length > 0) {
                const converted = convertRoadmapToActivity(roadmapData);
                setActivities(prev => {
                    const merged = mergeRoadmapAndSaved(converted, prev);
                    if (JSON.stringify(merged) === JSON.stringify(prev)) {
                        return prev;
                    }
                    return merged;
                });
            }
        }, 1000);

        return () => {
            window.removeEventListener('storage', handleRoadmapChange);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const saved = localStorage.getItem('activities');
            if (saved) setActivities(JSON.parse(saved));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        // 온보딩 완료 시 활동 데이터 자동 생성 처리
        const handleStorageChange = (e) => {
            if (e.key === ONBOARDING_STORAGE_KEY) {
                const roadmapData = loadFromStorage(ROADMAP_STORAGE_KEY, []);
                if (!roadmapData || roadmapData.length === 0) {
                    try {
                        const onboardingData = JSON.parse(e.newValue);
                        const created = createActivitiesFromOnboarding(onboardingData);
                        if (created) {
                            setActivities(created);
                        }
                    } catch (error) {
                        console.error('Storage 변경 처리 실패:', error);
                    }
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // 활동 상태 변경 (예정 -> 진행중 -> 완료) 처리
    const handleChangeProgress = (item, progressValue, updatedItem = null) => {
        let targetStatus;
        if (progressValue === 0) targetStatus = 'planned';
        else if (progressValue === 50) targetStatus = 'inProgress';
        else if (progressValue === 100) targetStatus = 'completed';

        const itemToMove = updatedItem || item;

        setActivities(prev => {
            const planned = prev.planned.filter(a => a.id !== item.id);
            const inProgress = prev.inProgress.filter(a => a.id !== item.id);
            const completed = prev.completed.filter(a => a.id !== item.id);

            if (targetStatus === 'planned') planned.push(itemToMove);
            else if (targetStatus === 'inProgress') inProgress.push(itemToMove);
            else completed.push(itemToMove);

            return { planned, inProgress, completed };
        });
    };

    // 새 활동 추가
    const addActivity = (activity) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const startDate = new Date(activity.date).setHours(0, 0, 0, 0);

        const newItem = {
            id: `new-${Date.now()}`,
            title: activity.title,
            tag: activity.tag,
            categories: [activity.tag],
            date: activity.date,
            files: 0,
        };

        if (startDate > today) {
            setActivities((prev) => ({
                ...prev,
                planned: [...prev.planned, newItem],
            }));
        } else {
            setActivities((prev) => ({
                ...prev,
                inProgress: [...prev.inProgress, newItem],
            }));
        }
    };

    // 활동 삭제
    const handleDeleteActivity = async (editItem, setIsEditOpen) => {
        if (!editItem) return;

        try {
            await roadmapApi.deleteActivity(editItem.id);

            setActivities((prev) => {
                const remove = (list) => list.filter((a) => a.id !== editItem.id);
                return {
                    planned: remove(prev.planned),
                    inProgress: remove(prev.inProgress),
                    completed: remove(prev.completed),
                };
            });

            setIsEditOpen(false);
        } catch (error) {
            console.error("Failed to delete activity:", error);
            alert("활동 삭제에 실패했습니다.");
        }
    };

    // 특정 활동의 파일 개수 업데이트
    const updateFileCount = (activityId, delta) => {
        setActivities((prev) => {
            const update = (list) =>
                list.map((a) =>
                    a.id === activityId
                        ? { ...a, files: Math.max((a.files || 0) + delta, 0) }
                        : a
                );

            let newPlanned = update(prev.planned);
            let newInProgress = update(prev.inProgress);
            let newCompleted = update(prev.completed);

            // 완료된 활동 중 파일이 0개가 된 경우 진행중으로 이동
            const demotedActivities = newCompleted.filter(a => a.id === activityId && a.files === 0);

            if (demotedActivities.length > 0) {
                newCompleted = newCompleted.filter(a => a.id !== activityId);
                newInProgress = [...newInProgress, ...demotedActivities];
            }

            return {
                planned: newPlanned,
                inProgress: newInProgress,
                completed: newCompleted,
            };
        });
    };

    // 활동 수정
    const updateActivity = (updatedItem) => {
        setActivities(prev => {
            const update = (list) => list.map(a => a.id === updatedItem.id ? updatedItem : a);
            return {
                planned: update(prev.planned),
                inProgress: update(prev.inProgress),
                completed: update(prev.completed)
            };
        });
    };

    return {
        activities,
        setActivities,
        addActivity,
        updateActivity,
        handleDeleteActivity,
        handleChangeProgress,
        updateFileCount
    };
};
