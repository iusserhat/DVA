import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createVisaApplication } from '../services/visaService';

const VisaApplicationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    visaType: '',
    applicantName: '',
    passportNumber: '',
    destinationCountry: 'Dubai',
    amount: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.visaType || !formData.applicantName || !formData.passportNumber) {
      toast.error('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await createVisaApplication(formData);
      
      if (response.success) {
        toast.success('Vize başvurunuz başarıyla alındı');
        navigate('/dashboard/visa-applications');
      } else {
        toast.error(response.message || 'Başvuru gönderilirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Vize başvurusu hatası:', error);
      toast.error('Başvuru işlemi sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Yeni Vize Başvurusu</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="visaType" className="block text-gray-700 font-medium mb-2">
            Vize Tipi*
          </label>
          <select
            id="visaType"
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Vize tipi seçin</option>
            <option value="turist">Turist Vizesi</option>
            <option value="iş">İş Vizesi</option>
            <option value="transit">Transit Vize</option>
            <option value="öğrenci">Öğrenci Vizesi</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="applicantName" className="block text-gray-700 font-medium mb-2">
            Başvuran Adı Soyadı*
          </label>
          <input
            type="text"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="passportNumber" className="block text-gray-700 font-medium mb-2">
            Pasaport Numarası*
          </label>
          <input
            type="text"
            id="passportNumber"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="destinationCountry" className="block text-gray-700 font-medium mb-2">
            Gidilecek Ülke
          </label>
          <input
            type="text"
            id="destinationCountry"
            name="destinationCountry"
            value={formData.destinationCountry}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
            Notlar
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {loading ? 'İşleniyor...' : 'Başvuruyu Gönder'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisaApplicationForm; 