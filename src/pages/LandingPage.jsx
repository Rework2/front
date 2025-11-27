import { Button } from "../styles/CommonStyles";
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
import {
    PageContainer,
    HeroSection,
    BackgroundGradients,
    Gradient1,
    Gradient2,
    Container,
    HeroGrid,
    HeroContent,
    Badge,
    Title,
    Description,
    ButtonGroup,
    FeatureList,
    FeatureItem,
    HeroImageContainer,
    ImageGradientBg,
    HeroImage,
    FeaturesSection,
    SectionHeader,
    FeaturesGrid,
    FeatureCard,
    FeatureIcon,
    FeatureTitle,
    FeatureDescription,
    StepsSection,
    StepsGrid,
    StepItem,
    StepConnector,
    StepContent,
    StepNumber,
    StepTitle,
    StepDescription,
    CTASection,
    CTAContainer,
    CTACard,
    CTATitle,
    CTADescription,
    Footer,
    FooterGrid,
    FooterSection,
    FooterBrand,
    BrandContainer,
    BrandIcon,
    BrandText,
    BrandTitle,
    BrandSubtitle,
    BrandDescription,
    FooterBottom
} from "../styles/LandingPage.styles";

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
        <PageContainer>
            {/* Hero Section */}
            <HeroSection>
                <BackgroundGradients>
                    <Gradient1 />
                    <Gradient2 />
                </BackgroundGradients>

                <Container>
                    <HeroGrid>
                        <HeroContent>
                            <Badge>
                                <Sparkles style={{ height: '1rem', width: '1rem', color: '#2A5EE4' }} />
                                <span>AI 기반 포트폴리오 플래너</span>
                            </Badge>

                            <Title>
                                AI 기반 개인맞춤<br />포트폴리오 플래너<br />Re:Work
                            </Title>

                            <Description>
                                나의 전공과 직무에 맞는 AI 로드맵으로 전략적으로 커리어를 설계하세요.
                                <br />대회, 자격증, 프로젝트를 체계적으로 관리하고 성장을 시각화합니다.
                            </Description>

                            <ButtonGroup>
                                <Button
                                    size="lg"
                                    gradient
                                    onClick={() => navigate('/signup')}
                                >
                                    무료로 시작하기 <ArrowRight style={{ marginLeft: '0.5rem', height: '1rem', width: '1rem' }} />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    borderColor="#2A5EE4"
                                    textColor="#2A5EE4"
                                    hoverBg="#E9F1FF"
                                    onClick={() => navigate('/login')}
                                >
                                    로그인
                                </Button>
                            </ButtonGroup>

                            <FeatureList>
                                <FeatureItem>
                                    <Check style={{ height: '1.25rem', width: '1.25rem', color: '#2A5EE4' }} />
                                    <span>무료로 시작</span>
                                </FeatureItem>
                                <FeatureItem>
                                    <Check style={{ height: '1.25rem', width: '1.25rem', color: '#2A5EE4' }} />
                                    <span>신용카드 불필요</span>
                                </FeatureItem>
                            </FeatureList>
                        </HeroContent>

                        <HeroImageContainer>
                            <ImageGradientBg />
                            <HeroImage
                                src="https://images.unsplash.com/photo-1717501219716-b93a67d2f7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc2MTk1NjgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="AI Technology"
                            />
                        </HeroImageContainer>
                    </HeroGrid>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <FeaturesSection>
                <Container>
                    <SectionHeader>
                        <h2>주요 기능</h2>
                        <p>Re:Work의 강력한 기능들로 포트폴리오 준비를 더 쉽고 효율적으로</p>
                    </SectionHeader>

                    <FeaturesGrid>
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <FeatureCard key={index} noBorder shadow="sm">
                                    <FeatureIcon bgColor={feature.color}>
                                        <Icon style={{ height: '1.5rem', width: '1.5rem', color: feature.color }} />
                                    </FeatureIcon>
                                    <FeatureTitle>{feature.title}</FeatureTitle>
                                    <FeatureDescription>{feature.description}</FeatureDescription>
                                </FeatureCard>
                            );
                        })}
                    </FeaturesGrid>
                </Container>
            </FeaturesSection>

            {/* How It Works Section */}
            <StepsSection>
                <Container>
                    <SectionHeader>
                        <h2>어떻게 작동하나요?</h2>
                        <p>간단한 4단계로 나만의 포트폴리오를 완성하세요</p>
                    </SectionHeader>

                    <StepsGrid>
                        {steps.map((step, index) => (
                            <StepItem key={index}>
                                {index < steps.length - 1 && <StepConnector />}
                                <StepContent>
                                    <StepNumber>
                                        <span>{step.number}</span>
                                    </StepNumber>
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </StepContent>
                            </StepItem>
                        ))}
                    </StepsGrid>

                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <Button
                            size="lg"
                            gradient
                            onClick={() => navigate('/signup')}
                        >
                            무료로 시작하기 <ArrowRight style={{ marginLeft: '0.5rem', height: '1rem', width: '1rem' }} />
                        </Button>
                    </div>
                </Container>
            </StepsSection>

            {/* CTA Section */}
            <CTASection>
                <CTAContainer>
                    <CTACard>
                        <Target style={{ margin: '0 auto 1.5rem', height: '4rem', width: '4rem', color: 'white' }} />
                        <CTATitle>오늘부터 전략적으로 준비하세요</CTATitle>
                        <CTADescription>
                            AI가 제안하는 맞춤 로드맵으로 효율적인 포트폴리오 준비를 시작하세요
                        </CTADescription>
                        <Button
                            size="lg"
                            style={{ background: 'white', color: '#2A5EE4' }}
                            onClick={() => navigate('/signup')}
                        >
                            무료로 시작하기 <ArrowRight style={{ marginLeft: '0.5rem', height: '1rem', width: '1rem' }} />
                        </Button>
                    </CTACard>
                </CTAContainer>
            </CTASection>

            {/* Footer */}
            <Footer>
                <Container>
                    <FooterGrid>
                        <FooterBrand>
                            <BrandContainer>
                                <BrandIcon>
                                    <Brain style={{ height: '1.25rem', width: '1.25rem', color: 'white' }} />
                                </BrandIcon>
                                <BrandText>
                                    <BrandTitle>Re:Work</BrandTitle>
                                    <BrandSubtitle>AI Portfolio Planner</BrandSubtitle>
                                </BrandText>
                            </BrandContainer>
                            <BrandDescription>전략적 커리어 설계 플랫폼</BrandDescription>
                        </FooterBrand>

                        <FooterSection>
                            <h4>제품</h4>
                            <ul>
                                <li><a href="#">기능</a></li>
                                <li><a href="#">가격</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </FooterSection>

                        <FooterSection>
                            <h4>회사</h4>
                            <ul>
                                <li><a href="#">팀 소개</a></li>
                                <li><a href="#">블로그</a></li>
                                <li><a href="#">채용</a></li>
                            </ul>
                        </FooterSection>

                        <FooterSection>
                            <h4>지원</h4>
                            <ul>
                                <li><a href="#">문의하기</a></li>
                                <li><a href="#">이용약관</a></li>
                                <li><a href="#">개인정보처리방침</a></li>
                            </ul>
                        </FooterSection>
                    </FooterGrid>

                    <FooterBottom>
                        <p>&copy; 2025 Re:Work. All rights reserved.</p>
                    </FooterBottom>
                </Container>
            </Footer>
        </PageContainer>
    );
}
