import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllVisaApplications } from '../services/visaService';
import { toast } from 'react-toastify';

const OperasyonPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [operasyonOzeti, setOperasyonOzeti] = useState({
    toplamBasvuru: 0,
    bekleyenBasvuru: 0,
    islemeAlinanBasvuru: 0,
    tamamlananBasvuru: 0
  });
  const [operasyonVerileri, setOperasyonVerileri] = useState([]);

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

  // Verileri yükleme
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Veritabanından tüm vize başvurularını getir
        const response = await getAllVisaApplications();
        
        if (response.success) {
          console.log("Operasyon verileri başarıyla alındı:", response.data);
          // Operasyon verilerini dönüştür
          const operasyonVerileri = response.data.map(item => {
            // Durum rengini belirle
            let durumRenk = '#9E9E9E'; // Gri (varsayılan)
            
            if (item.status === 'onaylandı') {
              durumRenk = '#8BC34A'; // Yeşil
            } else if (item.status === 'islemeAlindi') {
              durumRenk = '#FF9800'; // Turuncu
            } else if (item.status === 'reddedildi') {
              durumRenk = '#F44336'; // Kırmızı
            }
            
            return {
              id: item.id,
              tarih: new Date(item.createdAt || item.created_at).toLocaleDateString('tr-TR'),
              basvuruNo: item.id.substring(0, 6),
              isimSoyisim: item.fullName || item.full_name,
              kimlikNo: item.identityNumber || item.identity_number,
              telefon: item.phoneNumber || item.phone_number,
              email: item.email,
              vizeTipi: item.visaType || item.visa_type,
              basvuruTipi: item.applicationType || item.application_type,
              durum: item.status,
              durumRenk: durumRenk
            };
          });
          
          setOperasyonVerileri(operasyonVerileri);
        } else {
          console.error("Operasyon verileri alınamadı:", response.error);
          toast.error('Operasyon verileri alınamadı: ' + (response.error || 'Bilinmeyen hata'));
        }
      } catch (error) {
        console.error('Operasyon verileri getirme hatası:', error);
        toast.error('Operasyon verileri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // HTML ve Body stillerini ayarla
  useEffect(() => {
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.overflowX = "hidden";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#fff"; // Beyaz arka plan
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, []);

  // Mobil cihaz kontrolü
  const isMobile = windowWidth <= 768;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#fff', // Beyaz arka plan
      padding: '0',
      margin: '0',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#f1f1f1',
        padding: '10px 0',
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
          maxWidth: '1000px',
          padding: '0 15px'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/home">
              <img src="/image.png" alt="Dubai Vizeal Logo" style={{ height: '25px' }} />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: '15px',
              marginRight: '15px'
            }}>
              <Link to="/dubai-vizesi" style={{ textDecoration: 'none', color: '#333', fontWeight: 'normal' }}>Dubai Vizesi</Link>
              <Link to="/finans" style={{ textDecoration: 'none', color: '#333', fontWeight: 'normal' }}>Finans</Link>
              <Link to="/operasyon" style={{ textDecoration: 'none', color: '#D71923', fontWeight: 'bold' }}>Operasyon</Link>
            </div>

            {/* Search Box */}
            <div style={{ marginRight: '15px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#D71923',
                padding: '5px 10px',
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
                    width: '80px',
                  }}
                />
                <svg width="14" height="14" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                </svg>
              </div>
            </div>

            {/* User Profile */}
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#ddd',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <svg width="16" height="16" fill="#666" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
              </svg>
            </div>
          </nav>
        </div>
      </header>

      {/* Content Container */}
      <div style={{
        width: '100%',
        marginTop: '60px',
        paddingTop: '20px',
        paddingBottom: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <div style={{
          width: '90%',
          maxWidth: '800px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ color: '#D71923', fontSize: '24px', marginBottom: '20px' }}>Operasyon Yönetimi</h1>
          
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
            Dubai Vizesi operasyon yönetim paneline hoş geldiniz. Operasyonel işlemlerinizi buradan yönetebilirsiniz.
          </p>
          
          {/* Özet Kartları */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', 
            gap: '10px', 
            marginBottom: '30px' 
          }}>
            {/* Toplam Başvuru */}
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Toplam Başvuru</h3>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', margin: 0 }}>{operasyonOzeti.toplamBasvuru}</p>
            </div>
            
            {/* Bekleyen Başvuru */}
            <div style={{
              backgroundColor: '#fff8e1',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Bekleyen</h3>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff9800', margin: 0 }}>{operasyonOzeti.bekleyenBasvuru}</p>
            </div>
            
            {/* İşleme Alınan */}
            <div style={{
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>İşleme Alınan</h3>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2196f3', margin: 0 }}>{operasyonOzeti.islemeAlinanBasvuru}</p>
            </div>
            
            {/* Tamamlanan */}
            <div style={{
              backgroundColor: '#e8f5e9',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Tamamlanan</h3>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#4caf50', margin: 0 }}>{operasyonOzeti.tamamlananBasvuru}</p>
            </div>
          </div>
          
          <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <Link to="/vize-paneli" style={{
              padding: '12px 20px',
              backgroundColor: '#D71923',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              Vize Paneli
            </Link>
            
            <Link to="/vize-basvurularim" style={{
              padding: '12px 20px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold',
              border: '1px solid #ddd'
            }}>
              Başvuru Takip
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperasyonPage; 