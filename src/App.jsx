import { Route, HashRouter as Router, Routes } from "react-router-dom";
import styled from 'styled-components';
import GlobalStyle from "../GlobalStyle";
import MainPage from './pages/main/MainPage';
import CompletePage from "./pages/main/CompletePage";
/**
 * 라우팅 설정 '/' 메인페이지 '/complete' 완료페이지
 * 해쉬라우터 -> #를 사용함으로서 깃허브 페이지 서버에 요청하는 과정에서 404에러 방지
 */
function App() {
  return (
    <>
      <Container>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/complete" element={<CompletePage />} />
          </Routes>
        </Router>
      </Container>
    </>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
`;

export default App;
