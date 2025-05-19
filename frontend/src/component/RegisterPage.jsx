import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import registerBg from '../assets/register.svg';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    
    // Pencere boyutunu izleme
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Event listener'ları ekle
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Kayıt yapılıyor:", formData);
  };

  // Mobil cihaz kontrolü
  const isMobile = windowWidth <= 768;

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
        flexDirection: isMobile ? "column" : "row",
        overflow: isMobile ? "auto" : "hidden"
      }}
    >
      {/* Sol taraf - Logo ve bilgi alanı */}
      <div style={{
        flex: isMobile ? "none" : "3",
        height: isMobile ? "40%" : "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: isMobile ? "20px" : "50px",
        backgroundColor: "white",
        position: "relative"
      }}>
        {/* Logo */}
        <div style={{
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? "auto" : "50%",
          left: isMobile ? "auto" : "50%",
          transform: isMobile ? "none" : "translate(-50%, -50%)",
          textAlign: "center",
          width: isMobile ? "100%" : "80%",
          maxWidth: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: isMobile ? "40px auto 20px" : "0"
        }}>
          <img 
            src="/image.png" 
            alt="Dubai Vizeal Logo" 
            style={{ 
              height: isMobile ? "40px" : "60px", 
              marginBottom: isMobile ? "20px" : "50px" 
            }} 
          />
          
          {/* Bilgi metni */}
          <p style={{ 
            color: "#666", 
            lineHeight: "1.5", 
            marginTop: isMobile ? "10px" : "30px",
            textAlign: "center",
            fontSize: isMobile ? "14px" : "16px"
          }}>
            Eğer daha önce kayıt olduysanız ya da yarım kalan bir kaydınız varsa giriş yapmak için <Link to="/" style={{ color: "#D71923", textDecoration: "none", fontWeight: "bold" }}>tıklayın</Link>.
          </p>
        </div>
      </div>
      
      {/* Sağ taraf - Kırmızı arkaplan */}
      <div style={{
        flex: isMobile ? "none" : "2",
        height: isMobile ? "60%" : "auto",
        position: "relative",
        backgroundColor: "#D71923"
      }}>
      </div>

      {/* Form alanı - Ortada konumlandırılmış */}
      <div style={{
        position: isMobile ? "absolute" : "absolute",
        top: isMobile ? "35%" : "50%",
        left: isMobile ? "50%" : "60%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? "90%" : "400px",
        backgroundColor: "white",
        borderRadius: "10px",
        padding: isMobile ? "20px" : "30px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
        maxHeight: isMobile ? "calc(65% - 40px)" : "auto",
        overflowY: isMobile ? "auto" : "visible"
      }}>
        <h2 style={{ 
          color: "#D71923", 
          textAlign: "center", 
          marginTop: 0, 
          marginBottom: isMobile ? "20px" : "30px", 
          fontSize: isMobile ? "20px" : "24px", 
          fontWeight: "600" 
        }}>Kayıt Ol</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: isMobile ? "15px" : "20px" }}>
            <label style={{
              display: "block",
              marginBottom: isMobile ? "5px" : "8px",
              fontSize: isMobile ? "12px" : "14px",
              color: "#D71923",
              fontWeight: "500"
            }}>
              İsim Soyisim
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ad Soyad"
              style={{
                width: "100%",
                padding: isMobile ? "10px" : "12px 15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: isMobile ? "14px" : "16px",
                boxSizing: "border-box",
                backgroundColor: "#f9f9f9"
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: isMobile ? "15px" : "20px" }}>
            <label style={{
              display: "block",
              marginBottom: isMobile ? "5px" : "8px",
              fontSize: isMobile ? "12px" : "14px",
              color: "#D71923",
              fontWeight: "500"
            }}>
              E-posta
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="samedbayrak@dubaivizeal.com"
              style={{
                width: "100%",
                padding: isMobile ? "10px" : "12px 15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: isMobile ? "14px" : "16px",
                boxSizing: "border-box",
                backgroundColor: "#f9f9f9"
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: isMobile ? "15px" : "20px" }}>
            <label style={{
              display: "block",
              marginBottom: isMobile ? "5px" : "8px",
              fontSize: isMobile ? "12px" : "14px",
              color: "#D71923",
              fontWeight: "500"
            }}>
              Telefon Numarası
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+90 555 123 4567"
              style={{
                width: "100%",
                padding: isMobile ? "10px" : "12px 15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: isMobile ? "14px" : "16px",
                boxSizing: "border-box",
                backgroundColor: "#f9f9f9"
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: isMobile ? "20px" : "30px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: isMobile ? "5px" : "8px"
            }}>
              <label style={{
                fontSize: isMobile ? "12px" : "14px",
                color: "#D71923",
                fontWeight: "500"
              }}>
                Parola
              </label>
              <a href="#" style={{
                fontSize: isMobile ? "10px" : "12px",
                color: "#808080",
                textDecoration: "none"
              }}>
                Parolanızı mı unuttunuz?
              </a>
            </div>
            
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: isMobile ? "10px" : "12px 15px",
                  paddingRight: "40px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: isMobile ? "14px" : "16px",
                  boxSizing: "border-box",
                  backgroundColor: "#f9f9f9"
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
                  <svg width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#777"/>
                  </svg>
                ) : (
                  <svg width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 23 12C21.27 7.61 17 4.5 12 4.5C10.6 4.5 9.26 4.75 8 5.2L10.17 7.37C10.74 7.14 11.35 7 12 7ZM2 3.27L4.28 5.55L4.74 6.01C3.08 7.3 1.78 9.02 1 11C2.73 15.39 7 18.5 12 18.5C13.55 18.5 15.03 18.2 16.38 17.66L16.8 18.08L19.73 21L21 19.73L3.27 2L2 3.27ZM7.53 8.8L9.08 10.35C9.03 10.56 9 10.78 9 11C9 12.66 10.34 14 12 14C12.22 14 12.44 13.97 12.65 13.92L14.2 15.47C13.53 15.8 12.79 16 12 16C9.24 16 7 13.76 7 11C7 10.21 7.2 9.47 7.53 8.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" fill="#777"/>
                  </svg>
                )}
              </button>
            </div>
            
            <div style={{ 
              fontSize: isMobile ? "10px" : "11px", 
              color: "#999", 
              marginTop: isMobile ? "5px" : "8px" 
            }}>
              Hizli şiş ve onayları şartlarımızı okudum ve kabul ediyorum
            </div>
          </div>
          
          <button
            type="submit"
            style={{
              width: "100%",
              padding: isMobile ? "10px" : "14px",
              backgroundColor: "#D71923",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;