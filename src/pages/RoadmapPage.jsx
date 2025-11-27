import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_ACTIVITY_TYPES,
  DEFAULT_ACTIVITIES,
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

const X = () => <span>×</span>;
const Plus = () => <span>+</span>;
const Calendar = () => <span>📅</span>;
const ChevronLeft = () => <span>‹</span>;
const ChevronRight = () => <span>›</span>;

const FALLBACK_YEAR = new Date().getFullYear();

const getDefaultActivitiesFromStorage = () => {
  try {
    const stored = localStorage.getItem("roadmap_defaultActivities");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const hydrateDefaultActivities = (items) =>
  (items || []).map((activity, index) => ({
    id: `default-${activity.id || index}`,
    typeId: activity.type || activity.id || "competition",
    title: activity.label || "기본 활동",
    tags: [],
    isImportant: false,
    startYear: activity.startYear || FALLBACK_YEAR,
    startMonth: activity.startMonth || 1,
    endYear: activity.endYear || activity.startYear || FALLBACK_YEAR,
    endMonth: activity.endMonth || activity.startMonth || 1,
  }));

function RoadmapPage() {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [activityTypes, setActivityTypes] = useState(DEFAULT_ACTIVITY_TYPES);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState(
    DEFAULT_ACTIVITY_TYPES.map((type) => type.id)
  );
  const [activities, setActivities] = useState(() => {
    const stored = getDefaultActivitiesFromStorage();
    return hydrateDefaultActivities(
      stored && stored.length > 0 ? stored : DEFAULT_ACTIVITIES
    );
  });
  const [monthRange, setMonthRange] = useState({ start: 1, end: 12 });
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

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = getDefaultActivitiesFromStorage();
      if (stored && stored.length > 0) {
        setActivities(hydrateDefaultActivities(stored));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
          .filter((activity) => activity.typeId === type.id)
          .filter(
            (activity) =>
              activity.startYear <= selectedYear && activity.endYear >= selectedYear
          )
          .filter(
            (activity) =>
              activity.startMonth <= monthRange.end &&
              activity.endMonth >= monthRange.start
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
        const nextStart = Math.min(numericValue, prev.end);
        return { start: nextStart, end: Math.max(nextStart, prev.end) };
      }
      const nextEnd = Math.max(numericValue, prev.start);
      return { start: Math.min(prev.start, nextEnd), end: nextEnd };
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

    setActivityTypes((prev) => [...prev, newType]);
    setSelectedActivityTypes((prev) => [...prev, newType.id]);
    setNewActivity((prev) => ({ ...prev, typeId: newType.id }));
    setNewTypeName("");
    setIsAddingType(false);
  };

  const handleAddActivity = (event) => {
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

    const createdActivity = {
      id: `activity-${Date.now()}`,
      typeId: newActivity.typeId,
      title,
      tags,
      isImportant: Boolean(newActivity.isImportant),
      startYear,
      startMonth,
      endYear,
      endMonth,
    };

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
  };

  const matchingTagSet = useMemo(() => new Set(selectedTags), [selectedTags]);
  const incrementYear = () => setSelectedYear((prev) => prev + 1);
  const decrementYear = () => setSelectedYear((prev) => prev - 1);

  return (
    <div className="roadmap-page">
      <div className="roadmap-page__container">
        <header className="roadmap-page__header">
          <h1 className="roadmap-page__title">Portfolio Roadmap</h1>
          <div className="roadmap-page__sub-header">
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
          </div>
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
            <button
              className="add-button add-button--inline"
              type="button"
              onClick={() => setIsAddingTag(true)}
            >
              <Plus />
              태그 추가
            </button>
          )}
        </header>

        <div className="roadmap-page__content-wrapper">
          <aside className="filter-panel">
            <h3 className="filter-title">Filter</h3>

            <div className="filter-section">
              <label className="filter-label">Month Range</label>
              <MonthRangeSlider
                monthRange={monthRange}
                onMonthChange={handleMonthChange}
                activeSlider={activeSlider}
                setActiveSlider={setActiveSlider}
              />
            </div>

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

            <div className="filter-section">
              <label className="filter-label">Importance</label>
              <p className="importance-description">
                중요도가 높은 활동은 타임라인에서 별 아이콘(★)으로 강조됩니다.
              </p>
              <button
                className="add-button add-button--block"
                type="button"
                onClick={() => {
                  setIsAddingActivity((prev) => !prev);
                }}
              >
                <Plus />
                활동 추가
              </button>
            </div>

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
          </aside>

          <main className="main-content">
            <div className="timeline-container">
              <TimelineHeader visibleMonths={visibleMonths} />

              {timelineRows.length === 0 && (
                <div className="timeline-empty">
                  선택한 조건에 해당하는 활동이 없습니다. 새로운 활동을 추가해보세요.
                </div>
              )}

              {timelineRows.map((row) => (
                <TimelineRow
                  key={row.type.id}
                  row={row}
                  visibleMonths={visibleMonths}
                  matchingTagSet={matchingTagSet}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage;
