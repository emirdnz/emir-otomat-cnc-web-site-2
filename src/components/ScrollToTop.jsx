import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unlisten = navigate((location) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    return unlisten;
  }, [navigate]);

  useEffect(() => {
    // Sayfa yüklendiğinde de en üste kaydırma yapmak için
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);

  return null;
};

export default ScrollToTop;