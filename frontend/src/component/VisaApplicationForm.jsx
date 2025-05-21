import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VisaApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    identityNumber: '',
    phoneNumber: '',
    email: '',
    applicationType: '',
    visaType: '',
    expressApplication: '',
    insurance: '',
    usageType: '',
    country: '',
    city: '',
    district: '',
    passport: null,
    photo: null,
    flightTicket: null,
    hotelReservation: null,
    otherDocument: null,
    paymentType: '',
    paymentAmount: '',
    paymentBy: ''
  });
  
  // Örnek vize başvuruları verisi
  const [applications, setApplications] = useState([
    {
      id: '123456',
      applicationDate: '17/05/24',
      fullName: 'İsim Soyisim',
      visaType: 'Turistik vize (30 gün)',
      applicationType: '30 Gün Tek Giriş',
      express: 'Evet',
      insurance: 'Hayır',
      fee: '217₺',
      invoice: 'Hazırlanıyor',
      status: 'İşlemde'
    },
    {
      id: '123457',
      applicationDate: '17/05/24',
      fullName: 'İsim Soyisim',
      visaType: 'Turistik vize (30 gün)',
      applicationType: '30 Gün Tek Giriş',
      express: 'Hayır',
      insurance: 'Evet',
      fee: '217₺',
      invoice: 'Hazırlanıyor',
      status: 'İşlemde'
    },
    {
      id: '123458',
      applicationDate: '16/05/24',
      fullName: 'İsim Soyisim',
      visaType: 'Turistik vize (30 gün)',
      applicationType: '30 Gün Tek Giriş',
      express: 'Hayır',
      insurance: 'Hayır',
      fee: '217₺',
      invoice: 'Hazırlanıyor',
      status: 'İşlemde'
    },
    {
      id: '123459',
      applicationDate: '16/05/24',
      fullName: 'İsim Soyisim',
      visaType: 'Turistik vize (30 gün)',
      applicationType: '30 Gün Tek Giriş',
      express: 'Hayır',
      insurance: 'Hayır',
      fee: '217₺',
      invoice: 'Hazırlanıyor',
      status: 'İşlemde'
    },
    {
      id: '123460',
      applicationDate: '15/05/24',
      fullName: 'İsim Soyisim',
      visaType: 'Turistik vize (30 gün)',
      applicationType: '30 Gün Tek Giriş',
      express: 'Hayır',
      insurance: 'Hayır',
      fee: '217₺',
      invoice: 'Hazırlanıyor',
      status: 'İşlemde'
    },
    {
      id: '123461',
      applicationDate: '15/05/24',
      fullName: 'İsim Soyisim',
      visaType: 'Turistik vize (30 gün)',
      applicationType: '30 Gün Tek Giriş',
      express: 'Evet',
      insurance: 'Evet',
      fee: '217₺',
      invoice: 'Hazırlanıyor',
      status: 'İşlemde'
    }
  ]);

  const [activeTab, setActiveTab] = useState('applications'); // Başlangıç olarak başvuruları göstereceğiz

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

  // Ortak stil ayarları
  const inputStyle = {
    width: '100%',
    padding: '6px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontSize: '11px'
  };

  const whiteInputStyle = {
    ...inputStyle,
    backgroundColor: 'white'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Form gönderme işlemi burada yapılacak
    alert('Başvurunuz alındı!');
  };

  // Başvuru detayını görüntüleme fonksiyonu
  const handleViewDetails = (id) => {
    console.log("Başvuru detayı görüntüleniyor: ", id);
    // Burada başvuru detaylarını görüntüleme işlemleri yapılabilir
  };

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
                    placeholderTextColor: 'rgba(255, 255, 255, 0.7)'
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
        {/* Tabs */}
        <div style={{
          display: 'flex',
          maxWidth: '1200px',
          width: '90%',
          marginBottom: '8px',
          borderBottom: '1px solid #eee'
        }}>
          <div 
            style={{
              padding: '8px',
              cursor: 'pointer',
              backgroundColor: activeTab === 'applications' ? '#fff' : 'transparent',
              borderBottom: activeTab === 'applications' ? '2px solid #D71923' : 'none',
              fontWeight: activeTab === 'applications' ? 'bold' : 'normal',
              color: '#333',
              fontSize: '13px'
            }}
            onClick={() => setActiveTab('applications')}
          >
            Vize Başvurularım
          </div>
          <div 
            style={{
              padding: '8px',
              cursor: 'pointer',
              backgroundColor: activeTab === 'newApplication' ? '#fff' : 'transparent',
              borderBottom: activeTab === 'newApplication' ? '2px solid #D71923' : 'none',
              fontWeight: activeTab === 'newApplication' ? 'bold' : 'normal',
              marginLeft: '15px',
              color: '#333',
              fontSize: '13px'
            }}
            onClick={() => setActiveTab('newApplication')}
          >
            Yeni Başvuru Yap
          </div>
          <Link
            to="/home"
            style={{
              padding: '8px',
              textDecoration: 'none',
              marginLeft: '15px',
              color: '#333',
              fontSize: '13px'
            }}
          >
            Anasayfa
          </Link>
        </div>

        {/* Applications Table - Shown when activeTab is 'applications' */}
        {activeTab === 'applications' && (
          <div style={{
            width: '90%',
            maxWidth: '1200px',
            marginTop: '20px',
            marginBottom: '20px',
            overflowX: 'auto'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12px'
            }}>
              <thead>
                <tr style={{ 
                  borderBottom: '1px solid #eee',
                  textAlign: 'left',
                  color: '#333'
                }}>
                  <th style={{ padding: '8px 4px' }}>Takip No</th>
                  <th style={{ padding: '8px 4px' }}>Başvuru Tarihi</th>
                  <th style={{ padding: '8px 4px' }}>İsim Soyisim</th>
                  <th style={{ padding: '8px 4px' }}>Vize Tipi</th>
                  <th style={{ padding: '8px 4px' }}>Başvuru Tipi</th>
                  <th style={{ padding: '8px 4px' }}>Ekspres</th>
                  <th style={{ padding: '8px 4px' }}>Sigorta</th>
                  <th style={{ padding: '8px 4px' }}>Ücret</th>
                  <th style={{ padding: '8px 4px' }}>Fatura</th>
                  <th style={{ padding: '8px 4px' }}>Başvuru Durumu</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 4px', color: '#333' }}>{app.id}</td>
                    <td style={{ padding: '8px 4px', color: '#333' }}>{app.applicationDate}</td>
                    <td style={{ padding: '8px 4px', color: '#333' }}>{app.fullName}</td>
                    <td style={{ padding: '8px 4px', color: '#333' }}>{app.visaType}</td>
                    <td style={{ padding: '8px 4px', color: '#333' }}>{app.applicationType}</td>
                    <td style={{ padding: '8px 4px', color: '#333' }}>{app.express}</td>
                    <td style={{ padding: '8px 4px', color: '#333' }}>{app.insurance}</td>
                    <td style={{ padding: '8px 4px', color: '#333' }}>{app.fee}</td>
                    <td style={{ padding: '8px 4px', color: '#333' }}>{app.invoice}</td>
                    <td style={{ padding: '8px 4px' }}>
                      <button
                        onClick={() => handleViewDetails(app.id)}
                        style={{
                          backgroundColor: '#D71923',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '11px'
                        }}
                      >
                        Detay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form Container - Shown when activeTab is 'newApplication' */}
        {activeTab === 'newApplication' && (
          <div style={{
            backgroundColor: '#fff',
            padding: '15px',
            width: '90%',
            maxWidth: '400px',
            boxSizing: 'border-box',
            marginBottom: '40px',
            maxHeight: '70vh',
            overflowY: 'auto',
            border: '1px solid #eaeaea',
            borderRadius: '5px'
          }}>
            <form onSubmit={handleSubmit} style={{ padding: '0' }}>
              {/* İlk satır - İsim ve Kimlik No */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: '1' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    marginBottom: '3px'
                  }}>
                    İsim Soyisim
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Selma Reşan"
                    style={whiteInputStyle}
                    required
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    marginBottom: '3px'
                  }}>
                    Kimlik Numarası
                  </div>
                  <input
                    type="text"
                    name="identityNumber"
                    value={formData.identityNumber}
                    onChange={handleInputChange}
                    placeholder="12345678910"
                    style={whiteInputStyle}
                    required
                  />
                </div>
              </div>

              {/* İkinci satır - Telefon ve Email */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: '1' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    marginBottom: '3px'
                  }}>
                    Cep Telefonu
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+90 538 366 91 10"
                    style={whiteInputStyle}
                    required
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    marginBottom: '3px'
                  }}>
                    E-posta
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ornekmailadresi@dubaivizesi.com"
                    style={whiteInputStyle}
                    required
                  />
                </div>
              </div>

              {/* Üçüncü satır - Başvuru Tipi ve Vize Tipi */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: '1' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    marginBottom: '3px'
                  }}>
                    Başvuru Tipi
                  </div>
                  <select
                    name="applicationType"
                    value={formData.applicationType}
                    onChange={handleInputChange}
                    style={whiteInputStyle}
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="turist">Turist</option>
                    <option value="business">İş</option>
                    <option value="student">Öğrenci</option>
                  </select>
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    marginBottom: '3px'
                  }}>
                    Vize Tipi
                  </div>
                  <select
                    name="visaType"
                    value={formData.visaType}
                    onChange={handleInputChange}
                    style={whiteInputStyle}
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="30">30 Gün Tek Giriş</option>
                    <option value="90">90 Gün Çok Giriş</option>
                  </select>
                </div>
              </div>

              {/* Dördüncü satır - Ekspres, Sigorta, Kullanım Türü */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: '1' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    marginBottom: '3px'
                  }}>
                    Ekspres Başvuru
                  </div>
                  <select
                    name="expressApplication"
                    value={formData.expressApplication}
                    onChange={handleInputChange}
                    style={whiteInputStyle}
                  >
                    <option value="">Hayır</option>
                    <option value="yes">Evet</option>
                  </select>
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    marginBottom: '3px'
                  }}>
                    Sigorta
                  </div>
                  <select
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleInputChange}
                    style={whiteInputStyle}
                  >
                    <option value="">Hayır</option>
                    <option value="yes">Evet</option>
                  </select>
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    marginBottom: '3px'
                  }}>
                    Kullanım Türü
                  </div>
                  <select
                    name="usageType"
                    value={formData.usageType}
                    onChange={handleInputChange}
                    style={whiteInputStyle}
                  >
                    <option value="">Bireysel</option>
                    <option value="family">Aile</option>
                    <option value="group">Grup</option>
                  </select>
                </div>
              </div>

              {/* İlk sıra dosya yükleme alanları başlıkları */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '5px', marginTop: '15px' }}>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px'
                  }}>
                    Pasaport Görseli
                  </div>
                </div>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px'
                  }}>
                    Vesikalık Fotoğraf
                  </div>
                </div>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px'
                  }}>
                    Uçak Bileti
                  </div>
                </div>
              </div>

              {/* İlk sıra dosya yükleme alanları */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{ 
                    border: '1px solid #ccc', 
                    borderRadius: '10px', 
                    padding: '6px',
                    position: 'relative',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {formData.passport ? (
                        <img 
                          src={URL.createObjectURL(formData.passport)} 
                          alt="Pasaport" 
                          style={{ maxHeight: '55px', maxWidth: '100%' }} 
                        />
                      ) : (
                        <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="200" height="200" rx="20" fill="#E0E0E0" fillOpacity="0.5"/>
                          <path d="M80 80C93.2548 80 104 69.2548 104 56C104 42.7452 93.2548 32 80 32C66.7452 32 56 42.7452 56 56C56 69.2548 66.7452 80 80 80Z" fill="#CCCCCC"/>
                          <path d="M120 80C133.255 80 144 69.2548 144 56C144 42.7452 133.255 32 120 32C106.745 32 96 42.7452 96 56C96 69.2548 106.745 80 120 80Z" fill="#CCCCCC"/>
                          <path d="M140 140V168H60V140C60 129.954 68.9543 122 79 122H121C131.046 122 140 129.954 140 140Z" fill="#CCCCCC"/>
                        </svg>
                      )}
                    </div>
                    <div style={{ 
                      position: 'absolute', 
                      top: '5px', 
                      right: '5px', 
                      width: '18px', 
                      height: '18px', 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: '1px solid #ccc'
                    }}>
                      <span style={{ fontSize: '16px', lineHeight: '16px' }}>+</span>
                    </div>
                    <input
                      type="file"
                      name="passport"
                      onChange={handleFileChange}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{ 
                    border: '1px solid #ccc', 
                    borderRadius: '10px', 
                    padding: '6px',
                    position: 'relative',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {formData.photo ? (
                        <img 
                          src={URL.createObjectURL(formData.photo)} 
                          alt="Vesikalık" 
                          style={{ maxHeight: '55px', maxWidth: '100%' }} 
                        />
                      ) : (
                        <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="200" height="200" rx="20" fill="#E0E0E0" fillOpacity="0.5"/>
                          <path d="M80 80C93.2548 80 104 69.2548 104 56C104 42.7452 93.2548 32 80 32C66.7452 32 56 42.7452 56 56C56 69.2548 66.7452 80 80 80Z" fill="#CCCCCC"/>
                          <path d="M120 80C133.255 80 144 69.2548 144 56C144 42.7452 133.255 32 120 32C106.745 32 96 42.7452 96 56C96 69.2548 106.745 80 120 80Z" fill="#CCCCCC"/>
                          <path d="M140 140V168H60V140C60 129.954 68.9543 122 79 122H121C131.046 122 140 129.954 140 140Z" fill="#CCCCCC"/>
                        </svg>
                      )}
                    </div>
                    <div style={{ 
                      position: 'absolute', 
                      top: '5px', 
                      right: '5px', 
                      width: '18px', 
                      height: '18px', 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: '1px solid #ccc'
                    }}>
                      <span style={{ fontSize: '16px', lineHeight: '16px' }}>+</span>
                    </div>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{ 
                    border: '1px solid #ccc', 
                    borderRadius: '10px', 
                    padding: '6px',
                    position: 'relative',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {formData.flightTicket ? (
                        <img 
                          src={URL.createObjectURL(formData.flightTicket)} 
                          alt="Uçak Bileti" 
                          style={{ maxHeight: '55px', maxWidth: '100%' }} 
                        />
                      ) : (
                        <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="200" height="200" rx="20" fill="#E0E0E0" fillOpacity="0.5"/>
                          <path d="M80 80C93.2548 80 104 69.2548 104 56C104 42.7452 93.2548 32 80 32C66.7452 32 56 42.7452 56 56C56 69.2548 66.7452 80 80 80Z" fill="#CCCCCC"/>
                          <path d="M120 80C133.255 80 144 69.2548 144 56C144 42.7452 133.255 32 120 32C106.745 32 96 42.7452 96 56C96 69.2548 106.745 80 120 80Z" fill="#CCCCCC"/>
                          <path d="M140 140V168H60V140C60 129.954 68.9543 122 79 122H121C131.046 122 140 129.954 140 140Z" fill="#CCCCCC"/>
                        </svg>
                      )}
                    </div>
                    <div style={{ 
                      position: 'absolute', 
                      top: '5px', 
                      right: '5px', 
                      width: '18px', 
                      height: '18px', 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: '1px solid #ccc'
                    }}>
                      <span style={{ fontSize: '16px', lineHeight: '16px' }}>+</span>
                    </div>
                    <input
                      type="file"
                      name="flightTicket"
                      onChange={handleFileChange}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>

              {/* İkinci sıra dosya yükleme alanları başlıkları */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '5px' }}>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px'
                  }}>
                    Otel Rezervasyonu
                  </div>
                </div>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{
                    color: '#D71923',
                    fontWeight: 'bold',
                    fontSize: '11px'
                  }}>
                    Diğer
                  </div>
                </div>
                <div style={{ flex: '1' }}></div>
              </div>

              {/* İkinci sıra dosya yükleme alanları */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{ 
                    border: '1px solid #ccc', 
                    borderRadius: '10px', 
                    padding: '6px',
                    position: 'relative',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {formData.hotelReservation ? (
                        <img 
                          src={URL.createObjectURL(formData.hotelReservation)} 
                          alt="Otel Rezervasyonu" 
                          style={{ maxHeight: '55px', maxWidth: '100%' }} 
                        />
                      ) : (
                        <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="200" height="200" rx="20" fill="#E0E0E0" fillOpacity="0.5"/>
                          <path d="M80 80C93.2548 80 104 69.2548 104 56C104 42.7452 93.2548 32 80 32C66.7452 32 56 42.7452 56 56C56 69.2548 66.7452 80 80 80Z" fill="#CCCCCC"/>
                          <path d="M120 80C133.255 80 144 69.2548 144 56C144 42.7452 133.255 32 120 32C106.745 32 96 42.7452 96 56C96 69.2548 106.745 80 120 80Z" fill="#CCCCCC"/>
                          <path d="M140 140V168H60V140C60 129.954 68.9543 122 79 122H121C131.046 122 140 129.954 140 140Z" fill="#CCCCCC"/>
                        </svg>
                      )}
                    </div>
                    <div style={{ 
                      position: 'absolute', 
                      top: '5px', 
                      right: '5px', 
                      width: '18px', 
                      height: '18px', 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: '1px solid #ccc'
                    }}>
                      <span style={{ fontSize: '16px', lineHeight: '16px' }}>+</span>
                    </div>
                    <input
                      type="file"
                      name="hotelReservation"
                      onChange={handleFileChange}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <div style={{ 
                    border: '1px solid #ccc', 
                    borderRadius: '10px', 
                    padding: '6px',
                    position: 'relative',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {formData.otherDocument ? (
                        <img 
                          src={URL.createObjectURL(formData.otherDocument)} 
                          alt="Diğer" 
                          style={{ maxHeight: '55px', maxWidth: '100%' }} 
                        />
                      ) : (
                        <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="200" height="200" rx="20" fill="#E0E0E0" fillOpacity="0.5"/>
                          <path d="M80 80C93.2548 80 104 69.2548 104 56C104 42.7452 93.2548 32 80 32C66.7452 32 56 42.7452 56 56C56 69.2548 66.7452 80 80 80Z" fill="#CCCCCC"/>
                          <path d="M120 80C133.255 80 144 69.2548 144 56C144 42.7452 133.255 32 120 32C106.745 32 96 42.7452 96 56C96 69.2548 106.745 80 120 80Z" fill="#CCCCCC"/>
                          <path d="M140 140V168H60V140C60 129.954 68.9543 122 79 122H121C131.046 122 140 129.954 140 140Z" fill="#CCCCCC"/>
                        </svg>
                      )}
                    </div>
                    <div style={{ 
                      position: 'absolute', 
                      top: '5px', 
                      right: '5px', 
                      width: '18px', 
                      height: '18px', 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: '1px solid #ccc'
                    }}>
                      <span style={{ fontSize: '16px', lineHeight: '16px' }}>+</span>
                    </div>
                    <input
                      type="file"
                      name="otherDocument"
                      onChange={handleFileChange}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div style={{ flex: '1' }}></div>
              </div>

              {/* Yeni Kayıt Ekle butonu */}
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <button type="button" style={{
                  backgroundColor: 'transparent',
                  color: '#D71923',
                  border: '1px solid #D71923',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  Yeni Kayıt Ekle
                </button>
              </div>

              {/* Ödeme Bilgileri */}
              <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <div style={{ flex: '1' }}>
                    <div style={{
                      color: '#333',
                      fontSize: '11px',
                      marginBottom: '3px'
                    }}>
                      Ödeme Türü
                    </div>
                    <input
                      type="text"
                      name="paymentType"
                      value={formData.paymentType}
                      onChange={handleInputChange}
                      style={whiteInputStyle}
                    />
                  </div>
                  <div style={{ flex: '1' }}>
                    <div style={{
                      color: '#333',
                      fontSize: '11px',
                      marginBottom: '3px'
                    }}>
                      Ödeme Tutarı
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <input
                        type="text"
                        name="paymentAmount"
                        value={formData.paymentAmount}
                        onChange={handleInputChange}
                        style={whiteInputStyle}
                      />
                      <input
                        type="text"
                        value="TRY"
                        readOnly
                        style={whiteInputStyle}
                      />
                    </div>
                  </div>
                  <div style={{ flex: '1' }}>
                    <div style={{
                      color: '#333',
                      fontSize: '11px',
                      marginBottom: '3px'
                    }}>
                      Ödeme Yapan
                    </div>
                    <input
                      type="text"
                      name="paymentBy"
                      value={formData.paymentBy}
                      onChange={handleInputChange}
                      style={whiteInputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Başvuru Yap butonu */}
              <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '10px' }}>
                <button type="submit" style={{
                  backgroundColor: '#D71923',
                  color: 'white',
                  border: 'none',
                  padding: '6px 20px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}>
                  Başvuru Yap
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaApplicationForm; 