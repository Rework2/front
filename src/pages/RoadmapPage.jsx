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
import { getAIRecommendedActivities, getDefaultActivitiesForTargetJobWithTypes, mapTargetJobToCareerKey, getCurrentUserId, getOnboardingData } from "../components/roadmappage/utils";
import careerData from "../components/roadmappage/careerData.json";
import * as S from "../styles/RoadmapPage.styles";

const X = () => <span>×</span>;
const Plus = () => <span>+</span>;
const Calendar = () => <span>📅</span>;
const ChevronLeft = () => <span>‹</span>;
const ChevronRight = () => <span>›</span>;

export function RoadmapPage() {
  const onboardingData = getOnboardingData();
  const { preferredActivities = [], preparationPeriod = "" } = onboardingData;

  const getInitialActivityTypes = () => {
    let types = DEFAULT_ACTIVITY_TYPES;

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
      const preferredSet = new Set(preferredActivities);
      return types.filter((type) =>
        preferredSet.has(type.id) || !DEFAULT_ACTIVITY_TYPES.some(dt => dt.id === type.id)
      );
    }
    return types;
  };

  const getInitialMonthRange = () => {
    const currentMonth = new Date().getMonth() + 1;

    const calculateMonthRange = (monthsToAdd) => {
      let end = Math.min(12, currentMonth + monthsToAdd);
      let start = currentMonth;
      if (start >= end) {
        start = Math.max(1, end - monthsToAdd);
      }
      if (start === end) {
        end = Math.min(12, start + 1);
      }
      return { start, end };
    };

    switch (preparationPeriod) {
      case "3months":
        return calculateMonthRange(2);
      case "6months":
        return calculateMonthRange(5);
      case "12months":
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
  
  const getInitialTags = () => {
    try {
      const savedTags = localStorage.getItem("roadmap_selected_tags");
      if (savedTags) {
        const parsed = JSON.parse(savedTags);
        return Array.isArray(parsed) ? parsed : ["IT", "프로젝트", "React"];
      }
    } catch (e) {
      console.error("Failed to load selected tags:", e);
    }
    return ["IT", "프로젝트", "React"];
  };

  const [selectedTags, setSelectedTags] = useState(getInitialTags);

  useEffect(() => {
    try {
      localStorage.setItem("roadmap_selected_tags", JSON.stringify(selectedTags));
    } catch (e) {
      console.error("Failed to save selected tags:", e);
    }
  }, [selectedTags]);

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

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        let data = await roadmapApi.getRoadmap();
        console.log("🗺️ RoadmapPage Fetched Data:", data);

        let shouldInitialize = false;
        const targetJob = onboardingData?.targetJob;
        const userPreferredActivities = onboardingData?.preferredActivities || [];

        if (targetJob && userPreferredActivities.length > 0) {

            if (!data || data.length === 0) {
              shouldInitialize = true;
            } else {
              const existingTypes = new Set(data.map(d => d.type || d.typeId));
              let expectedTypes = [];

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

  useEffect(() => {
    setNewActivity((prev) => ({
      ...prev,
      startYear: selectedYear,
      endYear: selectedYear,
    }));
  }, [selectedYear]);

  const visibleMonths = useMemo(() => {
    const months = [];
    for (let month = monthRange.start; month <= monthRange.end; month += 1) {
      months.push(month);
    }
    return months;
  }, [monthRange]);

  const selectedTypeSet = useMemo(
    () => new Set(selectedActivityTypes),
    [selectedActivityTypes]
  );

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

  const handleRemoveTag = (tag) => {
    setSelectedTags((prev) => prev.filter((item) => item !== tag));
  };

  const handleAddCategoryTag = () => {
    const value = newCategoryTag.trim();
    if (!value || selectedTags.includes(value)) {
      return;
    }
    setSelectedTags((prev) => [...prev, value]);
    setNewCategoryTag("");
    setIsAddingTag(false);
  };

  const handleMonthChange = (key, value) => {
    const numericValue = Number(value);
    setMonthRange((prev) => {
      if (key === "start") {
        const maxStart = Math.min(numericValue, prev.end - 1);
        return { 
          start: Math.max(1, maxStart), 
          end: prev.end 
        };
      } else {
        const minEnd = Math.max(numericValue, prev.start + 1);
        return { 
          start: prev.start, 
          end: Math.min(12, minEnd) 
        };
      }
    });
  };

  const toggleTypeSelection = (typeId) => {
    setSelectedActivityTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

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

  const matchingTagSet = useMemo(() => new Set(selectedTags), [selectedTags]);

  const incrementYear = () => setSelectedYear((prev) => prev + 1);
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
