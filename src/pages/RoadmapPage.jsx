import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_ACTIVITY_TYPES,
  COLOR_PALETTE,
} from "../components/roadmappage/constants";
import { generatePastelColor, createSlug } from "../components/roadmappage/utils";
import { YearControl } from "../components/roadmappage/YearControl";
import { CategoryTags } from "../components/roadmappage/CategoryTags";
import { MonthRangeSlider } from "../components/roadmappage/MonthRangeSlider";
import { ActivityTypeList } from "../components/roadmappage/ActivityTypeList";
import { InlineAddForm } from "../components/roadmappage/InlineAddForm";
import { AddActivityForm } from "../components/roadmappage/AddActivityForm";
import { TimelineHeader } from "../components/roadmappage/TimelineHeader";
import { TimelineRow } from "../components/roadmappage/TimelineRow";
import { roadmapApi } from "../api/roadmap";
import { getAIRecommendedActivities, getDefaultActivitiesForTargetJobWithTypes, mapTargetJobToCareerKey } from "../components/roadmappage/utils";
import careerData from "../components/roadmappage/careerData.json";
import * as S from "../styles/RoadmapPage.styles";

const X = () => <span>×</span>;
const Plus = () => <span>+</span>;
const Calendar = () => <span>📅</span>;
const ChevronLeft = () => <span>‹</span>;
const ChevronRight = () => <span>›</span>;

export function RoadmapPage() {
  /**
   * Onboarding 데이터에서 초기값 가져오기
   * @returns {Object} 온보딩 폼 데이터
   */
  const getOnboardingData = () => {
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
  };

  const onboardingData = getOnboardingData();
  const { preferredActivities = [], preparationPeriod = "" } = onboardingData;

  /**
   * preferredActivities에 따라 activityTypes 필터링
   * @returns {Array} 필터링된 활동 타입 배열
   */
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

  const getInitialActivityTypes = () => {
    let types = DEFAULT_ACTIVITY_TYPES;

    // 저장된 커스텀 타입 로드
    try {
      const userId = getCurrentUserId();
      const key = userId ? `custom_activity_types_${userId}` : "custom_activity_types";
      const savedTypes = localStorage.getItem(key);
      if (savedTypes) {
        const parsed = JSON.parse(savedTypes);
        types = [...types, ...parsed];
      }
    } catch (e) {
      console.error("Failed to load custom activity types:", e);
    }

    if (preferredActivities.length > 0) {
      // 선호 활동이 있으면 해당 활동 + 커스텀 활동 포함
      const preferredSet = new Set(preferredActivities);
      return types.filter((type) =>
        preferredSet.has(type.id) || !DEFAULT_ACTIVITY_TYPES.some(dt => dt.id === type.id)
      );
    }
    return types;
  };

  /**
   * preparationPeriod에 따라 monthRange 설정
   * @returns {{start: number, end: number}} 월 범위 객체
   */
  const getInitialMonthRange = () => {
    const currentMonth = new Date().getMonth() + 1;

    switch (preparationPeriod) {
      case "3months": {
        let end = Math.min(12, currentMonth + 2);
        let start = currentMonth;
        // start와 end가 같거나 start가 end보다 크면 조정 (최소 2개월 범위 유지)
        if (start >= end) {
          start = Math.max(1, end - 2);
        }
        // 최종적으로 start와 end가 같지 않도록 보장
        if (start === end) {
          end = Math.min(12, start + 1);
        }
        return { start, end };
      }
      case "6months": {
        let end = Math.min(12, currentMonth + 5);
        let start = currentMonth;
        // start와 end가 같거나 start가 end보다 크면 조정 (최소 5개월 범위 유지)
        if (start >= end) {
          start = Math.max(1, end - 5);
        }
        // 최종적으로 start와 end가 같지 않도록 보장
        if (start === end) {
          end = Math.min(12, start + 1);
        }
        return { start, end };
      }
      case "12months":
        return { start: 1, end: 12 };
      case "flexible":
      default:
        return { start: 1, end: 12 };
    }
  };

  const initialActivityTypes = getInitialActivityTypes();
  const initialMonthRange = getInitialMonthRange();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [activityTypes, setActivityTypes] = useState(initialActivityTypes);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState(
    initialActivityTypes.map((t) => t.id)
  );

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [monthRange, setMonthRange] = useState(initialMonthRange);
  const [selectedTags, setSelectedTags] = useState(["IT", "프로젝트", "React"]);
  const [activeSlider, setActiveSlider] = useState(null);
  const [isAddingType, setIsAddingType] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newCategoryTag, setNewCategoryTag] = useState("");
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    typeId: DEFAULT_ACTIVITY_TYPES[0].id,
    title: "",
    tags: "",
    isImportant: false,
    startYear: selectedYear,
    startMonth: 8,
    endYear: selectedYear,
    endMonth: 8,
  });

  /**
   * 컴포넌트 마운트 시 활동 데이터 로드 및 초기화
   */
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        let data = await roadmapApi.getRoadmap();
        console.log("🗺️ RoadmapPage Fetched Data:", data);

        const onboardingData = localStorage.getItem("rework_onboarding");
        let shouldInitialize = false;
        let targetJob = null;
        let userPreferredActivities = [];

        if (onboardingData) {
          try {
            const parsed = JSON.parse(onboardingData);
            targetJob = parsed.formData?.targetJob;
            userPreferredActivities = parsed.formData?.preferredActivities || [];

            if (!data || data.length === 0) {
              shouldInitialize = true;
            } else {
              const existingTypes = new Set(data.map(d => d.type || d.typeId));
              let expectedTypes = [];

              // 풀스택 개발자의 경우 frontend와 backend 데이터를 모두 확인
              if (targetJob === "풀스택 개발자") {
                const frontendData = careerData.frontend;
                const backendData = careerData.backend;
                expectedTypes = userPreferredActivities.filter(type => {
                  const frontendList = frontendData?.[type] || [];
                  const backendList = backendData?.[type] || [];
                  const combinedList = [...frontendList, ...backendList];
                  return Array.isArray(combinedList) && combinedList.length > 0;
                });
              } else {
                const careerKey = mapTargetJobToCareerKey(targetJob);
                expectedTypes = careerKey && careerData[careerKey]
                  ? userPreferredActivities.filter(type =>
                    careerData[careerKey][type] &&
                    Array.isArray(careerData[careerKey][type]) &&
                    careerData[careerKey][type].length > 0
                  )
                  : [];
              }

              const missingTypes = expectedTypes.filter(type => !existingTypes.has(type));

              if (missingTypes.length > 0 || existingTypes.size < expectedTypes.length) {
                shouldInitialize = true;
              }
            }
          } catch (e) {
            console.error("Failed to parse onboarding data:", e);
          }
        }

        if (shouldInitialize && targetJob && userPreferredActivities.length > 0) {
          try {
            let aiRecommendedActivities = [];
            try {
              aiRecommendedActivities = await getAIRecommendedActivities(
                targetJob,
                userPreferredActivities
              );
            } catch (aiError) {
              aiRecommendedActivities = getDefaultActivitiesForTargetJobWithTypes(
                targetJob,
                userPreferredActivities
              );
            }

            const initialActivities = aiRecommendedActivities.map(activity => ({
              ...activity,
              title: activity.title || activity.label,
              typeId: activity.typeId || activity.type,
              isImportant: true,
              tags: Array.isArray(activity.tags) ? activity.tags : ["추천", "AI 제안"],
            }));

            if (initialActivities.length > 0) {
              await roadmapApi.initializeRoadmap(initialActivities);
              data = initialActivities;
            }
          } catch (e) {
            console.error("Failed to initialize roadmap:", e);
          }
        }

        setActivities(data || []);
      } catch (err) {
        console.error("Failed to fetch roadmap:", err);
        setError("로드맵 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  /**
   * activityTypes 변경 시 newActivity의 typeId 업데이트
   */
  useEffect(() => {
    setNewActivity((prev) => {
      if (activityTypes.length === 0) {
        return { ...prev, typeId: "" };
      }
      if (!activityTypes.some((type) => type.id === prev.typeId)) {
        return { ...prev, typeId: activityTypes[0].id };
      }
      return prev;
    });
  }, [activityTypes]);

  /**
   * selectedYear 변경 시 newActivity의 연도 업데이트
   */
  useEffect(() => {
    setNewActivity((prev) => ({
      ...prev,
      startYear: selectedYear,
      endYear: selectedYear,
    }));
  }, [selectedYear]);

  /**
   * 선택된 월 범위에 해당하는 월 배열 생성
   */
  const visibleMonths = useMemo(() => {
    const months = [];
    for (let month = monthRange.start; month <= monthRange.end; month += 1) {
      months.push(month);
    }
    return months;
  }, [monthRange]);

  /**
   * 선택된 활동 타입을 Set으로 변환 (빠른 조회를 위해)
   */
  const selectedTypeSet = useMemo(
    () => new Set(selectedActivityTypes),
    [selectedActivityTypes]
  );

  /**
   * 타임라인에 표시할 행 데이터 계산
   * 선택된 활동 타입, 연도, 월 범위에 맞는 활동들을 필터링하고 위치 정보 추가
   */
  const timelineRows = useMemo(() => {
    return activityTypes
      .filter((type) => selectedTypeSet.has(type.id))
      .map((type) => {
        const typeActivities = activities
          .filter((activity) => activity.typeId === type.id || activity.type === type.id)
          .filter((activity) =>
            activity.startYear <= selectedYear && activity.endYear >= selectedYear
          )
          .filter((activity) =>
            activity.startMonth <= monthRange.end && activity.endMonth >= monthRange.start
          )
          .map((activity) => {
            const adjustedStart = Math.max(activity.startMonth, monthRange.start);
            const adjustedEnd = Math.min(activity.endMonth, monthRange.end);
            const startIndex = visibleMonths.indexOf(adjustedStart);
            const endIndex = visibleMonths.indexOf(adjustedEnd);

            if (startIndex === -1 || endIndex === -1) {
              return null;
            }

            return {
              ...activity,
              adjustedStart,
              adjustedEnd,
              startIndex,
              endIndex,
            };
          })
          .filter(Boolean);

        return {
          type,
          activities: typeActivities,
        };
      });
  }, [activityTypes, selectedTypeSet, activities, monthRange, visibleMonths, selectedYear]);

  /**
   * 선택된 태그 제거
   */
  const handleRemoveTag = (tag) => {
    setSelectedTags((prev) => prev.filter((item) => item !== tag));
  };

  /**
   * 새로운 카테고리 태그 추가
   */
  const handleAddCategoryTag = () => {
    const value = newCategoryTag.trim();
    if (!value || selectedTags.includes(value)) {
      return;
    }
    setSelectedTags((prev) => [...prev, value]);
    setNewCategoryTag("");
    setIsAddingTag(false);
  };

  /**
   * 월 범위 슬라이더 변경 핸들러
   */
  const handleMonthChange = (key, value) => {
    const numericValue = Number(value);
    setMonthRange((prev) => {
      if (key === "start") {
        const nextStart = Math.min(numericValue, prev.end);
        return { start: nextStart, end: Math.max(nextStart, prev.end) };
      }
      const nextEnd = Math.max(numericValue, prev.start);
      return { start: Math.min(prev.start, nextEnd), end: nextEnd };
    });
  };

  /**
   * 활동 타입 선택 토글
   */
  const toggleTypeSelection = (typeId) => {
    setSelectedActivityTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

  /**
   * 새로운 활동 타입 추가
   */
  const handleAddActivityType = () => {
    const trimmed = newTypeName.trim();
    if (!trimmed) {
      return;
    }
    const baseId = createSlug(trimmed);
    let uniqueId = baseId;
    let suffix = 1;
    while (activityTypes.some((type) => type.id === uniqueId)) {
      uniqueId = `${baseId}-${suffix}`;
      suffix += 1;
    }

    const usedColors = new Set(activityTypes.map((type) => type.color));
    const availableColor = COLOR_PALETTE.find((color) => !usedColors.has(color));
    const color = availableColor || generatePastelColor();

    const newType = {
      id: uniqueId,
      label: trimmed,
      color,
    };

    setActivityTypes((prev) => {
      const updated = [...prev, newType];
      // 사용자별 커스텀 활동 타입 저장
      const userId = getCurrentUserId();
      const key = userId ? `custom_activity_types_${userId}` : "custom_activity_types";
      localStorage.setItem(key, JSON.stringify(updated.filter(t => !DEFAULT_ACTIVITY_TYPES.some(dt => dt.id === t.id))));
      return updated;
    });
    setSelectedActivityTypes((prev) => [...prev, newType.id]);
    setNewActivity((prev) => ({ ...prev, typeId: newType.id }));
    setNewTypeName("");
    setIsAddingType(false);
  };

  /**
   * 새로운 활동 추가 핸들러
   */
  const handleAddActivity = async (event) => {
    event.preventDefault();

    const title = newActivity.title.trim();
    if (!title || !newActivity.typeId) {
      return;
    }

    let startYear = Number(newActivity.startYear);
    let endYear = Number(newActivity.endYear);
    let startMonth = Number(newActivity.startMonth);
    let endMonth = Number(newActivity.endMonth);

    if (Number.isNaN(startYear) || Number.isNaN(endYear) || Number.isNaN(startMonth) || Number.isNaN(endMonth)) {
      return;
    }

    if (startYear > endYear) {
      [startYear, endYear] = [endYear, startYear];
      if (startYear === endYear && startMonth > endMonth) {
        [startMonth, endMonth] = [endMonth, startMonth];
      }
    } else if (startYear === endYear && startMonth > endMonth) {
      [startMonth, endMonth] = [endMonth, startMonth];
    }

    const tags = newActivity.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const activityPayload = {
      typeId: newActivity.typeId,
      title,
      tags,
      isImportant: Boolean(newActivity.isImportant),
      startYear,
      startMonth,
      endYear,
      endMonth,
      isUserCreated: true,
    };

    try {
      const createdActivity = await roadmapApi.createActivity(activityPayload);
      setActivities((prev) => [...prev, createdActivity]);

      setSelectedActivityTypes((prev) =>
        prev.includes(newActivity.typeId) ? prev : [...prev, newActivity.typeId]
      );
      setNewActivity({
        typeId: newActivity.typeId,
        title: "",
        tags: "",
        isImportant: false,
        startYear,
        startMonth,
        endYear,
        endMonth,
      });
      setIsAddingActivity(false);
    } catch (err) {
      console.error("Failed to create activity:", err);
      alert("활동을 추가하는데 실패했습니다.");
    }
  };

  /**
   * 선택된 태그를 Set으로 변환 (빠른 조회를 위해)
   */
  const matchingTagSet = useMemo(() => new Set(selectedTags), [selectedTags]);

  /**
   * 연도 증가
   */
  const incrementYear = () => setSelectedYear((prev) => prev + 1);

  /**
   * 연도 감소
   */
  const decrementYear = () => setSelectedYear((prev) => prev - 1);

  if (loading) {
    return (
      <S.RoadmapPageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>로드맵을 불러오는 중입니다...</p>
      </S.RoadmapPageContainer>
    );
  }

  if (error) {
    return (
      <S.RoadmapPageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>{error}</p>
      </S.RoadmapPageContainer>
    );
  }

  return (
    <S.RoadmapPageContainer>
      <S.Container>
        <S.Header>
          <S.Title>Portfolio Roadmap</S.Title>
          <S.SubHeader>
            <CategoryTags
              tags={selectedTags}
              onRemoveTag={handleRemoveTag}
              XIcon={X}
            />
            <YearControl
              year={selectedYear}
              onIncrement={incrementYear}
              onDecrement={decrementYear}
              icons={{ Calendar, ChevronLeft, ChevronRight }}
            />
          </S.SubHeader>
          {isAddingTag ? (
            <InlineAddForm
              value={newCategoryTag}
              placeholder="새 카테고리 태그"
              onChange={(event) => setNewCategoryTag(event.target.value)}
              onSubmit={handleAddCategoryTag}
              onCancel={() => {
                setIsAddingTag(false);
                setNewCategoryTag("");
              }}
            />
          ) : (
            <S.AddButton as="button" type="button" onClick={() => setIsAddingTag(true)}>
              <Plus />
              태그 추가
            </S.AddButton>
          )}
        </S.Header>

        <S.ContentWrapper>
          <S.FilterPanel>
            <S.FilterTitle>Filter</S.FilterTitle>

            <S.FilterSection>
              <S.FilterLabel>Month Range</S.FilterLabel>
              <MonthRangeSlider
                monthRange={monthRange}
                onMonthChange={handleMonthChange}
                activeSlider={activeSlider}
                setActiveSlider={setActiveSlider}
              />
            </S.FilterSection>

            <ActivityTypeList
              activityTypes={activityTypes}
              selectedTypeSet={selectedTypeSet}
              onToggleType={toggleTypeSelection}
              isAddingType={isAddingType}
              newTypeName={newTypeName}
              onNewTypeNameChange={setNewTypeName}
              onAddType={handleAddActivityType}
              onStartAddType={() => setIsAddingType(true)}
              onCancelAddType={() => {
                setIsAddingType(false);
                setNewTypeName("");
              }}
              PlusIcon={Plus}
            />

            <S.FilterSection>
              <S.FilterLabel>Importance</S.FilterLabel>
              <S.ImportanceDescription>
                중요도가 높은 활동은 타임라인에서 별 아이콘(★)으로 강조됩니다.
              </S.ImportanceDescription>
              <S.AddButtonBlock as="button" type="button" onClick={() => {
                setIsAddingActivity((prev) => !prev);
              }}>
                <Plus />
                활동 추가
              </S.AddButtonBlock>
            </S.FilterSection>

            {isAddingActivity && (
              <AddActivityForm
                activityTypes={activityTypes}
                newActivity={newActivity}
                onNewActivityChange={setNewActivity}
                onSubmit={handleAddActivity}
                onCancel={() => setIsAddingActivity(false)}
                XIcon={X}
              />
            )}
          </S.FilterPanel>

          <S.MainContent>
            <S.TimelineContainer>
              <TimelineHeader visibleMonths={visibleMonths} />

              {timelineRows.length === 0 && (
                <S.TimelineEmpty>
                  선택한 조건에 해당하는 활동이 없습니다. 새로운 활동을 추가해보세요.
                </S.TimelineEmpty>
              )}

              {timelineRows.map((row) => (
                <TimelineRow
                  key={row.type.id}
                  row={row}
                  visibleMonths={visibleMonths}
                  matchingTagSet={matchingTagSet}
                />
              ))}
            </S.TimelineContainer>
          </S.MainContent>
        </S.ContentWrapper>
      </S.Container>
    </S.RoadmapPageContainer>
  );
}
