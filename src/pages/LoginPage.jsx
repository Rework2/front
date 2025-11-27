import { useState } from "react";
import { Button, Label, Alert, AlertDescription } from "../styles/CommonStyles";
import { Brain, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  LoginCard,
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
  RememberForgotRow,
  CheckboxLabel,
  DemoInfo,
  Divider,
  DividerText,
  TextCenter,
  BackButton
} from "../styles/LoginPage.styles";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // 이메일 validation
    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    // 비밀번호 validation
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) {
      return;
    }

    // 임시 로그인 로직 (실제로는 백엔드 API 호출)
    // 데모용으로 간단한 체크
    if (email === "demo@rework.com" && password === "demo123") {
      // 로그인 성공 - 대시보드로 이동
      navigate("/dashboard");
    } else {
      setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <PageContainer>
      <LoginCard>
        {/* Logo & Title */}
        <LogoSection>
          <LogoIcon>
            <Brain style={{ height: '2rem', width: '2rem', color: 'white' }} />
          </LogoIcon>
          <Title>Re:Work에 로그인</Title>
          <Subtitle>AI 기반 포트폴리오 준비 플래너</Subtitle>
        </LogoSection>

        {/* Login Error */}
        {loginError && (
          <Alert variant="error" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle style={{ height: '1rem', width: '1rem' }} />
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}

        {/* Login Form */}
        <Form onSubmit={handleLogin}>
          {/* Email Input */}
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
                value={email}
                error={errors.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: undefined });
                  setLoginError("");
                }}
              />
            </InputContainer>
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>

          {/* Password Input */}
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
                value={password}
                error={errors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: undefined });
                  setLoginError("");
                }}
              />
            </InputContainer>
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </FormGroup>

          {/* Remember & Forgot */}
          <RememberForgotRow>
            <CheckboxLabel>
              <input type="checkbox" />
              <span>로그인 상태 유지</span>
            </CheckboxLabel>
            <Button
              type="button"
              variant="link"
              style={{ fontSize: '0.875rem' }}
            >
              비밀번호 찾기
            </Button>
          </RememberForgotRow>

          {/* Login Button */}
          <Button
            type="submit"
            gradient
            style={{ padding: '1.5rem', width: '100%' }}
          >
            로그인
            <ArrowRight style={{ marginLeft: '0.5rem', height: '1.25rem', width: '1.25rem' }} />
          </Button>
        </Form>

        {/* Demo Account Info */}
        <DemoInfo>
          <p>데모 계정으로 체험하기</p>
          <p className="info-text">이메일: demo@rework.com</p>
          <p className="info-text">비밀번호: demo123</p>
        </DemoInfo>

        {/* Divider */}
        <Divider>
          <DividerText>또는</DividerText>
        </Divider>

        {/* Sign Up Link */}
        <TextCenter>
          <p>
            아직 계정이 없으신가요?{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/signup")}
            >
              무료로 시작하기
            </Button>
          </p>
        </TextCenter>

        {/* Back to Landing */}
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
      </LoginCard>
    </PageContainer>
  );
}