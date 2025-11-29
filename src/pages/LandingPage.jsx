import { Button } from "../components/common";
import {
    Brain,
    MapPin,
    Kanban,
    FolderLock,
    FileText,
    ArrowRight,
    Sparkles,
    Target,
    TrendingUp,
    Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/LandingPage.styles";

export function LandingPage() {
    const navigate = useNavigate();
    const features = [
        {
            icon: Brain,
            title: "AI 온보딩",
            description: "전공, 직무, 기간을 입력하면 AI가 맞춤형 로드맵을 생성합니다.",
            color: "#2A5EE4"
        },
        {
            icon: MapPin,
            title: "맞춤 로드맵",
            description: "대회, 자격증, 프로젝트 등 목표 달성을 위한 최적의 경로를 제시합니다.",
            color: "#5F8EF8"
        },
        {
            icon: Kanban,
            title: "칸반 보드",
            description: "예정, 진행, 완료 단계로 활동을 관리하고 진행률을 시각화합니다.",
            color: "#2A5EE4"
        },
        {
            icon: FolderLock,
            title: "증빙 금고",
            description: "수료증, 결과물 등 모든 증빙자료를 한 곳에서 안전하게 보관합니다.",
            color: "#5F8EF8"
        },
        {
            icon: TrendingUp,
            title: "스킬 매트릭스",
            description: "현재와 목표 스킬을 시각화하고 성장 경로를 파악합니다.",
            color: "#2A5EE4"
        },
        {
            icon: FileText,
            title: "리포트 출력",
            description: "포트폴리오를 PDF로 내보내 취업 서류로 활용하세요.",
            color: "#5F8EF8"
        }
    ];

    const steps = [
        {
            number: "01",
            title: "정보 입력",
            description: "전공, 희망 직무, 준비 기간을 입력하세요"
        },
        {
            number: "02",
            title: "AI 분석",
            description: "AI가 최적의 로드맵을 생성합니다"
        },
        {
            number: "03",
            title: "활동 관리",
            description: "칸반 보드로 진행 상황을 추적하세요"
        },
        {
            number: "04",
            title: "리포트 출력",
            description: "완성된 포트폴리오를 PDF로 내보내세요"
        }
    ];

    return (
        <S.PageContainer>
            {/* Hero Section */}
            <S.HeroSection>
                <S.BackgroundGradients>
                    <S.Gradient1 />
                    <S.Gradient2 />
                </S.BackgroundGradients>

                <S.Container>
                    <S.HeroGrid>
                        <S.HeroContent>
                            <S.Badge>
                                <Sparkles style={{ height: '1rem', width: '1rem', color: '#2A5EE4' }} />
                                <span>AI 기반 포트폴리오 플래너</span>
                            </S.Badge>

                            <S.Title>
                                AI 기반 개인맞춤<br />포트폴리오 플래너<br />Re:Work
                            </S.Title>

                            <S.Description>
                                나의 전공과 직무에 맞는 AI 로드맵으로 전략적으로 커리어를 설계하세요.
                                <br />대회, 자격증, 프로젝트를 체계적으로 관리하고 성장을 시각화합니다.
                            </S.Description>

                            <S.ButtonGroup>
                                <Button
                                    $size="lg"
                                    $gradient
                                    onClick={() => navigate('/signup')}
                                >
                                    무료로 시작하기 <ArrowRight style={{ marginLeft: '0.5rem', height: '1rem', width: '1rem' }} />
                                </Button>
                                <Button
                                    $size="lg"
                                    $variant="outline"
                                    $borderColor="#2A5EE4"
                                    $textColor="#2A5EE4"
                                    $hoverBg="#E9F1FF"
                                    onClick={() => navigate('/login')}
                                >
                                    로그인
                                </Button>
                            </S.ButtonGroup>

                            <S.FeatureList>
                                <S.FeatureItem>
                                    <Check style={{ height: '1.25rem', width: '1.25rem', color: '#2A5EE4' }} />
                                    <span>무료로 시작</span>
                                </S.FeatureItem>
                                <S.FeatureItem>
                                    <Check style={{ height: '1.25rem', width: '1.25rem', color: '#2A5EE4' }} />
                                    <span>신용카드 불필요</span>
                                </S.FeatureItem>
                            </S.FeatureList>
                        </S.HeroContent>

                        <S.HeroImageContainer>
                            <S.ImageGradientBg />
                            <S.HeroImage
                                src="https://images.unsplash.com/photo-1717501219716-b93a67d2f7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc2MTk1NjgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="AI Technology"
                            />
                        </S.HeroImageContainer>
                    </S.HeroGrid>
                </S.Container>
            </S.HeroSection>

            {/* Features Section */}
            <S.FeaturesSection>
                <S.Container>
                    <S.SectionHeader>
                        <h2>주요 기능</h2>
                        <p>Re:Work의 강력한 기능들로 포트폴리오 준비를 더 쉽고 효율적으로</p>
                    </S.SectionHeader>

                    <S.FeaturesGrid>
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <S.FeatureCard key={index} $noBorder $shadow="sm">
                                    <S.FeatureIcon $bgColor={feature.color}>
                                        <Icon style={{ height: '1.5rem', width: '1.5rem', color: feature.color }} />
                                    </S.FeatureIcon>
                                    <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                                    <S.FeatureDescription>{feature.description}</S.FeatureDescription>
                                </S.FeatureCard>
                            );
                        })}
                    </S.FeaturesGrid>
                </S.Container>
            </S.FeaturesSection>

            {/* How It Works Section */}
            <S.StepsSection>
                <S.Container>
                    <S.SectionHeader>
                        <h2>어떻게 작동하나요?</h2>
                        <p>간단한 4단계로 나만의 포트폴리오를 완성하세요</p>
                    </S.SectionHeader>

                    <S.StepsGrid>
                        {steps.map((step, index) => (
                            <S.StepItem key={index}>
                                {index < steps.length - 1 && <S.StepConnector />}
                                <S.StepContent>
                                    <S.StepNumber>
                                        <span>{step.number}</span>
                                    </S.StepNumber>
                                    <S.StepTitle>{step.title}</S.StepTitle>
                                    <S.StepDescription>{step.description}</S.StepDescription>
                                </S.StepContent>
                            </S.StepItem>
                        ))}
                    </S.StepsGrid>

                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <Button
                            $size="lg"
                            $gradient
                            onClick={() => navigate('/signup')}
                        >
                            무료로 시작하기 <ArrowRight style={{ marginLeft: '0.5rem', height: '1rem', width: '1rem' }} />
                        </Button>
                    </div>
                </S.Container>
            </S.StepsSection>

            {/* CTA Section */}
            <S.CTASection>
                <S.CTAContainer>
                    <S.CTACard>
                        <Target style={{ margin: '0 auto 1.5rem', height: '4rem', width: '4rem', color: 'white' }} />
                        <S.CTATitle>오늘부터 전략적으로 준비하세요</S.CTATitle>
                        <S.CTADescription>
                            AI가 제안하는 맞춤 로드맵으로 효율적인 포트폴리오 준비를 시작하세요
                        </S.CTADescription>
                        <Button
                            $size="lg"
                            style={{ background: 'white', color: '#2A5EE4' }}
                            onClick={() => navigate('/signup')}
                        >
                            무료로 시작하기 <ArrowRight style={{ marginLeft: '0.5rem', height: '1rem', width: '1rem' }} />
                        </Button>
                    </S.CTACard>
                </S.CTAContainer>
            </S.CTASection>

            {/* Footer */}
            <S.Footer>
                <S.Container>
                    <S.FooterGrid>
                        <S.FooterBrand>
                            <S.BrandContainer>
                                <S.BrandIcon>
                                    <Brain style={{ height: '1.25rem', width: '1.25rem', color: 'white' }} />
                                </S.BrandIcon>
                                <S.BrandText>
                                    <S.BrandTitle>Re:Work</S.BrandTitle>
                                    <S.BrandSubtitle>AI Portfolio Planner</S.BrandSubtitle>
                                </S.BrandText>
                            </S.BrandContainer>
                            <S.BrandDescription>전략적 커리어 설계 플랫폼</S.BrandDescription>
                        </S.FooterBrand>

                        <S.FooterSection>
                            <h4>제품</h4>
                            <ul>
                                <li><a href="#">기능</a></li>
                                <li><a href="#">가격</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </S.FooterSection>

                        <S.FooterSection>
                            <h4>회사</h4>
                            <ul>
                                <li><a href="#">팀 소개</a></li>
                                <li><a href="#">블로그</a></li>
                                <li><a href="#">채용</a></li>
                            </ul>
                        </S.FooterSection>

                        <S.FooterSection>
                            <h4>지원</h4>
                            <ul>
                                <li><a href="#">문의하기</a></li>
                                <li><a href="#">이용약관</a></li>
                                <li><a href="#">개인정보처리방침</a></li>
                            </ul>
                        </S.FooterSection>
                    </S.FooterGrid>

                    <S.FooterBottom>
                        <p>&copy; 2025 Re:Work. All rights reserved.</p>
                    </S.FooterBottom>
                </S.Container>
            </S.Footer>
        </S.PageContainer>
    );
}
