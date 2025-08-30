import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from 'styled-components';
import GlobalStyle from "../GlobalStyle";
import MainPage from './pages/main/MainPage';
import CompletePage from "./pages/main/CompletePage";

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
