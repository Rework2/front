import styled from "styled-components";

export const RoadmapPageContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const Header = styled.header`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
`;

export const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const CategoryTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const TagChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

export const YearControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`;

export const YearControlIcon = styled.span`
  width: 1rem;
  height: 1rem;
  color: #64748b;
`;

export const YearControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

export const YearControlValue = styled.span`
  font-weight: 600;
  color: #0f172a;
  min-width: 3rem;
  text-align: center;
`;

export const FilterPanel = styled.aside`
  width: 300px;
  flex-shrink: 0;
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const FilterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1.5rem;
`;

export const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.75rem;
`;

export const MonthRangeContainer = styled.div`
  padding: 0 0.5rem;
`;

export const MonthRangeSliders = styled.div`
  position: relative;
  height: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const MonthRangeTrack = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: #e2e8f0;
  transform: translateY(-50%);
  border-radius: 2px;
`;

export const MonthRangeTrackFill = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  background: #3b82f6;
  border-radius: 2px;
`;

export const MonthSlider = styled.input`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  -webkit-appearance: none;
  background: transparent;
  pointer-events: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: white;
    border: 2px solid #3b82f6;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

export const MonthRangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
`;

export const ActivityTypeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const ActivityTypeOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0;

  input {
    cursor: pointer;
  }
`;

export const ActivityTypeIndicator = styled.span`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.25rem;
`;

export const ActivityTypeLabel = styled.span`
  font-size: 0.875rem;
  color: #334155;
`;

export const InlineAddFormContainer = styled.div`
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
`;

export const InlineAddFormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const InlineAddFormActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const InlineAddFormButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: #3b82f6;
  color: white;
`;

export const InlineAddFormButtonGhost = styled(InlineAddFormButton)`
  background: transparent;
  color: #64748b;

  &:hover {
    background: #e2e8f0;
    color: #334155;
  }
`;

export const ImportanceDescription = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  background-color: white;
  border-color: #e2e8f0;
  color: #64748b;
  width: 100%;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

export const AddButtonBlock = styled(AddButton)`
  background-color: #eff6ff;
  color: #2563eb;
  border-color: transparent;

  &:hover {
    background-color: #dbeafe;
  }
`;

export const AddActivityCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const AddActivityCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  padding: 0.25rem;

  &:hover {
    color: #64748b;
  }
`;

export const AddActivityCardForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AddActivityCardField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &--split {
    flex-direction: row;
    gap: 0.5rem;

    > div {
      flex: 1;
    }
  }
`;

export const AddActivityCardLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
`;

export const AddActivityCardInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

export const AddActivityCardSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

export const ImportantCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #334155;
  cursor: pointer;
`;

export const AddActivityCardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

export const SecondaryButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow-x: auto;
`;

export const TimelineContainer = styled.div`
  min-width: 800px;
`;

export const TimelineHeaderContainer = styled.div`
  display: grid;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
`;

export const MonthColumn = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
`;

export const TimelineRowContainer = styled.div`
  display: grid;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

export const RowLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  padding-right: 1rem;
`;

export const TimelineRowPlaceholder = styled.div`
  grid-column: 2 / -1;
  color: #cbd5e1;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 0.5rem;
`;

export const ActivityBarContainer = styled.div`
  padding: 0 2px;
`;

export const ActivityBar = styled.div`
  position: relative;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  &--matched {
    border: 2px solid #3b82f6;
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
  }
`;

export const ActivityBarContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  overflow: hidden;
`;

export const ActivityBarStar = styled.span`
  color: #fbbf24;
  font-size: 1rem;
  flex-shrink: 0;
`;

export const ActivityBarTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

export const TooltipContent = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-0.5rem);
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  min-width: 200px;
  max-width: 300px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 1000;
  margin-bottom: 0.5rem;
`;

export const TooltipTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.5rem;
`;

export const TooltipMeta = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

export const TooltipTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

export const TooltipTag = styled.span`
  display: inline-block;
  padding: 0.125rem 0.5rem;
  background: #f1f5f9;
  color: #475569;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const TimelineEmpty = styled.div`
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
  font-size: 0.875rem;
`;

