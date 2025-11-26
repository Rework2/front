import styled from "styled-components";
import {MdDashboard, MdLocationOn, MdHub, MdShowChart, MdSettings} from "react-icons/md";

const Navigation = () => {
    return(
        <NavigationWrap>
            <LogoBox>
                <LogoText>
                    <h1>Re:work</h1>
                    <p>AI Portfolio Planner</p>
                </LogoText>
            </LogoBox>

            {/* 메뉴목록 */}
            <MenuList>
                <MenuItem $active>
                <span><MdDashboard /></span>
                <p>대시보드</p>
                </MenuItem>
                <MenuItem>
                <span><MdLocationOn /></span>
                <p>AI 로드맵</p>
                </MenuItem>
                <MenuItem>
                <span><MdHub /></span>
                <p>활동 관리 허브</p>
                </MenuItem>
                <MenuItem>
                <span><MdShowChart /></span>
                <p>성장 인사이트</p>
                </MenuItem>
            </MenuList>

            <SettingBox>
              <MdSettings size={20} color='#0F172A' />
              <SettingText>
                <p>settings</p>
              </SettingText>
            </SettingBox>
        </NavigationWrap>
    )
};
export default Navigation;


const NavigationWrap = styled.div`
    width: 255px;
    height: 100%;
    background: #ffffff;
    border-right: 1px solid #000000;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 0;
`;

const LogoBox = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 24px 24px;
    border-bottom: 1px solid #e5e8eb;
    width: 100%
    
`

const LogoText = styled.div`
    h1{
    font-size: 18px;
    font-weight: 700;
    color: #2a4ef0;
    margin: 0;
    }
    p {
    font-size: 12px;
    color: #6f7583;
    margin: 0;
    }
`;
const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  padding-left: 16px;
  padding-right: 0px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 0;
  cursor: pointer;
  border-radius: 8px;
  margin: 4px 16px;

  span {
    font-size: 20px;
    color: #444;
  }

  p {
    font-size: 15px;
    color: #333;
    font-weight: 500;
  }

  &:hover {
    background: #f3f6fa;
  }
`;

const SettingBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 28.67px 32px;
    border-top: 1px solid #e5e8eb;
    width: 100%;
    margin-top: auto;
`;

const SettingText = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    > p{
    font-size: 16px;
    font-weight: 600;
    color: #0F172AB2;
    margin: 0;
    }
`;
