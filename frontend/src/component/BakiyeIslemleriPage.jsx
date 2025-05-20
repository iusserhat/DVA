import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BakiyeIslemleriPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);

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

  // Sayfa stillerini ayarlama
  useEffect(() => {
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

  // Mobil cihaz kontrolü
  const isMobile = windowWidth <= 768;

  // Örnek tablo verileri
  const bakiyeIslemleri = [
    { id: 1, olusturmaTarihi: '16.02.2024', ucret: '$110', gonderenKisi: 'Saad Mohammad' },
    { id: 2, olusturmaTarihi: '16.02.2024', ucret: '$110', gonderenKisi: 'Saad Mohammad' },
    { id: 3, olusturmaTarihi: '16.02.2024', ucret: '$110', gonderenKisi: 'Saad Mohammad' },
    { id: 4, olusturmaTarihi: '16.02.2024', ucret: '$110', gonderenKisi: 'Saad Mohammad' },
    { id: 5, olusturmaTarihi: '16.02.2024', ucret: '$110', gonderenKisi: 'Saad Mohammad' },
  ];

  // Bakiye yükleme fonksiyonu
  const handleBakiyeYukle = () => {
    alert('Bakiye yükleme işlemi başlatılıyor...');
  };

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
              onClick={() => setShowMenu(!showMenu)}
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

              {/* Bakiye Gösterimi */}
              <div style={{
                marginRight: '20px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  backgroundColor: '#D71923',
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}>
                  Bakiye: <span style={{ fontWeight: 'bold' }}>$457.25</span>
                </div>
              </div>

              {/* Bildirim İkonu */}
              <div style={{
                marginRight: '10px',
                cursor: 'pointer'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
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
        {/* Finans Header */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 20px',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '24px', color: '#333', margin: '0' }}>Finans</h2>
        </div>

        {/* Tabs */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #ddd',
            marginBottom: '20px'
          }}>
            <Link to="/finans" style={{
              padding: '10px 20px',
              textDecoration: 'none',
              color: '#666',
              fontSize: '14px'
            }}>
              Anasayfa
            </Link>
            <Link to="/bakiye-islemleri" style={{
              padding: '10px 20px',
              textDecoration: 'none',
              color: '#D71923',
              fontSize: '14px',
              fontWeight: 'bold',
              borderBottom: '2px solid #D71923'
            }}>
              Bakiye İşlemleri
            </Link>
          </div>
        </div>

        {/* Action Buttons and Search */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}>
          {/* Bakiye Yükle Button */}
          <button 
            onClick={handleBakiyeYukle}
            style={{
              backgroundColor: '#D71923',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '8px 15px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Bakiye Yükle
          </button>

          {/* Search Input */}
          <div style={{
            position: 'relative',
            width: '250px'
          }}>
            <input
              type="text"
              placeholder="İşlem Ara"
              style={{
                width: '100%',
                padding: '8px 15px',
                paddingRight: '35px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                fontSize: '14px',
                color: '#333',
                backgroundColor: 'white'
              }}
            />
            <button style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}>
              <svg width="16" height="16" fill="#666" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Bakiye İşlemleri Table */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 20px',
          boxSizing: 'border-box',
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Oluşturma Tarihi</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Ücret</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Gönderen Kişi</th>
              </tr>
            </thead>
            <tbody>
              {bakiyeIslemleri.map((islem) => (
                <tr key={islem.id} style={{ backgroundColor: islem.id % 2 === 0 ? 'white' : '#f9f9f9' }}>
                  <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>{islem.olusturmaTarihi}</td>
                  <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>{islem.ucret}</td>
                  <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>{islem.gonderenKisi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BakiyeIslemleriPage; 