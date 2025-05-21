import React from 'react';
import { Link } from 'react-router-dom';

const FinansPage = () => {
  // HTML ve Body stillerini ayarla
  React.useEffect(() => {
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
              <Link to="/finans" style={{ textDecoration: 'none', color: '#D71923', fontWeight: 'bold' }}>Finans</Link>
              <Link to="/operasyon" style={{ textDecoration: 'none', color: '#333', fontWeight: 'normal' }}>Operasyon</Link>
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
          <h1 style={{ color: '#D71923', fontSize: '24px', marginBottom: '20px' }}>Finans Yönetimi</h1>
          
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#333', marginBottom: '15px' }}>
            Dubai Vizesi finans yönetim paneline hoş geldiniz. Finansal işlemlerinizi buradan yönetebilirsiniz.
          </p>
          
          <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <Link to="/muhasebe" style={{
              padding: '12px 20px',
              backgroundColor: '#D71923',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              Muhasebe İşlemleri
            </Link>
            
            <Link to="/bakiye-islemleri" style={{
              padding: '12px 20px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold',
              border: '1px solid #ddd'
            }}>
              Bakiye İşlemleri
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinansPage; 