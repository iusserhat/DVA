import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VizeBasvurularimPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Yönlendirme yap
    navigate('/vize-basvurularim/form');
  }, [navigate]);

  return (
    <div>
      <p>Yönlendiriliyor...</p>
    </div>
  );
};

export default VizeBasvurularimPage; 