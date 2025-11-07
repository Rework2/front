import styled from "styled-components";

const LoginPage = () => {
    return (
        <LoginWrap>
            <LoginTitle>로그인 페이지입니다.(테스트)</LoginTitle>
        </LoginWrap>
    )
}

export default LoginPage;

const LoginWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 100vh;   /* 화면 전체 높이 기준 */
`;

const LoginTitle = styled.div`
    font-size: 50px;
    color: black;
`;