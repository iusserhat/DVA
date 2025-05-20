import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MuhasebePage = () => {
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
  const muhasebeSatirlar = [
    { id: 1, islemTarihi: '16.01.2025', islemSayisim: 'Sanal Bilyok', islemTipi: 'Yatırım', visaTipi: 'SGD Turist Tek Giriş', ucret: '$70', islemSonuBakiye: '$70' },
    { id: 2, islemTarihi: '16.01.2025', islemSayisim: 'Sanal Bilyok', islemTipi: 'Yatırım', visaTipi: 'SGD Turist Tek Giriş', ucret: '$70', islemSonuBakiye: '$70' },
    { id: 3, islemTarihi: '16.01.2025', islemSayisim: 'Sanal Bilyok', islemTipi: 'Yatırım', visaTipi: 'SGD Turist Tek Giriş', ucret: '$70', islemSonuBakiye: '$70' },
    { id: 4, islemTarihi: '16.01.2025', islemSayisim: 'Sanal Bilyok', islemTipi: 'Yatırım', visaTipi: 'SGD Turist Tek Giriş', ucret: '$70', islemSonuBakiye: '$70' },
    { id: 5, islemTarihi: '16.01.2025', islemSayisim: 'Sanal Bilyok', islemTipi: 'Yatırım', visaTipi: 'SGD Turist Tek Giriş', ucret: '$70', islemSonuBakiye: '$70' },
    { id: 6, islemTarihi: '16.01.2025', islemSayisim: 'Sanal Bilyok', islemTipi: 'Yatırım', visaTipi: 'SGD Turist Tek Giriş', ucret: '$70', islemSonuBakiye: '$70' },
    { id: 7, islemTarihi: '16.01.2025', islemSayisim: 'Sanal Bilyok', islemTipi: 'Yatırım', visaTipi: 'SGD Turist Tek Giriş', ucret: '$70', islemSonuBakiye: '$70' },
    { id: 8, islemTarihi: '16.01.2025', islemSayisim: 'Sanal Bilyok', islemTipi: 'Yatırım', visaTipi: 'SGD Turist Tek Giriş', ucret: '$70', islemSonuBakiye: '$70' },
    { id: 9, islemTarihi: '16.01.2025', islemSayisim: 'Sanal Bilyok', islemTipi: 'Yatırım', visaTipi: 'SGD Turist Tek Giriş', ucret: '$70', islemSonuBakiye: '$70' },
  ];

  // Excel dosyasını indirme fonksiyonu
  const exportToExcel = () => {
    // Tablo verilerini CSV formatına dönüştürme
    const headers = ['İşlem Tarihi', 'İşlem Sayısı', 'İşlem Tipi', 'Vize Tipi', 'Ücret', 'İşlem Sonu Bakiye'];
    
    // Başlık satırını ekleyelim
    let csvContent = headers.join(',') + '\n';
    
    // Veri satırlarını ekleyelim
    muhasebeSatirlar.forEach(satir => {
      const row = [
        satir.islemTarihi,
        satir.islemSayisim,
        satir.islemTipi,
        satir.visaTipi,
        satir.ucret,
        satir.islemSonuBakiye
      ];
      csvContent += row.join(',') + '\n';
    });
    
    // CSV dosyasını oluşturalım ve indirelim
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'muhasebe_raporu.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <Link to="/muhasebe" style={{
              padding: '10px 20px',
              textDecoration: 'none',
              color: '#D71923',
              fontSize: '14px',
              fontWeight: 'bold',
              borderBottom: '2px solid #D71923'
            }}>
              Muhasebe
            </Link>
          </div>
        </div>

        {/* Excel Export Button */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}>
          <button 
            onClick={exportToExcel}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#D71923',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0',
              fontSize: '14px'
            }}
          >
            <span style={{ marginRight: '5px' }}>Excel Olarak İndir</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#D71923">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </button>
        </div>

        {/* Muhasebe Table */}
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
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>İşlem Tarihi</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>İşlem Sayısı</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>İşlem Tipi</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Vize Tipi</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Ücret</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>İşlem Sonu Bakiye</th>
              </tr>
            </thead>
            <tbody>
              {muhasebeSatirlar.map((satir) => (
                <tr key={satir.id}>
                  <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>{satir.islemTarihi}</td>
                  <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>{satir.islemSayisim}</td>
                  <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>{satir.islemTipi}</td>
                  <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>{satir.visaTipi}</td>
                  <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>{satir.ucret}</td>
                  <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}>{satir.islemSonuBakiye}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MuhasebePage; 