import { useState, useEffect } from "react";
import { Button, Label } from "../components/common";
import { ArrowRight, ArrowLeft, Sparkles, GraduationCap, Briefcase, Calendar, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/OnboardingPage.styles";

const ONBOARDING_STORAGE_KEY = "rework_onboarding";

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    major: "",
    targetJob: "",
    preparationPeriod: "",
    preferredActivities: [],
    targetCompany: ""
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const majors = [
    "컴퓨터공학", "소프트웨어공학", "정보통신공학", "전자공학"
  ];

  const targetJobs = [
    "프론트엔드 개발자", "백엔드 개발자", "풀스택 개발자", "데이터 사이언티스트",
    "AI/ML 엔지니어"
  ];

  const activities = [
    { id: "competition", label: "공모전/대회" },
    { id: "certification", label: "자격증" },
    { id: "project", label: "개인/팀 프로젝트" },
    { id: "extracurricular", label: "대외활동" },
    { id: "internship", label: "인턴십" },
    { id: "study", label: "스터디/동아리" }
  ];

  // ✅ 처음 로드될 때 localStorage에서 값 읽어오기
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (parsed.formData) {
        setFormData(prev => ({
          ...prev,
          ...parsed.formData,
        }));
      }
      if (parsed.step) {
        setStep(parsed.step);
      }
    } catch (e) {
      console.error("Failed to parse onboarding data from localStorage:", e);
    }
  }, []);

  // ✅ step이나 formData가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      step,
      formData,
    };

    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(payload));
  }, [step, formData]);

  const handleActivityToggle = (activityId) => {
    setFormData(prev => {
      const exists = prev.preferredActivities.includes(activityId);
      const nextActivities = exists
        ? prev.preferredActivities.filter(id => id !== activityId)
        : [...prev.preferredActivities, activityId];

      return {
        ...prev,
        preferredActivities: nextActivities,
      };
    });
  };

  const handleSubmit = () => {
    // ✅ 여기서도 한 번 더 저장 (혹시 몰라서)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        ONBOARDING_STORAGE_KEY,
        JSON.stringify({ step: totalSteps, formData })
      );

      // 온보딩 완료 플래그도 저장해두면 편함
      window.localStorage.setItem(
        "rework_onboarding_completed",
        "true"
      );
    }

    // 대시보드로 이동
    navigate("/dashboard");
  };

  const getStepIcon = (stepNumber) => {
    switch (stepNumber) {
      case 1: return GraduationCap;
      case 2: return Briefcase;
      case 3: return Calendar;
      case 4: return Target;
      default: return GraduationCap;
    }
  };

  return (
    <S.PageContainer>
      <S.Container>
        <S.Header>
          <S.Badge>
            <Sparkles style={{ height: '1rem', width: '1rem', color: '#2A5EE4' }} />
            <span>AI 맞춤 로드맵 생성</span>
          </S.Badge>
          <S.Title>나만의 포트폴리오 로드맵을 만들어보세요</S.Title>
          <S.Description>몇 가지 정보만 입력하면 AI가 최적의 경로를 제안해드립니다</S.Description>
        </S.Header>

        <S.ProgressSection>
          <S.ProgressInfo>
            <span>단계 {step} / {totalSteps}</span>
            <span className="percentage">{Math.round(progress)}%</span>
          </S.ProgressInfo>
          <S.ProgressBar>
            <S.ProgressFill $value={progress} />
          </S.ProgressBar>
        </S.ProgressSection>

        <S.StepIndicators>
          {[1, 2, 3, 4].map((s) => {
            const StepIcon = getStepIcon(s);
            return (
              <S.StepIndicator key={s}>
                <S.StepCircle $active={step === s} $completed={step > s}>
                  <StepIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                </S.StepCircle>
                <S.StepLabel $active={step === s}>단계 {s}</S.StepLabel>
              </S.StepIndicator>
            );
          })}
        </S.StepIndicators>

        <S.FormCard>
          {step === 1 && (
            <S.FormGrid>
              <S.FormTitle>
                <GraduationCap style={{ width: '1.5rem', height: '1.5rem' }} />
                전공 정보를 입력해주세요
              </S.FormTitle>
              <div>
                <Label htmlFor="major">전공</Label>
                <S.Select
                  id="major"
                  value={formData.major}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, major: e.target.value }))
                  }
                >
                  <option value="">전공을 선택하세요</option>
                  {majors.map(major => (
                    <option key={major} value={major}>{major}</option>
                  ))}
                </S.Select>
              </div>
            </S.FormGrid>
          )}

          {step === 2 && (
            <S.FormGrid>
              <S.FormTitle>
                <Briefcase style={{ width: '1.5rem', height: '1.5rem' }} />
                희망 직무를 선택해주세요
              </S.FormTitle>
              <div>
                <Label htmlFor="targetJob">희망 직무</Label>
                <S.Select
                  id="targetJob"
                  value={formData.targetJob}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, targetJob: e.target.value }))
                  }
                >
                  <option value="">직무를 선택하세요</option>
                  {targetJobs.map(job => (
                    <option key={job} value={job}>{job}</option>
                  ))}
                </S.Select>
              </div>
            </S.FormGrid>
          )}

          {step === 3 && (
            <S.FormGrid>
              <S.FormTitle>
                <Calendar style={{ width: '1.5rem', height: '1.5rem' }} />
                준비 기간을 설정해주세요
              </S.FormTitle>
              <div>
                <Label htmlFor="preparationPeriod">준비 기간</Label>
                <S.Select
                  id="preparationPeriod"
                  value={formData.preparationPeriod}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, preparationPeriod: e.target.value }))
                  }
                >
                  <option value="">기간을 선택하세요</option>
                  <option value="3months">3개월</option>
                  <option value="6months">6개월</option>
                  <option value="12months">12개월</option>
                  <option value="flexible">유동적</option>
                </S.Select>
              </div>
            </S.FormGrid>
          )}

          {step === 4 && (
            <S.FormGrid>
              <S.FormTitle>
                <Target style={{ width: '1.5rem', height: '1.5rem' }} />
                관심 활동을 선택해주세요
              </S.FormTitle>
              <S.CheckboxGrid>
                {activities.map(activity => (
                  <S.CheckboxLabel
                    key={activity.id}
                    $checked={formData.preferredActivities.includes(activity.id)}
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferredActivities.includes(activity.id)}
                      onChange={() => handleActivityToggle(activity.id)}
                    />
                    <span>{activity.label}</span>
                  </S.CheckboxLabel>
                ))}
              </S.CheckboxGrid>
            </S.FormGrid>
          )}
        </S.FormCard>

        <S.NavigationRow>
          {step > 1 && (
            <Button
              $variant="outline"
              $borderColor="#2A5EE4"
              $textColor="#2A5EE4"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft style={{ marginRight: '0.5rem', width: '1rem', height: '1rem' }} />
              이전
            </Button>
          )}
          {step < totalSteps ? (
            <Button
              $gradient
              style={{ marginLeft: 'auto' }}
              onClick={() => setStep(step + 1)}
            >
              다음
              <ArrowRight style={{ marginLeft: '0.5rem', width: '1rem', height: '1rem' }} />
            </Button>
          ) : (
            <Button
              $gradient
              style={{ marginLeft: 'auto' }}
              onClick={handleSubmit}
            >
              시작하기
              <ArrowRight style={{ marginLeft: '0.5rem', width: '1rem', height: '1rem' }} />
            </Button>
          )}
        </S.NavigationRow>
      </S.Container>
    </S.PageContainer>
  );
}
