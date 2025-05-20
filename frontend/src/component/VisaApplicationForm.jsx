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

  const [activeTab, setActiveTab] = useState('newApplication');

  // HTML ve Body stillerini ayarla
  React.useEffect(() => {
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#fff"; // Beyaz arka plan
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        boxSizing: 'border-box'
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          maxWidth: '400px',
          width: '90%',
          marginBottom: '8px'
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
        </div>

        {/* Form Container */}
        <div style={{
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '400px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          marginBottom: '20px',
          border: '1px solid #eee'
        }}>
          <form onSubmit={handleSubmit} style={{ padding: '0' }}>
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '12px',
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
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  fontSize: '12px',
                  marginBottom: '8px'
                }}
                required
              />
              
              <div style={{
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '12px',
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
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  fontSize: '12px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <div style={{
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '12px',
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
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  fontSize: '12px',
                  marginBottom: '8px'
                }}
                required
              />
              
              <div style={{
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '12px',
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
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  fontSize: '12px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <div style={{
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '12px',
                marginBottom: '3px'
              }}>
                Başvuru Tipi
              </div>
              <select
                name="applicationType"
                value={formData.applicationType}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  fontSize: '12px',
                  marginBottom: '8px'
                }}
                required
              >
                <option value="">Seçiniz</option>
                <option value="turist">Turist</option>
                <option value="business">İş</option>
                <option value="student">Öğrenci</option>
              </select>
              
              <div style={{
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '12px',
                marginBottom: '3px'
              }}>
                Vize Türü
              </div>
              <select
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  fontSize: '12px'
                }}
                required
              >
                <option value="">Seçiniz</option>
                <option value="30">30 Gün Tek Giriş</option>
                <option value="90">90 Gün Çok Giriş</option>
              </select>
            </div>

            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '10px'
            }}>
              <div style={{ flex: '1' }}>
                <div style={{
                  color: '#D71923',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  marginBottom: '3px'
                }}>
                  Ekspres Başvuru
                </div>
                <select
                  name="expressApplication"
                  value={formData.expressApplication}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '6px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    fontSize: '12px'
                  }}
                >
                  <option value="">Hayır</option>
                  <option value="yes">Evet</option>
                </select>
              </div>
              <div style={{ flex: '1' }}>
                <div style={{
                  color: '#D71923',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  marginBottom: '3px'
                }}>
                  Sigorta
                </div>
                <select
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '6px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    fontSize: '12px'
                  }}
                >
                  <option value="">Hayır</option>
                  <option value="yes">Evet</option>
                </select>
              </div>
              <div style={{ flex: '1' }}>
                <div style={{
                  color: '#D71923',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  marginBottom: '3px'
                }}>
                  Kullanım Türü
                </div>
                <select
                  name="usageType"
                  value={formData.usageType}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '6px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    fontSize: '12px'
                  }}
                >
                  <option value="">Bireysel</option>
                  <option value="family">Aile</option>
                  <option value="group">Grup</option>
                </select>
              </div>
            </div>

            <div style={{ 
              textAlign: 'center', 
              marginTop: '10px', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              fontSize: '13px'
            }}>
              Dökümanlar
            </div>
              
            <div style={{
              display: 'flex',
              marginBottom: '6px'
            }}>
              <div style={{
                flex: 1,
                textAlign: 'center',
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '11px'
              }}>
                Pasaport Görseli
              </div>
              <div style={{
                flex: 1,
                textAlign: 'center',
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '11px'
              }}>
                Vesikalık Fotoğraf
              </div>
              <div style={{
                flex: 1,
                textAlign: 'center',
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '11px'
              }}>
                Uçak Bileti
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
              <div style={{ flex: '1', textAlign: 'center' }}>
                <div style={{ 
                  border: '1px dashed #ccc', 
                  borderRadius: '5px', 
                  padding: '5px',
                  backgroundColor: '#f9f9f9',
                  position: 'relative' 
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto',
                    backgroundColor: '#eee',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {formData.passport ? (
                      <img 
                        src={URL.createObjectURL(formData.passport)} 
                        alt="Pasaport" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <svg width="30" height="30" fill="#aaa" viewBox="0 0 24 24">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#aaa"/>
                      </svg>
                    )}
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
                  border: '1px dashed #ccc', 
                  borderRadius: '5px', 
                  padding: '5px',
                  backgroundColor: '#f9f9f9',
                  position: 'relative' 
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto',
                    backgroundColor: '#eee',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {formData.photo ? (
                      <img 
                        src={URL.createObjectURL(formData.photo)} 
                        alt="Vesikalık" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <svg width="30" height="30" fill="#aaa" viewBox="0 0 24 24">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#aaa"/>
                      </svg>
                    )}
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
                  border: '1px dashed #ccc', 
                  borderRadius: '5px', 
                  padding: '5px',
                  backgroundColor: '#f9f9f9',
                  position: 'relative' 
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto',
                    backgroundColor: '#eee',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {formData.flightTicket ? (
                      <img 
                        src={URL.createObjectURL(formData.flightTicket)} 
                        alt="Uçak Bileti" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <svg width="30" height="30" fill="#aaa" viewBox="0 0 24 24">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#aaa"/>
                      </svg>
                    )}
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

            <div style={{
              display: 'flex',
              marginBottom: '6px'
            }}>
              <div style={{
                flex: 1,
                textAlign: 'center',
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '11px'
              }}>
                Otel Rezervasyonu
              </div>
              <div style={{
                flex: 1,
                textAlign: 'center',
                color: '#D71923',
                fontWeight: 'bold',
                fontSize: '11px'
              }}>
                Diğer
              </div>
              <div style={{ flex: 1 }}></div>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <div style={{ flex: '1', textAlign: 'center' }}>
                <div style={{ 
                  border: '1px dashed #ccc', 
                  borderRadius: '5px', 
                  padding: '5px',
                  backgroundColor: '#f9f9f9',
                  position: 'relative' 
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto',
                    backgroundColor: '#eee',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {formData.hotelReservation ? (
                      <img 
                        src={URL.createObjectURL(formData.hotelReservation)} 
                        alt="Otel Rezervasyonu" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <svg width="30" height="30" fill="#aaa" viewBox="0 0 24 24">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#aaa"/>
                      </svg>
                    )}
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
                  border: '1px dashed #ccc', 
                  borderRadius: '5px', 
                  padding: '5px',
                  backgroundColor: '#f9f9f9',
                  position: 'relative' 
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto',
                    backgroundColor: '#eee',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {formData.otherDocument ? (
                      <img 
                        src={URL.createObjectURL(formData.otherDocument)} 
                        alt="Diğer" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <svg width="30" height="30" fill="#aaa" viewBox="0 0 24 24">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#aaa"/>
                      </svg>
                    )}
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

            <div style={{ textAlign: 'center', marginTop: '8px', marginBottom: '5px' }}>
              <button type="button" style={{
                backgroundColor: 'transparent',
                color: '#D71923',
                border: '1px solid #D71923',
                padding: '4px 10px',
                borderRadius: '16px',
                cursor: 'pointer',
                fontSize: '11px'
              }}>
                Veri Kayıt Ekle
              </button>
            </div>

            <hr style={{ 
              border: 'none', 
              borderBottom: '1px solid #eee',
              margin: '10px 0'
            }} />

            <div style={{
              display: 'flex',
              gap: '6px',
              marginBottom: '10px',
              marginTop: '8px'
            }}>
              <div style={{ flex: '1' }}>
                <div style={{
                  color: '#666',
                  fontWeight: 'normal',
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
                  style={{
                    width: '100%',
                    padding: '6px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    fontSize: '11px'
                  }}
                />
              </div>
              <div style={{ flex: '1' }}>
                <div style={{
                  color: '#666',
                  fontWeight: 'normal',
                  fontSize: '11px',
                  marginBottom: '3px'
                }}>
                  Ödeme Tutarı
                </div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <input
                    type="text"
                    name="paymentAmount"
                    value={formData.paymentAmount}
                    onChange={handleInputChange}
                    style={{
                      width: '70%',
                      padding: '6px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: '#f9f9f9',
                      fontSize: '11px'
                    }}
                  />
                  <input
                    type="text"
                    value="TRY"
                    readOnly
                    style={{
                      width: '30%',
                      padding: '6px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: '#f9f9f9',
                      fontSize: '11px'
                    }}
                  />
                </div>
              </div>
              <div style={{ flex: '1' }}>
                <div style={{
                  color: '#666',
                  fontWeight: 'normal',
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
                  style={{
                    width: '100%',
                    padding: '6px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    fontSize: '11px'
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button type="submit" style={{
                backgroundColor: '#D71923',
                color: 'white',
                border: 'none',
                padding: '6px 18px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold'
              }}>
                Başvuru Yap
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisaApplicationForm; 