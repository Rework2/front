import { useEffect, useMemo, useState } from "react";
// 상수값 정의 (기본 활동 유형, 활동 목록, 색상 팔레트)
import {
  DEFAULT_ACTIVITY_TYPES,
  DEFAULT_ACTIVITIES,
  COLOR_PALETTE,
} from "../components/roadmappage/constants";
// 유틸리티 함수들 (파스텔 색상 생성, 슬러그 생성)
import { generatePastelColor, createSlug } from "../components/roadmappage/utils";
// 연도 컨트롤 컴포넌트
import { YearControl } from "../components/roadmappage/YearControl";
// 카테고리 태그 컴포넌트
import { CategoryTags } from "../components/roadmappage/CategoryTags";
// 월 범위 슬라이더 컴포넌트
import { MonthRangeSlider } from "../components/roadmappage/MonthRangeSlider";
// 활동 유형 리스트 컴포넌트
import { ActivityTypeList } from "../components/roadmappage/ActivityTypeList";
// 인라인 추가 폼 컴포넌트
import { InlineAddForm } from "../components/roadmappage/InlineAddForm";
// 활동 추가 폼 컴포넌트
import { AddActivityForm } from "../components/roadmappage/AddActivityForm";
// 타임라인 헤더 컴포넌트
import { TimelineHeader } from "../components/roadmappage/TimelineHeader";
// 타임라인 행 컴포넌트
import { TimelineRow } from "../components/roadmappage/TimelineRow";

// 아이콘 컴포넌트들 (임시 구현)
// 실제로는 react-icons 등에서 import할 것
const X = () => <span>×</span>;
const Plus = () => <span>+</span>;
const Calendar = () => <span>📅</span>;
const ChevronLeft = () => <span>‹</span>;
const ChevronRight = () => <span>›</span>;

/**
 * 포트폴리오 로드맵 페이지 컴포넌트
 * 활동들을 타임라인 형태로 시각화하고 관리할 수 있는 페이지
 */
function RoadmapPage() {
  // 선택된 연도 상태
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // 활동 유형 목록 상태
  const [activityTypes, setActivityTypes] = useState(DEFAULT_ACTIVITY_TYPES); //AI로 받는다면??
  // 선택된 활동 유형 ID 목록 상태
  const [selectedActivityTypes, setSelectedActivityTypes] = useState(
    DEFAULT_ACTIVITY_TYPES.map((type) => type.id)
  );
  // 활동 목록 상태
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  // 월 범위 상태 (시작월, 종료월)
  const [monthRange, setMonthRange] = useState({ start: 1, end: 12 });
  // 선택된 태그 목록 상태
  const [selectedTags, setSelectedTags] = useState(["IT", "프로젝트", "React"]);
  // 현재 활성화된 슬라이더 상태 (start 또는 end)
  const [activeSlider, setActiveSlider] = useState(null);

  // 활동 유형 추가 관련 상태
  const [isAddingType, setIsAddingType] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");

  // 카테고리 태그 추가 관련 상태
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newCategoryTag, setNewCategoryTag] = useState("");

  // 활동 추가 관련 상태
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    typeId: DEFAULT_ACTIVITY_TYPES[0].id,
    title: "",
    tags: "",
    isImportant: false,
    startMonth: 8,
    endMonth: 8,
  });

  // 활동 유형 목록이 변경될 때 새 활동의 typeId를 유효한 값으로 업데이트
  useEffect(() => {
    setNewActivity((prev) => {
      // 활동 유형이 없으면 typeId를 빈 문자열로 설정
      if (activityTypes.length === 0) {
        return { ...prev, typeId: "" };
      }
      // 현재 typeId가 유효하지 않으면 첫 번째 유형으로 설정
      if (!activityTypes.some((type) => type.id === prev.typeId)) {
        return { ...prev, typeId: activityTypes[0].id };
      }
      return prev;
    });
  }, [activityTypes]);

  // 표시할 월 목록을 계산 (monthRange.start부터 monthRange.end까지)
  const visibleMonths = useMemo(() => {
    const months = [];
    for (let month = monthRange.start; month <= monthRange.end; month += 1) {
      months.push(month);
    }
    return months;
  }, [monthRange]);

  // 선택된 활동 유형 ID를 Set으로 변환 (빠른 조회를 위해)
  const selectedTypeSet = useMemo(
    () => new Set(selectedActivityTypes),
    [selectedActivityTypes]
  );

  // 타임라인에 표시할 행 데이터를 계산
  // 선택된 활동 유형별로 해당하는 활동들을 필터링하고 위치 정보를 추가
  const timelineRows = useMemo(() => {
    return activityTypes
      // 선택된 활동 유형만 필터링
      .filter((type) => selectedTypeSet.has(type.id))
      .map((type) => {
        // 해당 유형의 활동들을 필터링하고 월 범위에 맞게 조정
        const typeActivities = activities
          // 해당 유형의 활동만 필터링
          .filter((activity) => activity.typeId === type.id)
          // 월 범위와 겹치는 활동만 필터링
          .filter(
            (activity) =>
              activity.startMonth <= monthRange.end &&
              activity.endMonth >= monthRange.start
          )
          // 활동의 시작/종료 월을 표시 범위에 맞게 조정하고 인덱스 계산
          .map((activity) => {
            // 표시 범위 내로 시작/종료 월 조정
            const adjustedStart = Math.max(activity.startMonth, monthRange.start);
            const adjustedEnd = Math.min(activity.endMonth, monthRange.end);
            // visibleMonths 배열에서의 인덱스 찾기
            const startIndex = visibleMonths.indexOf(adjustedStart);
            const endIndex = visibleMonths.indexOf(adjustedEnd);

            // 인덱스를 찾을 수 없으면 null 반환
            if (startIndex === -1 || endIndex === -1) {
              return null;
            }

            // 조정된 정보를 포함한 활동 객체 반환
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
  }, [activityTypes, selectedTypeSet, activities, monthRange, visibleMonths]);

  /**
   * 태그 제거 핸들러
   * @param {string} tag - 제거할 태그
   */
  const handleRemoveTag = (tag) => {
    setSelectedTags((prev) => prev.filter((item) => item !== tag));
  };

  /**
   * 카테고리 태그 추가 핸들러
   * 중복된 태그는 추가하지 않음
   */
  const handleAddCategoryTag = () => {
    const value = newCategoryTag.trim();
    // 빈 값이거나 이미 존재하는 태그면 추가하지 않음
    if (!value || selectedTags.includes(value)) {
      return;
    }
    setSelectedTags((prev) => [...prev, value]);
    setNewCategoryTag("");
    setIsAddingTag(false);
  };

  /**
   * 월 범위 변경 핸들러
   * @param {string} key - 'start' 또는 'end'
   * @param {string|number} value - 새로운 월 값
   */
  const handleMonthChange = (key, value) => {
    const numericValue = Number(value);
    setMonthRange((prev) => {
      if (key === "start") {
        // 시작월은 종료월을 넘을 수 없음
        const nextStart = Math.min(numericValue, prev.end);
        return { start: nextStart, end: Math.max(nextStart, prev.end) };
      }
      // 종료월은 시작월보다 작을 수 없음
      const nextEnd = Math.max(numericValue, prev.start);
      return { start: Math.min(prev.start, nextEnd), end: nextEnd };
    });
  };

  /**
   * 활동 유형 선택 토글 핸들러
   * @param {string} typeId - 토글할 활동 유형 ID
   */
  const toggleTypeSelection = (typeId) => {
    setSelectedActivityTypes((prev) => {
      // 이미 선택되어 있으면 제거, 아니면 추가
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

  /**
   * 새로운 활동 유형 추가 핸들러
   * 고유한 ID를 생성하고 색상을 할당
   */
  const handleAddActivityType = () => {
    const trimmed = newTypeName.trim();
    // 빈 값이면 추가하지 않음
    if (!trimmed) {
      return;
    }
    // 슬러그 기반 ID 생성
    const baseId = createSlug(trimmed);
    let uniqueId = baseId;
    let suffix = 1;
    // 고유한 ID가 될 때까지 suffix 증가
    while (activityTypes.some((type) => type.id === uniqueId)) {
      uniqueId = `${baseId}-${suffix}`;
      suffix += 1;
    }

    // 사용된 색상 목록
    const usedColors = new Set(activityTypes.map((type) => type.color));
    // 사용 가능한 색상 찾기
    const availableColor = COLOR_PALETTE.find((color) => !usedColors.has(color));
    // 사용 가능한 색상이 없으면 랜덤 파스텔 색상 생성
    const color = availableColor || generatePastelColor();

    // 새로운 활동 유형 객체 생성
    const newType = {
      id: uniqueId,
      name: trimmed,
      color,
    };

    // 상태 업데이트
    setActivityTypes((prev) => [...prev, newType]);
    setSelectedActivityTypes((prev) => [...prev, newType.id]);
    setNewActivity((prev) => ({ ...prev, typeId: newType.id }));
    setNewTypeName("");
    setIsAddingType(false);
  };

  /**
   * 새로운 활동 추가 핸들러
   * @param {Event} event - 폼 제출 이벤트
   */
  const handleAddActivity = (event) => {
    event.preventDefault();

    const title = newActivity.title.trim();
    // 제목이나 유형이 없으면 추가하지 않음
    if (!title || !newActivity.typeId) {
      return;
    }

    let startMonth = Number(newActivity.startMonth);
    let endMonth = Number(newActivity.endMonth);

    // 유효하지 않은 숫자면 추가하지 않음
    if (Number.isNaN(startMonth) || Number.isNaN(endMonth)) {
      return;
    }

    // 시작월이 종료월보다 크면 교환
    if (startMonth > endMonth) {
      [startMonth, endMonth] = [endMonth, startMonth];
    }

    // 태그 문자열을 배열로 변환 (콤마로 구분)
    const tags = newActivity.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    // 새로운 활동 객체 생성
    const createdActivity = {
      id: `activity-${Date.now()}`,
      typeId: newActivity.typeId,
      title,
      tags,
      isImportant: Boolean(newActivity.isImportant),
      startMonth,
      endMonth,
    };

    // 상태 업데이트
    setActivities((prev) => [...prev, createdActivity]);
    // 활동 유형이 선택되지 않았다면 자동으로 선택
    setSelectedActivityTypes((prev) =>
      prev.includes(newActivity.typeId) ? prev : [...prev, newActivity.typeId]
    );
    // 폼 초기화 (월 정보는 유지)
    setNewActivity({
      typeId: newActivity.typeId,
      title: "",
      tags: "",
      isImportant: false,
      startMonth,
      endMonth,
    });
    setIsAddingActivity(false);
  };

  // 선택된 태그를 Set으로 변환 (빠른 조회를 위해)
  const matchingTagSet = useMemo(() => new Set(selectedTags), [selectedTags]);

  // 연도 증가 핸들러
  const incrementYear = () => setSelectedYear((prev) => prev + 1);
  // 연도 감소 핸들러
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
