import React from "react";

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <div>
        {/* Google 로그인 버튼 */}
        <button
          onClick={() =>
            (window.location.href =
              "http://localhost:8080/oauth2/authorization/google")
          }
        >
          Login with Google
        </button>
        {/* Naver 로그인 버튼 */}
        <button
          onClick={() =>
            (window.location.href =
              "http://localhost:8080/oauth2/authorization/naver")
          }
        >
          Login with Naver
        </button>
      </div>
    </div>
  );
};

export default Login;
