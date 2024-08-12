import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // refreshToken 쿠키 확인 함수
    console.log(document.cookie);
    const getRefreshTokenFromCookies = () => {
      const cookies = document.cookie.split("; ");
      const refreshTokenCookie = cookies.find((cookie) =>
        cookie.startsWith("refresh=")
      );
      if (refreshTokenCookie) {
        return refreshTokenCookie.split("=")[1]; // refreshToken 값을 반환
      }
      return null;
    };

    const refreshToken = getRefreshTokenFromCookies();
    console.log(refreshToken);
    if (refreshToken) {
      // refreshToken이 쿠키에 존재할 경우 서버에 accessToken 요청
      axios
        .post(
          "http://localhost:8080/auth/token/refresh",
          {},
          {
            headers: {
              refresh: `${refreshToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);

          // 서버 응답 헤더에서 access와 refresh 토큰 가져오기
          const accessToken = response.headers["access"];

          // 토큰이 존재할 경우 로컬 스토리지에 저장
          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            // 사용자 정보를 상태로 설정
            const userData = response.data;
            setUserInfo({
              name: userData.name,
              email: userData.email,
              role: userData.role,
            });
          } else {
            // 토큰이 없으면 로그인 페이지로 리디렉션
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error(
            "Failed to refresh tokens:",
            error.response ? error.response.data : error.message
          );
          // 토큰 갱신 실패 시 로그인 페이지로 리디렉션
          navigate("/login");
        });
    } else {
      // refreshToken이 없으면 로그인 페이지로 리디렉션
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Login Successful</h2>
      <p>Your tokens are now stored in localStorage.</p>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Role: {userInfo.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Success;
