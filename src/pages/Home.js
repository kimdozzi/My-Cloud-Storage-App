import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // 로그아웃을 처리하는 함수입니다.
  const handleLogout = () => {
    // 로컬 스토리지에서 토큰을 제거하여 사용자의 세션을 종료합니다.
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    // 로그아웃 후 로그인 페이지로 리디렉션합니다.
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {/* 로그아웃 버튼 */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
