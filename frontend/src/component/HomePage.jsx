import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Pencere boyutunu izleme
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Login sayfasında yaptığımız gibi sayfa stillerini ayarlayalım
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
    document.body.style.overflow = "auto";
    document.body.style.backgroundColor = "#f1f1f1";
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Mobil cihaz kontrolü
  const isMobile = windowWidth <= 768;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#f1f1f1'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#f1f1f1',
        padding: '15px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        borderBottom: '1px solid #e1e1e1',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          padding: '0 20px'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/image.png" alt="Dubai Vizeal Logo" style={{ height: '30px' }} />
          </div>

          {/* Hamburger Menu for Mobile */}
          {isMobile && (
            <div 
              onClick={toggleMenu}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '20px',
                cursor: 'pointer',
                zIndex: 100
              }}
            >
              <div style={{ width: '25px', height: '3px', backgroundColor: '#333', marginBottom: '4px' }}></div>
              <div style={{ width: '25px', height: '3px', backgroundColor: '#333', marginBottom: '4px' }}></div>
              <div style={{ width: '25px', height: '3px', backgroundColor: '#333' }}></div>
            </div>
          )}

          {/* Navigation for Desktop */}
          {!isMobile && (
            <nav style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                gap: '20px',
                marginRight: '20px'
              }}>
                <Link to="/dubai-vizesi" style={{ textDecoration: 'none', color: '#333', fontWeight: 'normal' }}>Dubai Vizesi</Link>
                <Link to="/finans" style={{ textDecoration: 'none', color: '#333', fontWeight: 'normal' }}>Finans</Link>
                <Link to="/operasyon" style={{ textDecoration: 'none', color: '#333', fontWeight: 'normal' }}>Operasyon</Link>
              </div>

              {/* Search Box */}
              <div style={{
                marginRight: '20px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#D71923',
                  padding: '5px 15px',
                  borderRadius: '20px',
                }}>
                  <input
                    type="text"
                    placeholder="Ara..."
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: 'white',
                      outline: 'none',
                      width: '100px',
                    }}
                  />
                  <svg width="16" height="16" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                  </svg>
                </div>
              </div>

              {/* User Profile */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#ddd',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <svg width="18" height="18" fill="#666" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                </svg>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobile && showMenu && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255,255,255,0.95)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 20px 20px',
          overflowY: 'auto'
        }}>
          <Link 
            to="/dubai-vizesi" 
            style={{ 
              textDecoration: 'none', 
              color: '#333', 
              padding: '15px 0',
              borderBottom: '1px solid #eee',
              fontSize: '18px'
            }}
            onClick={() => setShowMenu(false)}
          >
            Dubai Vizesi
          </Link>
          <Link 
            to="/finans" 
            style={{ 
              textDecoration: 'none', 
              color: '#333', 
              padding: '15px 0',
              borderBottom: '1px solid #eee',
              fontSize: '18px'
            }}
            onClick={() => setShowMenu(false)}
          >
            Finans
          </Link>
          <Link 
            to="/operasyon" 
            style={{ 
              textDecoration: 'none', 
              color: '#333', 
              padding: '15px 0',
              borderBottom: '1px solid #eee',
              fontSize: '18px'
            }}
            onClick={() => setShowMenu(false)}
          >
            Operasyon
          </Link>

          {/* Search Box for Mobile */}
          <div style={{
            margin: '20px 0',
            width: '100%'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#D71923',
              padding: '10px 15px',
              borderRadius: '20px',
            }}>
              <input
                type="text"
                placeholder="Ara..."
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'white',
                  outline: 'none',
                  width: '100%',
                  fontSize: '16px'
                }}
              />
              <svg width="20" height="20" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Content Container - Margin top to account for fixed header */}
      <div style={{
        width: '100%',
        marginTop: '70px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Main Menu */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '30px auto 0',
          backgroundColor: 'white',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          boxSizing: 'border-box',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {/* Dubai Vizesi */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
          }}>
            <h3 style={{ color: '#D71923', marginBottom: '20px', fontWeight: 'bold' }}>Dubai Vizesi</h3>
            <ul style={{ listStyleType: 'none', padding: 0, width: '100%', textAlign: 'center' }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/yeni-basvuru" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Yeni Başvuru Yap</Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/vize-basvurularim" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Vize Başvurularım</Link>
              </li>
            </ul>
          </div>

          {/* Finans */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            borderLeft: '1px solid #eee',
            borderRight: '1px solid #eee',
          }}>
            <h3 style={{ color: '#D71923', marginBottom: '20px', fontWeight: 'bold' }}>Finans</h3>
            <ul style={{ listStyleType: 'none', padding: 0, width: '100%', textAlign: 'center' }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/muhasebe" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Muhasebe</Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/bakiye-islemleri" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Bakiye İşlemleri</Link>
              </li>
            </ul>
          </div>

          {/* Operasyon */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
          }}>
            <h3 style={{ color: '#D71923', marginBottom: '20px', fontWeight: 'bold' }}>Operasyon</h3>
            <ul style={{ listStyleType: 'none', padding: 0, width: '100%', textAlign: 'center' }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/vize-paneli" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Vize Paneli</Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/rapor" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Rapor</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '20px',
          width: '100%',
          maxWidth: '1200px',
          boxSizing: 'border-box'
        }}>
          {/* Content will go here */}
        </main>
      </div>
    </div>
  );
};

export default HomePage; 