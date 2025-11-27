import { useState } from "react";
import { Button, Label, AlertDescription } from "../styles/CommonStyles";
import { Brain, Lock, Mail, Calendar, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  SignUpCard,
  LogoSection,
  LogoIcon,
  Title,
  Subtitle,
  Form,
  FormGroup,
  InputContainer,
  InputIcon,
  StyledInput,
  ErrorText,
  CheckboxLabel,
  PasswordStrength,
  StrengthItem,
  TextCenter,
  BackButton,
  SuccessAlert
} from "../styles/SignUpPage.styles";

export function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // 이메일 validation
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    // 비밀번호 validation
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "영문 대소문자, 숫자를 포함해야 합니다.";
    }

    // 비밀번호 확인
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호를 다시 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 생년월일 validation
    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일을 입력해주세요.";
    } else {
      const birthYear = new Date(formData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      if (age < 14) {
        newErrors.birthDate = "만 14세 이상만 가입 가능합니다.";
      } else if (age > 100) {
        newErrors.birthDate = "올바른 생년월일을 입력해주세요.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!acceptTerms) {
      alert("이용약관에 동의해주세요.");
      return;
    }

    // 회원가입 성공 - 온보딩으로 이동
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/onboarding");
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const passwordStrength = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password)
  };

  return (
    <PageContainer>
      <SignUpCard>
        <LogoSection>
          <LogoIcon>
            <Brain style={{ height: '2rem', width: '2rem', color: 'white' }} />
          </LogoIcon>
          <Title>Re:Work 시작하기</Title>
          <Subtitle>AI 기반 포트폴리오 준비를 시작하세요</Subtitle>
        </LogoSection>

        {showSuccess && (
          <SuccessAlert variant="success">
            <Check style={{ height: '1rem', width: '1rem' }} />
            <AlertDescription>회원가입이 완료되었습니다! 온보딩 페이지로 이동합니다...</AlertDescription>
          </SuccessAlert>
        )}

        <Form onSubmit={handleSignUp}>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <InputContainer>
              <InputIcon>
                <Mail style={{ height: '1.25rem', width: '1.25rem' }} />
              </InputIcon>
              <StyledInput
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                error={errors.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </InputContainer>
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <InputContainer>
              <InputIcon>
                <Lock style={{ height: '1.25rem', width: '1.25rem' }} />
              </InputIcon>
              <StyledInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                error={errors.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </InputContainer>
            {errors.password && <ErrorText>{errors.password}</ErrorText>}

            {formData.password && (
              <PasswordStrength>
                <StrengthItem met={passwordStrength.length}>
                  <Check style={{ height: '0.75rem', width: '0.75rem' }} />
                  <span>최소 8자 이상</span>
                </StrengthItem>
                <StrengthItem met={passwordStrength.uppercase}>
                  <Check style={{ height: '0.75rem', width: '0.75rem' }} />
                  <span>대문자 포함</span>
                </StrengthItem>
                <StrengthItem met={passwordStrength.lowercase}>
                  <Check style={{ height: '0.75rem', width: '0.75rem' }} />
                  <span>소문자 포함</span>
                </StrengthItem>
                <StrengthItem met={passwordStrength.number}>
                  <Check style={{ height: '0.75rem', width: '0.75rem' }} />
                  <span>숫자 포함</span>
                </StrengthItem>
              </PasswordStrength>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <InputContainer>
              <InputIcon>
                <Lock style={{ height: '1.25rem', width: '1.25rem' }} />
              </InputIcon>
              <StyledInput
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                error={errors.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              />
            </InputContainer>
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="birthDate">생년월일</Label>
            <InputContainer>
              <InputIcon>
                <Calendar style={{ height: '1.25rem', width: '1.25rem' }} />
              </InputIcon>
              <StyledInput
                id="birthDate"
                type="date"
                value={formData.birthDate}
                error={errors.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
              />
            </InputContainer>
            {errors.birthDate && <ErrorText>{errors.birthDate}</ErrorText>}
          </FormGroup>

          <CheckboxLabel>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span>이용약관 및 개인정보처리방침에 동의합니다</span>
          </CheckboxLabel>

          <Button
            type="submit"
            gradient
            style={{ padding: '1.5rem', width: '100%' }}
          >
            회원가입
            <ArrowRight style={{ marginLeft: '0.5rem', height: '1.25rem', width: '1.25rem' }} />
          </Button>
        </Form>

        <TextCenter style={{ marginTop: '1.5rem' }}>
          <p>
            이미 계정이 있으신가요?{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/login")}
            >
              로그인
            </Button>
          </p>
        </TextCenter>

        <BackButton>
          <Button
            type="button"
            variant="ghost"
            textColor="rgba(15, 23, 42, 0.6)"
            onClick={() => navigate("/")}
          >
            ← 메인으로 돌아가기
          </Button>
        </BackButton>
      </SignUpCard>
    </PageContainer>
  );
}
