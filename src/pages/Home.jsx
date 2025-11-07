import styled from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <HomeWrap>
            <HomeTitle>홈 페이지입니다.(테스트)</HomeTitle>
            <LoginLink to="/login">Login</LoginLink>
        </HomeWrap>
    )
}

export default Home;

const HomeWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 100vh;   /* 화면 전체 높이 기준 */
`

const HomeTitle = styled.div`
    font-size: 50px;
    color: black;
`;

const LoginLink = styled(Link)`
    padding: 8px 16px;
  margin: 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 8px;

  &:hover {
    background-color: #45a049;
  }
`;