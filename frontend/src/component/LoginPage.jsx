import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginSvg from "../assets/login.svg";
// Merkezi Supabase bağlantısını kullan
import supabase from "../utils/supabaseClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    document.body.style.backgroundColor = "#D71923"; // Arka plan rengini kırmızı yapıyoruz
    
    // Pencere boyutunu izleme
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Zoom engelleme için event listener
    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
    
    // Pinch zoom engelleme
    const preventPinchZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    // Event listener'ları ekle
    window.addEventListener('resize', handleResize);
    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventPinchZoom, { passive: false });
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
      }
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('touchmove', preventPinchZoom);
      document.removeEventListener('keydown', preventZoom);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    console.log("Giriş yapılıyor:", { email, passwordLength: password ? password.length : 0 });
    
    try {
      // Rate limit sorununu önlemek için 1 saniyelik gecikme ekle
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Supabase ile giriş yap
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Supabase giriş hatası:", error);
        
        // Özel hata mesajları
        if (error.message === 'Email not confirmed') {
          setError('E-posta adresiniz henüz onaylanmamış. Lütfen e-postanızı kontrol edin.');
        } else if (error.message.includes('Invalid login credentials')) {
          setError('Geçersiz e-posta veya şifre. Lütfen bilgilerinizi kontrol edin.');
        } else if (error.message.includes('rate limit')) {
          setError('Çok fazla giriş denemesi yaptınız. Lütfen biraz bekleyip tekrar deneyin.');
        } else if (error.message.includes('Failed to fetch')) {
          setError('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.');
        } else {
          setError('Giriş yapılırken bir hata oluştu: ' + error.message);
        }
        return;
      }
      
      if (data?.session) {
        console.log("Giriş başarılı");
        
        // Token ve kullanıcı verisini kaydet
        localStorage.setItem('token', data.session.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Ana sayfaya yönlendir
        navigate("/home");
      } else {
        setError('Kullanıcı bilgileri alınamadı.');
      }
    } catch (err) {
      console.error("Beklenmeyen hata:", err);
      
      // Network hataları için özel mesaj
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setError("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.");
      } else {
      setError("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Responsive form genişliği
  const getFormWidth = () => {
    if (windowWidth <= 480) return '90%';
    if (windowWidth <= 768) return '450px';
    return '480px';
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
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#D71923", // Kırmızı arka plan
        touchAction: "none"
      }}
    >
      {/* Logo alanı tamamen silindi */}
      
      {/* Arka plan olarak SVG */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${loginSvg})`,
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        zIndex: 1,
        opacity: 0.9
      }} />
      
      {/* Login Form */}
      <div style={{
        width: getFormWidth(),
        backgroundColor: "white",
        borderRadius: "12px",
        padding: windowWidth <= 480 ? "20px" : "30px", // Mobil için padding'i azalt
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        zIndex: 10,
        boxSizing: "border-box",
        touchAction: "none",
        maxHeight: windowWidth <= 480 ? "90vh" : "auto",
        overflowY: windowWidth <= 480 ? "auto" : "visible",
        marginTop: windowWidth <= 480 ? "90px" : "130px"
      }}>
        <h2 style={{
          color: "#D71923",
          textAlign: "center",
          marginTop: 0,
          marginBottom: "10px",
          fontSize: windowWidth <= 480 ? "22px" : "28px", // Mobil için font boyutunu ayarla
          fontWeight: "600",
          letterSpacing: "0.5px",
          textShadow: "0 1px 2px rgba(0,0,0,0.05)"
        }}>Hoşgeldiniz!</h2>
        
        <p style={{
          textAlign: "center",
          color: "#808080",
          fontSize: windowWidth <= 480 ? "12px" : "14px", // Mobil için font boyutunu azalt
          marginBottom: windowWidth <= 480 ? "15px" : "25px"
        }}>
          Hesabınız yok mu? <a href="/register" style={{
            color: "#D71923",
            textDecoration: "none",
            fontWeight: "bold"
          }}>Kayıt Olun!</a>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: windowWidth <= 480 ? "15px" : "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: windowWidth <= 480 ? "12px" : "14px", // Mobil için font boyutunu azalt
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
                padding: windowWidth <= 480 ? "10px 12px" : "12px 15px", // Mobil için padding'i azalt
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: windowWidth <= 480 ? "12px" : "14px", // Mobil için font boyutunu azalt
                boxSizing: "border-box",
                backgroundColor: "#f9f9f9",
                color: "#333333"
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: windowWidth <= 480 ? "20px" : "25px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px"
            }}>
              <label style={{
                fontSize: windowWidth <= 480 ? "12px" : "14px", // Mobil için font boyutunu azalt
                color: "#D71923",
                fontWeight: "500"
              }}>
                Parola
              </label>
              <a href="#" style={{
                fontSize: windowWidth <= 480 ? "10px" : "12px", // Mobil için font boyutunu azalt
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
                  padding: windowWidth <= 480 ? "10px 12px" : "12px 15px", // Mobil için padding'i azalt
                  paddingRight: "40px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: windowWidth <= 480 ? "12px" : "14px", // Mobil için font boyutunu azalt
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
                  <svg width={windowWidth <= 480 ? "20" : "24"} height={windowWidth <= 480 ? "20" : "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#777"/>
                  </svg>
                ) : (
                  <svg width={windowWidth <= 480 ? "20" : "24"} height={windowWidth <= 480 ? "20" : "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              padding: windowWidth <= 480 ? "12px" : "14px", // Mobil için padding'i azalt
              backgroundColor: "#D71923",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: windowWidth <= 480 ? "14px" : "16px", // Mobil için font boyutunu azalt
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
          
          {error && (
            <div style={{
              color: "#D71923",
              textAlign: "center",
              marginTop: "15px",
              fontSize: windowWidth <= 480 ? "12px" : "14px",
              padding: "10px",
              backgroundColor: "#ffebee",
              borderRadius: "5px",
              border: "1px solid #ffcdd2"
            }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
