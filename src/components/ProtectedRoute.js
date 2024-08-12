import React from "react";
import { Navigate } from "react-router-dom";

// 보호된 라우트를 구현하는 컴포넌트입니다.
const ProtectedRoute = ({ component: Component }) => {
  // 로컬 스토리지에서 액세스 토큰을 가져옵니다.
  const accessToken = localStorage.getItem("access");

  // 액세스 토큰이 있는지 확인하고, 없다면 로그인 페이지로 리디렉션합니다.
  return accessToken ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
