import React, { useState } from 'react';

const BasvuruDetayModal = ({ basvuru, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('passaportFotograf');
  const [islemDurumu, setIslemDurumu] = useState('beklemede');

  // Dosya yükleme fonksiyonu
  const handleFileUpload = (event, type) => {
    // Dosya yükleme işlemleri burada yapılabilir
    console.log(`${type} yükleniyor:`, event.target.files[0]);
    // Gerçek uygulamada burada API'ye dosya yüklenir
  };

  // İşleme alma fonksiyonu
  const handleIslemeAl = () => {
    setIslemDurumu('islemeAlindi');
    alert('Başvuru işleme alınıyor...');
    // Gerçek uygulamada burada API çağrısı yapılır
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '800px',
        maxWidth: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '20px'
      }}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid #eee',
          paddingBottom: '10px'
        }}>
          <h2 style={{ fontSize: '18px', margin: 0 }}>
            {basvuru.isimSoyisim}
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div style={{
          marginBottom: '20px'
        }}>
          {/* Başvuru Bilgileri */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>Başvuru No:</strong> {basvuru.basvuruNo}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>Pasaport Numarası:</strong> DS1943651
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>İşlem Tipi:</strong> {basvuru.vizeTipi}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>Telefon:</strong> {basvuru.telefon}
              </p>
            </div>
            <div>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>E-posta:</strong> saad@example.com
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>Uyruk:</strong> Türkiye
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>Doğum Tarihi:</strong> 01.01.1990
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>Cinsiyet:</strong> Erkek
              </p>
            </div>
          </div>

          {/* Dosya Yükleme Sekmeleri */}
          <div style={{
            borderTop: '1px solid #eee',
            paddingTop: '15px'
          }}>
            <div style={{
              display: 'flex',
              marginBottom: '15px',
              borderBottom: '1px solid #eee'
            }}>
              <button 
                onClick={() => setSelectedTab('passaportFotograf')}
                style={{
                  padding: '8px 12px',
                  border: 'none',
                  background: 'none',
                  borderBottom: selectedTab === 'passaportFotograf' ? '2px solid #D71923' : 'none',
                  color: selectedTab === 'passaportFotograf' ? '#D71923' : '#333',
                  fontWeight: selectedTab === 'passaportFotograf' ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              >
                Pasaport Fotoğrafı
              </button>
              <button 
                onClick={() => setSelectedTab('kimlikFotograf')}
                style={{
                  padding: '8px 12px',
                  border: 'none',
                  background: 'none',
                  borderBottom: selectedTab === 'kimlikFotograf' ? '2px solid #D71923' : 'none',
                  color: selectedTab === 'kimlikFotograf' ? '#D71923' : '#333',
                  fontWeight: selectedTab === 'kimlikFotograf' ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              >
                Kimlik Fotoğrafı
              </button>
              <button 
                onClick={() => setSelectedTab('otelRezervasyon')}
                style={{
                  padding: '8px 12px',
                  border: 'none',
                  background: 'none',
                  borderBottom: selectedTab === 'otelRezervasyon' ? '2px solid #D71923' : 'none',
                  color: selectedTab === 'otelRezervasyon' ? '#D71923' : '#333',
                  fontWeight: selectedTab === 'otelRezervasyon' ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              >
                Otel Rezervasyonu
              </button>
              <button 
                onClick={() => setSelectedTab('ucusBileti')}
                style={{
                  padding: '8px 12px',
                  border: 'none',
                  background: 'none',
                  borderBottom: selectedTab === 'ucusBileti' ? '2px solid #D71923' : 'none',
                  color: selectedTab === 'ucusBileti' ? '#D71923' : '#333',
                  fontWeight: selectedTab === 'ucusBileti' ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              >
                Uçuş Bileti
              </button>
              <button 
                onClick={() => setSelectedTab('diger')}
                style={{
                  padding: '8px 12px',
                  border: 'none',
                  background: 'none',
                  borderBottom: selectedTab === 'diger' ? '2px solid #D71923' : 'none',
                  color: selectedTab === 'diger' ? '#D71923' : '#333',
                  fontWeight: selectedTab === 'diger' ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              >
                Diğer
              </button>
            </div>

            {/* Seçilen Sekme İçeriği */}
            <div style={{ padding: '15px 0' }}>
              {selectedTab === 'passaportFotograf' && (
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <button style={{
                      backgroundColor: '#f1f1f1',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}>
                      <svg width="16" height="16" fill="#666" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </button>
                    <input
                      type="file"
                      id="passportFile"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, 'pasaport')}
                    />
                    <label htmlFor="passportFile" style={{ cursor: 'pointer', fontSize: '14px' }}>
                      Pasaport Fotoğrafı Yükle
                    </label>
                  </div>
                  <p style={{ fontSize: '13px', color: '#666', margin: '5px 0 0 40px' }}>
                    Pasaport sayfasının net ve okunaklı bir görüntüsünü yükleyin.
                  </p>
                </div>
              )}

              {selectedTab === 'kimlikFotograf' && (
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <button style={{
                      backgroundColor: '#f1f1f1',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}>
                      <svg width="16" height="16" fill="#666" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </button>
                    <input
                      type="file"
                      id="idFile"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, 'kimlik')}
                    />
                    <label htmlFor="idFile" style={{ cursor: 'pointer', fontSize: '14px' }}>
                      Kimlik Fotoğrafı Yükle
                    </label>
                  </div>
                  <p style={{ fontSize: '13px', color: '#666', margin: '5px 0 0 40px' }}>
                    Kimlik kartının ön ve arka yüzünün fotoğrafını yükleyin.
                  </p>
                </div>
              )}

              {selectedTab === 'otelRezervasyon' && (
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <button style={{
                      backgroundColor: '#f1f1f1',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}>
                      <svg width="16" height="16" fill="#666" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </button>
                    <input
                      type="file"
                      id="hotelFile"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, 'otel')}
                    />
                    <label htmlFor="hotelFile" style={{ cursor: 'pointer', fontSize: '14px' }}>
                      Otel Rezervasyonu Yükle
                    </label>
                  </div>
                  <p style={{ fontSize: '13px', color: '#666', margin: '5px 0 0 40px' }}>
                    Otel rezervasyon belgesini yükleyin.
                  </p>
                </div>
              )}

              {selectedTab === 'ucusBileti' && (
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <button style={{
                      backgroundColor: '#f1f1f1',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}>
                      <svg width="16" height="16" fill="#666" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </button>
                    <input
                      type="file"
                      id="flightFile"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, 'ucus')}
                    />
                    <label htmlFor="flightFile" style={{ cursor: 'pointer', fontSize: '14px' }}>
                      Uçuş Bileti Yükle
                    </label>
                  </div>
                  <p style={{ fontSize: '13px', color: '#666', margin: '5px 0 0 40px' }}>
                    Uçuş biletinin bir kopyasını yükleyin.
                  </p>
                </div>
              )}

              {selectedTab === 'diger' && (
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <button style={{
                      backgroundColor: '#f1f1f1',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}>
                      <svg width="16" height="16" fill="#666" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </button>
                    <input
                      type="file"
                      id="otherFile"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e, 'diger')}
                    />
                    <label htmlFor="otherFile" style={{ cursor: 'pointer', fontSize: '14px' }}>
                      Diğer Belge Yükle
                    </label>
                  </div>
                  <p style={{ fontSize: '13px', color: '#666', margin: '5px 0 0 40px' }}>
                    Başvuruyla ilgili diğer destekleyici belgeleri yükleyin.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alt Bilgi Alanı */}
        <div style={{
          marginTop: '20px',
          borderTop: '1px solid #eee',
          paddingTop: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>Başvuru Tipi</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>Çocuk</span>
              <span style={{ fontSize: '14px', color: '#333' }}>|</span>
              <span style={{ fontSize: '14px', color: '#333' }}>Vize Tipi:</span>
              <span style={{ 
                  fontSize: '14px', 
                  color: '#333',
                  backgroundColor: '#b3e5fc',
                  padding: '3px 8px',
                  borderRadius: '4px'
              }}>
                30 Günlük Tek Giriş
              </span>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>Ekspres Başvuru:</span>
              <span style={{ 
                  fontSize: '14px', 
                  color: '#333',
                  backgroundColor: '#ffcdd2',
                  padding: '3px 8px',
                  borderRadius: '4px'
              }}>
                Fast
              </span>
              <span style={{ fontSize: '14px', color: '#333' }}>|</span>
              <span style={{ fontSize: '14px', color: '#333' }}>Sigorta:</span>
              <span style={{ fontSize: '14px', color: '#333' }}>Evet</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>Telefon No: 05314656621</span>
            </div>
          </div>
          <div>
            <button
              onClick={handleIslemeAl}
              style={{
                backgroundColor: islemDurumu === 'beklemede' ? '#D71923' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {islemDurumu === 'beklemede' ? 'İşleme Al' : 'İşlendi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasvuruDetayModal; 