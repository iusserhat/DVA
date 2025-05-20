import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasvuruDetayModal from './BasvuruDetayModal';

const VizePaneliPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBasvuru, setSelectedBasvuru] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Örnek vize başvuru verileri
  const basvurular = [
    { 
      id: 1, 
      tarih: '16.01.2025', 
      basvuruNo: '99999', 
      isimSoyisim: 'Saad Mohammad', 
      telefon: '+90 538 886 93 15',
      ekspres: 'Fast',
      sigorta: 'Evet',
      kullanimTipi: 'Bireysel',
      vizeTipi: '30 Günlük Tek Giriş',
      basvuruTipi: 'Çocuk',
      sigortasi: 'Yok',
      durum: 'Onaylandı',
      basvuruSahibi: 'İşleme Alındı',
      durumRenk: '#8BC34A' // Yeşil
    },
    { 
      id: 2, 
      tarih: '16.01.2025', 
      basvuruNo: '99999', 
      isimSoyisim: 'Saad Mohammad', 
      telefon: '+90 538 886 93 15',
      ekspres: 'Fast',
      sigorta: 'Evet',
      kullanimTipi: 'Bireysel',
      vizeTipi: '30 Günlük Tek Giriş',
      basvuruTipi: 'Çocuk',
      sigortasi: 'Yok',
      durum: 'İşleme Alındı',
      basvuruSahibi: 'İşleme Alındı',
      durumRenk: '#FF9800' // Turuncu
    },
    { 
      id: 3, 
      tarih: '16.01.2025', 
      basvuruNo: '99999', 
      isimSoyisim: 'Saad Mohammad', 
      telefon: '+90 538 886 93 15',
      ekspres: 'Fast',
      sigorta: 'Evet',
      kullanimTipi: 'Bireysel',
      vizeTipi: '30 Günlük Tek Giriş',
      basvuruTipi: 'Çocuk',
      sigortasi: 'Yok',
      durum: 'Reddedildi',
      basvuruSahibi: 'İşleme Alındı',
      durumRenk: '#F44336' // Kırmızı
    },
    { 
      id: 4, 
      tarih: '16.01.2025', 
      basvuruNo: '99999', 
      isimSoyisim: 'Saad Mohammad', 
      telefon: '+90 538 886 93 15',
      ekspres: 'Hayır',
      sigorta: 'Evet',
      kullanimTipi: 'Bireysel',
      vizeTipi: '30 Günlük Tek Giriş',
      basvuruTipi: 'Yetişkin',
      sigortasi: 'Yok',
      durum: 'Başvuru Alındı',
      basvuruSahibi: 'Başvuru Alındı',
      durumRenk: '#9E9E9E' // Gri
    },
    { 
      id: 5, 
      tarih: '16.01.2025', 
      basvuruNo: '99999', 
      isimSoyisim: 'Saad Mohammad', 
      telefon: '+90 538 886 93 15',
      ekspres: 'Hayır',
      sigorta: 'Evet',
      kullanimTipi: 'Bireysel',
      vizeTipi: 'Vize Uzatma',
      basvuruTipi: 'Yetişkin',
      sigortasi: 'Yok',
      durum: 'Başvuru Alındı',
      basvuruSahibi: 'Başvuru Alındı',
      durumRenk: '#9E9E9E' // Gri
    },
    { 
      id: 6, 
      tarih: '16.01.2025', 
      basvuruNo: '99999', 
      isimSoyisim: 'Saad Mohammad', 
      telefon: '+90 538 886 93 15',
      ekspres: 'Hayır',
      sigorta: 'Evet',
      kullanimTipi: 'Bireysel',
      vizeTipi: '30 Günlük Tek Giriş',
      basvuruTipi: 'Yetişkin',
      sigortasi: 'Yok',
      durum: 'Başvuru Alındı',
      basvuruSahibi: 'Başvuru Alındı',
      durumRenk: '#9E9E9E' // Gri
    },
    { 
      id: 7, 
      tarih: '16.01.2025', 
      basvuruNo: '99999', 
      isimSoyisim: 'Saad Mohammad', 
      telefon: '+90 538 886 93 15',
      ekspres: 'Evet',
      sigorta: 'Evet',
      kullanimTipi: 'Bireysel',
      vizeTipi: '30 Günlük Tek Giriş',
      basvuruTipi: 'Çocuk',
      sigortasi: 'Yok',
      durum: 'İşleme Alındı',
      basvuruSahibi: 'İşleme Alındı',
      durumRenk: '#FF9800' // Turuncu
    },
    { 
      id: 8, 
      tarih: '16.01.2025', 
      basvuruNo: '99999', 
      isimSoyisim: 'Saad Mohammad', 
      telefon: '+90 538 886 93 15',
      ekspres: 'Evet',
      sigorta: 'Evet',
      kullanimTipi: 'Bireysel',
      vizeTipi: '30 Günlük Tek Giriş',
      basvuruTipi: 'Çocuk',
      sigortasi: 'Yok',
      durum: 'İşleme Alındı',
      basvuruSahibi: 'İşleme Alındı',
      durumRenk: '#FF9800' // Turuncu
    },
    { 
      id: 9, 
      tarih: '16.01.2025', 
      basvuruNo: '99999', 
      isimSoyisim: 'Saad Mohammad', 
      telefon: '+90 538 886 93 15',
      ekspres: 'Evet',
      sigorta: 'Evet',
      kullanimTipi: 'Bireysel',
      vizeTipi: '30 Günlük Tek Giriş',
      basvuruTipi: 'Çocuk',
      sigortasi: 'Yok',
      durum: 'İşleme Alındı',
      basvuruSahibi: 'İşleme Alındı',
      durumRenk: '#FF9800' // Turuncu
    }
  ];

  // Excel'e dışa aktarma fonksiyonu
  const exportToExcel = () => {
    // CSV formatında veri oluşturma
    const headers = [
      'Tarih', 'Başvuru No', 'İsim Soyisim', 'Telefon', 'Ekspres', 'Sigorta', 
      'Kullanım Tipi', 'Vize Tipi', 'Başvuru Tipi', 'Sigortası', 'Durum', 'Başvuru Sahibi'
    ];
    
    let csvContent = headers.join(',') + '\n';
    
    basvurular.forEach(basvuru => {
      const row = [
        basvuru.tarih,
        basvuru.basvuruNo,
        basvuru.isimSoyisim,
        basvuru.telefon,
        basvuru.ekspres,
        basvuru.sigorta,
        basvuru.kullanimTipi,
        basvuru.vizeTipi,
        basvuru.basvuruTipi,
        basvuru.sigortasi,
        basvuru.durum,
        basvuru.basvuruSahibi
      ];
      csvContent += row.join(',') + '\n';
    });
    
    // CSV dosyasını oluşturma ve indirme
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'vize_basvurulari.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Başvuru satırına tıklanınca modal açılması
  const handleRowClick = (basvuru) => {
    setSelectedBasvuru(basvuru);
    setShowModal(true);
  };

  // Modalı kapatma
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Arama işlevi
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Arama filtreleme
  const filteredBasvurular = basvurular.filter(basvuru => 
    basvuru.isimSoyisim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    basvuru.basvuruNo.includes(searchTerm) ||
    basvuru.telefon.includes(searchTerm)
  );

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
        {/* Operasyon Header */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 20px',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '24px', color: '#333', margin: '0' }}>Operasyon</h2>
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
            <Link to="/operasyon" style={{
              padding: '10px 20px',
              textDecoration: 'none',
              color: '#666',
              fontSize: '14px'
            }}>
              Anasayfa
            </Link>
            <Link to="/vize-paneli" style={{
              padding: '10px 20px',
              textDecoration: 'none',
              color: '#D71923',
              fontSize: '14px',
              fontWeight: 'bold',
              borderBottom: '2px solid #D71923'
            }}>
              Vize Paneli
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
          {/* Excel Export Button */}
          <button 
            onClick={exportToExcel}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#4CAF50',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0',
              fontSize: '14px'
            }}
          >
            <span style={{ marginRight: '5px', display: 'flex', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#4CAF50" style={{ marginRight: '5px' }}>
                <path d="M3 6v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm12 4h4v2h-4v-2zm0 4h4v2h-4v-2zm-8-4h6v6H7v-6zm0-4h6v2H7V6z"/>
              </svg>
              Excel Export
            </span>
          </button>

          {/* Search Input */}
          <div style={{
            position: 'relative',
            width: '250px'
          }}>
            <input
              type="text"
              placeholder="İşlem Ara"
              value={searchTerm}
              onChange={handleSearchChange}
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

        {/* Vize Başvuruları Table */}
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
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Tarih</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Başvuru No</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>İsim Soyisim</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Telefon</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Ekspres</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Sigorta</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Kullanım Tipi</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Vize Tipi</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Başvuru Tipi</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Sigortası</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Durum</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Başvuru Sahibi</th>
                <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredBasvurular.map((basvuru) => (
                <tr 
                  key={basvuru.id} 
                  style={{ 
                    cursor: 'pointer', 
                    backgroundColor: '#ffffff'
                  }}
                  onClick={() => handleRowClick(basvuru)}
                >
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>{basvuru.tarih}</td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>{basvuru.basvuruNo}</td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>{basvuru.isimSoyisim}</td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>{basvuru.telefon}</td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>
                    <span style={{ padding: '3px 8px', backgroundColor: basvuru.ekspres === 'Fast' ? '#ffcdd2' : '#f5f5f5', borderRadius: '4px', fontSize: '12px' }}>
                      {basvuru.ekspres}
                    </span>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>{basvuru.sigorta}</td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>{basvuru.kullanimTipi}</td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>
                    <span style={{ 
                      padding: '3px 8px', 
                      backgroundColor: basvuru.vizeTipi === 'Vize Uzatma' ? '#f5f5f5' : '#b3e5fc', 
                      borderRadius: '4px', 
                      fontSize: '12px' 
                    }}>
                      {basvuru.vizeTipi}
                    </span>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>{basvuru.basvuruTipi}</td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>
                    <span style={{ 
                      padding: '2px 8px', 
                      backgroundColor: '#f5f5f5', 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      display: 'inline-block',
                      border: '1px solid #ddd'
                    }}>
                      {basvuru.sigortasi}
                    </span>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>
                    <span style={{ 
                      padding: '3px 8px', 
                      backgroundColor: basvuru.durumRenk, 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      color: 'white'
                    }}>
                      {basvuru.durum}
                    </span>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>
                    <span style={{ 
                      padding: '3px 8px', 
                      backgroundColor: '#f5f5f5', 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      border: '1px solid #ddd'
                    }}>
                      {basvuru.basvuruSahibi}
                    </span>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #eee', fontSize: '13px', color: '#333' }}>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#666">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Başvuru Detay Modal */}
      {showModal && selectedBasvuru && (
        <BasvuruDetayModal 
          basvuru={selectedBasvuru}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default VizePaneliPage; 