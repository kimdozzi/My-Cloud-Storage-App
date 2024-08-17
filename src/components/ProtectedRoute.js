import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// 보호된 라우트를 구현하는 컴포넌트입니다.
const ProtectedRoute = ({ component: Component }) => {
  // 로컬 스토리지에서 액세스 토큰을 가져옵니다.
  const accessToken = localStorage.getItem("access");

  // 액세스 토큰의 만료 여부를 확인하는 함수입니다.
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const decodedToken = jwtDecode(token); // 토큰을 디코딩합니다.
      const currentTime = Date.now() / 1000; // 현재 시간을 초 단위로 가져옵니다.

      return decodedToken.exp < currentTime; // 만료 시간과 현재 시간을 비교하여 만료 여부를 반환합니다.
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true; // 토큰 디코딩에 실패한 경우 만료된 것으로 간주합니다.
    }
  };

  // 액세스 토큰이 없거나 만료되었는지 확인하고, 없다면 로그인 페이지로 리디렉션합니다.
  if (!accessToken || isTokenExpired(accessToken)) {
    return <Navigate to="/login" />;
  }

  // 액세스 토큰이 유효한 경우, 보호된 컴포넌트를 렌더링합니다.
  return <Component />;
};

export default ProtectedRoute;
