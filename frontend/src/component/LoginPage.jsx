import React, { useState, useEffect } from "react";
import loginSvg from "../assets/login.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sayfa düzenlemeleri için useEffect
  useEffect(() => {
    // HTML ve Body etiketlerini tam sayfa yapma
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    
    // Zoom kontrolü için meta viewport etiketi ekleme
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
    
    // Zoom engelleme için event listener
    const preventZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
      }
    });
    
    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.head.removeChild(meta);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Giriş yapılıyor:", { email, password });
  };

  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        transform: "scale(1)",
        transformOrigin: "center center"
      }}
    >
      {/* Arka plan olarak SVG */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${loginSvg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        zIndex: 1
      }} />
      
      {/* Üst Logo */}
      <div style={{
        position: "absolute",
        top: "40px",
        textAlign: "center",
        color: "white",
        zIndex: 2
      }}>
      </div>
      
      {/* Login Form */}
      <div style={{
        width: "400px",
        maxWidth: "400px",
        minWidth: "400px",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "30px",
        boxShadow: "0 5px 25px rgba(0, 0, 0, 0.15)",
        zIndex: 10,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(1)",
        margin: "0 auto",
        boxSizing: "border-box",
        transformOrigin: "center center",
        userSelect: "none"
      }}>
        <h2 style={{
          color: "#D71923",
          textAlign: "center",
          marginTop: 0,
          marginBottom: "10px"
        }}>Hoşgeldiniz!</h2>
        
        <p style={{
          textAlign: "center",
          color: "#808080",
          fontSize: "14px",
          marginBottom: "25px"
        }}>
          Hesabınız yok mu? <a href="#" style={{
            color: "#D71923",
            textDecoration: "none",
            fontWeight: "bold"
          }}>Kayıt Olun!</a>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#D71923",
              fontWeight: "500"
            }}>
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="samedbayrak@dubaivizeal.com"
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                boxSizing: "border-box",
                backgroundColor: "#f9f9f9",
                color: "#333333"
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: "25px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px"
            }}>
              <label style={{
                fontSize: "14px",
                color: "#D71923",
                fontWeight: "500"
              }}>
                Parola
              </label>
              <a href="#" style={{
                fontSize: "12px",
                color: "#808080",
                textDecoration: "none"
              }}>
                Parolanızı mı unuttunuz?
              </a>
            </div>
            
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  paddingRight: "40px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  backgroundColor: "#f9f9f9",
                  color: "#333333"
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#777",
                  fontSize: "16px",
                  padding: 0
                }}
              >
                {showPassword ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#777"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 23 12C21.27 7.61 17 4.5 12 4.5C10.6 4.5 9.26 4.75 8 5.2L10.17 7.37C10.74 7.14 11.35 7 12 7ZM2 3.27L4.28 5.55L4.74 6.01C3.08 7.3 1.78 9.02 1 11C2.73 15.39 7 18.5 12 18.5C13.55 18.5 15.03 18.2 16.38 17.66L16.8 18.08L19.73 21L21 19.73L3.27 2L2 3.27ZM7.53 8.8L9.08 10.35C9.03 10.56 9 10.78 9 11C9 12.66 10.34 14 12 14C12.22 14 12.44 13.97 12.65 13.92L14.2 15.47C13.53 15.8 12.79 16 12 16C9.24 16 7 13.76 7 11C7 10.21 7.2 9.47 7.53 8.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" fill="#777"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#D71923",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
