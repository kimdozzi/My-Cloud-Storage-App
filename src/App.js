import React from "react";
// BrowserRouter를 이용해 클라이언트 사이드 라우팅을 설정합니다.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// 필요한 페이지 컴포넌트를 임포트합니다.
import Login from "./pages/Login";
import Home from "./pages/Home";
import Success from "./pages/Success";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    // Router를 사용하여 애플리케이션 라우팅을 설정합니다.
    //# element={<ProtectedRoute component={Success} />
    <Router>
      <Routes>
        {/* 로그인 페이지 라우팅 */}
        <Route path="/login" element={<Login />} />

        {/* 성공 페이지 라우팅 */}
        <Route path="/success" element={<Success />} />

        {/* 보호된 홈 페이지 라우팅 */}
        <Route path="/" element={<ProtectedRoute component={Home} />} />
      </Routes>
    </Router>
  );
}

export default App;
