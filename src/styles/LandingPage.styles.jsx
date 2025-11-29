import styled from "styled-components";
import { Card } from "../components/common";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.white};
`;

export const HeroSection = styled.section`
  position: relative;
  padding: 8rem 1.5rem 6rem;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 6rem 1.5rem 4rem;
  }
`;

export const BackgroundGradients = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

export const Gradient1 = styled.div`
  position: absolute;
  top: -10%;
  right: -5%;
  width: 40%;
  height: 60%;
  background: radial-gradient(circle, rgba(42, 94, 228, 0.15) 0%, transparent 70%);
  filter: blur(60px);
`;

export const Gradient2 = styled.div`
  position: absolute;
  bottom: -10%;
  left: -5%;
  width: 40%;
  height: 60%;
  background: radial-gradient(circle, rgba(95, 142, 248, 0.15) 0%, transparent 70%);
  filter: blur(60px);
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
`;

export const HeroGrid = styled.div`
  display: grid;
  gap: 4rem;
  align-items: center;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primaryLighter};
  border-radius: ${props => props.theme.borderRadius.full};
  margin-bottom: 1.5rem;
  
  span {
    color: ${props => props.theme.colors.primary};
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.25rem;
  }
`;

export const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.75;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 2rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const FeatureList = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    color: ${props => props.theme.colors.textLight};
    font-size: 0.875rem;
  }
`;

export const HeroImageContainer = styled.div`
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

export const ImageGradientBg = styled.div`
  position: absolute;
  inset: -2rem;
  background: linear-gradient(
    to bottom right,
    ${props => props.theme.colors.primaryLighter},
    ${props => props.theme.colors.white}
  );
  border-radius: ${props => props.theme.borderRadius['2xl']};
  opacity: 0.5;
`;

export const HeroImage = styled.img`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  box-shadow: ${props => props.theme.shadows['2xl']};
`;

export const FeaturesSection = styled.section`
  padding: 6rem 1.5rem;
  background: ${props => props.theme.colors.backgroundLight};
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: 2.25rem;
    font-weight: 700;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.125rem;
    color: ${props => props.theme.colors.textLight};
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const FeatureCard = styled(Card)`
  padding: 2rem;
  text-align: center;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

export const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$bgColor}15;
  border-radius: ${props => props.theme.borderRadius.xl};
`;

export const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
`;

export const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`;

export const StepsSection = styled.section`
  padding: 6rem 1.5rem;
  background: ${props => props.theme.colors.white};
`;

export const StepsGrid = styled.div`
  display: grid;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StepItem = styled.div`
  position: relative;
`;

export const StepConnector = styled.div`
  display: none;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
    position: absolute;
    top: 2rem;
    left: 100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.primaryLight}
    );
    opacity: 0.3;
  }
`;

export const StepContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const StepNumber = styled.div`
  width: 4rem;
  height: 4rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.primaryLight}
  );
  border-radius: ${props => props.theme.borderRadius.xl};
  
  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.white};
  }
`;

export const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
`;

export const StepDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`;

export const CTASection = styled.section`
  padding: 6rem 1.5rem;
  background: ${props => props.theme.colors.backgroundLight};
`;

export const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const CTACard = styled.div`
  background: linear-gradient(
    to bottom right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.primaryLight}
  );
  border-radius: ${props => props.theme.borderRadius['2xl']};
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: ${props => props.theme.shadows['2xl']};
`;

export const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

export const CTADescription = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.white};
  opacity: 0.9;
  margin-bottom: 2rem;
`;

export const Footer = styled.footer`
  padding: 4rem 1.5rem 2rem;
  background: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.borderLight};
`;

export const FooterGrid = styled.div`
  display: grid;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

export const FooterSection = styled.div`
  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.75rem;
      
      a {
        color: ${props => props.theme.colors.textLight};
        text-decoration: none;
        transition: ${props => props.theme.transitions.default};
        
        &:hover {
          color: ${props => props.theme.colors.primary};
        }
      }
    }
  }
`;

export const FooterBrand = styled.div``;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const BrandIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.primaryLight}
  );
  border-radius: ${props => props.theme.borderRadius.lg};
`;

export const BrandText = styled.div``;

export const BrandTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

export const BrandSubtitle = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textLight};
`;

export const BrandDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`;

export const FooterBottom = styled.div`
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.borderLight};
  text-align: center;
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 0.875rem;
  }
`;
