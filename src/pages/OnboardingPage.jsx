import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDefaultActivitiesForTargetJob } from "../components/roadmappage/utils";

const majors = ["컴퓨터공학", "소프트웨어공학", "정보통신공학", "빅데이터공학", "ai", "기타"];

const targetJobs = [
  "프론트엔드 개발자",
  "백엔드 개발자",
  "풀스택 개발자",
  "데이터 사이언티스트",
  "AI/ML 엔지니어",
];

const activityOptions = [
  { id: "competition", label: "공모전/대회" },
  { id: "certification", label: "자격증" },
  { id: "project", label: "개인/팀 프로젝트" },
  { id: "extracurricular", label: "대외활동" },
  { id: "internship", label: "인턴십" },
  { id: "study", label: "스터디/동아리" },
];

function OnboardingPage() {
  const navigate = useNavigate();
  const [major, setMajor] = useState(majors[0]);
  const [targetJob, setTargetJob] = useState(targetJobs[0]);
  const [selectedActivities, setSelectedActivities] = useState(
    activityOptions.map((option) => option.id)
  );
  const [preview, setPreview] = useState([]);

  const filteredPreview = useMemo(() => {
    return preview.filter((activity) => selectedActivities.includes(activity.id));
  }, [preview, selectedActivities]);

  const handleToggleActivity = (activityId) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
    );
  };

  const buildDefaultActivities = useMemo(() => {
    const generated = getDefaultActivitiesForTargetJob(targetJob);
    if (selectedActivities.length === 0) {
      return generated;
    }
    return generated.filter((activity) => selectedActivities.includes(activity.id));
  }, [targetJob, selectedActivities]);

  const handlePreview = () => {
    setPreview(buildDefaultActivities);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const defaults = buildDefaultActivities;
    localStorage.setItem("roadmap_defaultActivities", JSON.stringify(defaults));
    localStorage.setItem("roadmap_onboardingSelection", JSON.stringify({
      major,
      targetJob,
      activities: selectedActivities,
      generatedAt: new Date().toISOString(),
    }));
    navigate("/roadmap");
  };

  return (
    <div className="onboarding-page">
      <h1>온보딩</h1>
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <label className="onboarding-field">
          <span>전공</span>
          <select value={major} onChange={(event) => setMajor(event.target.value)}>
            {majors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="onboarding-field">
          <span>희망 직무</span>
          <select value={targetJob} onChange={(event) => setTargetJob(event.target.value)}>
            {targetJobs.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="onboarding-field">
          <legend>관심 활동</legend>
          <div className="activities-grid">
            {activityOptions.map((activity) => (
              <label key={activity.id}>
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity.id)}
                  onChange={() => handleToggleActivity(activity.id)}
                />
                {activity.label}
              </label>
            ))}
          </div>
          <p className="hint">project, study는 현재 자동 추천에서 제외됩니다.</p>
        </fieldset>

        <div className="onboarding-actions">
          <button type="button" onClick={handlePreview}>
            추천 미리보기
          </button>
          <button type="submit">로드맵 생성</button>
        </div>
      </form>

      {filteredPreview.length > 0 && (
        <div className="preview-card">
          <h2>생성될 기본 활동</h2>
          <ul>
            {filteredPreview.map((activity) => (
              <li key={activity.id}>
                <strong>{activity.label}</strong> ({activity.startYear || "-"}.{activity.startMonth || "-"}
                ~ {activity.endYear || "-"}.
                {activity.endMonth || "-"})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OnboardingPage;

