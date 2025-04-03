import React, { useState, useRef, useEffect } from 'react';
import { Typography, Card, Input, Textarea, Button, Select, Option, Spinner } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

// Hata ayıklama ve kontrol için
import { ErrorLogger } from '../utils/debugHelper';
import logger from '../utils/logger.js';

/**
 * UploadModel bileşeni - Kullanıcıların dosya yükleyip teklif alabilecekleri sayfadır
 */
function UploadModel() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // State tanımlamaları
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    quantity: '',
    material: '',
    phone: '',
    email: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isGoogleDriveAvailable, setIsGoogleDriveAvailable] = useState(false);

  // Malzeme seçenekleri
  const materialOptions = [
    'Alüminyum',
    'Çelik',
    'Paslanmaz Çelik',
    'Pirinç',
    'Bakır',
    'Plastik',
    'Diğer'
  ];

  // Bileşen yüklendiğinde çalışacak kod
  useEffect(() => {
    logger.info('UploadModel', 'Bileşen yüklendi');
    console.log("%c UploadModel bileşeni yüklendi", "background: #4CAF50; color: white;");
    
    // Google Drive servisinin kullanılabilirliğini kontrol et
    checkGoogleDriveService();
    
    // Sayfa kapatılırken uyarı göster (eğer form doldurulmuşsa)
    const handleBeforeUnload = (e) => {
      if (isFormFilled()) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      console.log("%c UploadModel bileşeni kaldırıldı", "background: #F44336; color: white;");
      logger.debug('UploadModel', 'Bileşen kaldırıldı');
    };
  }, []);

  // Google Drive servisinin kullanılabilirliğini kontrol et
  const checkGoogleDriveService = async () => {
    try {
      // Dinamik import kullanarak Google Drive servisini yükle
      const googleDriveModule = await import('../services/googleDriveService');
      console.log("%c Google Drive servisi başarıyla yüklendi", "background: #4CAF50; color: white;");
      setIsGoogleDriveAvailable(true);
      
      // Global değişkene ata (hata ayıklama için)
      window.googleDriveService = googleDriveModule.default;
    } catch (error) {
      console.error("%c Google Drive servisi yüklenemedi:", "background: #F44336; color: white;", error);
      setIsGoogleDriveAvailable(false);
      
      // Hata bilgisini göster
      ErrorLogger.logError(error, { componentStack: "UploadModel -> checkGoogleDriveService" });
      logger.error('UploadModel', 'Google Drive servisi yüklenemedi', { error: error.toString(), stack: error.stack });
    }
  };

  // Form doldurulmuş mu kontrol et
  const isFormFilled = () => {
    return Object.values(formData).some(value => value.trim() !== '') || files.length > 0;
  };

  // Form alanlarını güncelleme fonksiyonu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Hata durumunu temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    logger.debug('UploadModel', `Form alanı güncellendi: ${name}`);
  };

  // Malzeme seçimi için özel fonksiyon
  const handleMaterialChange = (value) => {
    setFormData({
      ...formData,
      material: value
    });
    
    // Hata durumunu temizle
    if (errors.material) {
      setErrors({
        ...errors,
        material: null
      });
    }
  };

  // Dosya sürükleme olaylarını yönetme
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Dosya bırakma olayını yönetme
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Dosya seçme olayını yönetme
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Dosya seçme butonu için
  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("%c Dosya input referansı bulunamadı", "background: #F44336; color: white;");
    }
  };

  // Dosyaları işleme
  const handleFiles = (fileList) => {
    try {
      const newFiles = Array.from(fileList);
      
      // Dosya boyutu kontrolü (50MB'dan büyük dosyaları engelle)
      const oversizedFiles = newFiles.filter(file => file.size > 50 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        const errorMessage = `Bazı dosyalar çok büyük: ${oversizedFiles.map(f => f.name).join(', ')}. Maksimum dosya boyutu 50MB olmalıdır.`;
        console.error("%c Dosya boyutu hatası:", "background: #F44336; color: white;", errorMessage);
        setErrors({
          ...errors,
          files: errorMessage
        });
        return;
      }
      
      // Dosya tipi kontrolü
      const allowedTypes = [
        // 3D model dosyaları
        '.stl', '.obj', '.step', '.stp', '.iges', '.igs', '.3dm', '.3ds',
        // Teknik çizimler
        '.pdf', '.dwg', '.dxf', '.cad',
        // Görsel dosyalar
        '.jpg', '.jpeg', '.png', '.tif', '.tiff',
        // Diğer
        '.zip', '.rar', '.7z'
      ];
      
      const invalidFiles = newFiles.filter(file => {
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        return !allowedTypes.includes(extension);
      });
      
      if (invalidFiles.length > 0) {
        const errorMessage = `Bazı dosya tipleri desteklenmiyor: ${invalidFiles.map(f => f.name).join(', ')}`;
        console.error("%c Dosya tipi hatası:", "background: #F44336; color: white;", errorMessage);
        setErrors({
          ...errors,
          files: errorMessage
        });
        return;
      }
      
      console.log("%c Dosyalar başarıyla eklendi:", "background: #4CAF50; color: white;", newFiles);
      setFiles([...files, ...newFiles]);
      
      // Hata durumunu temizle
      if (errors.files) {
        setErrors({
          ...errors,
          files: null
        });
      }
    } catch (error) {
      console.error("%c Dosya işleme hatası:", "background: #F44336; color: white;", error);
      ErrorLogger.logError(error, { componentStack: "UploadModel -> handleFiles" });
      logger.error('UploadModel', 'Dosya işleme hatası', { error: error.toString(), stack: error.stack });
    }
  };

  // Dosyayı listeden kaldırma
  const removeFile = (index) => {
    try {
      const newFiles = [...files];
      const removedFile = newFiles[index];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      console.log("%c Dosya kaldırıldı:", "background: #FF9800; color: white;", removedFile.name);
    } catch (error) {
      console.error("%c Dosya kaldırma hatası:", "background: #F44336; color: white;", error);
    }
  };

  // Form doğrulama
  const validateForm = () => {
    console.log("%c Form doğrulaması başlatıldı", "background: #2196F3; color: white;");
    const newErrors = {};
    
    // Zorunlu alanları kontrol et
    if (!formData.fullName.trim()) newErrors.fullName = 'İsim Soyisim zorunludur';
    if (!formData.companyName.trim()) newErrors.companyName = 'Firma ismi zorunludur';
    if (!formData.quantity.trim()) newErrors.quantity = 'Adet sayısı zorunludur';
    if (!formData.material) newErrors.material = 'Malzeme seçimi zorunludur';
    if (!formData.phone.trim()) newErrors.phone = 'Telefon numarası zorunludur';
    if (files.length === 0) newErrors.files = 'En az bir dosya yüklemeniz gerekmektedir';
    
    // Email formatını kontrol et (opsiyonel alan)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    // Telefon numarası formatını kontrol et
    if (formData.phone && !/^[0-9+\s()-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz';
    }
    
    // Adet sayısının sayı olup olmadığını kontrol et
    if (formData.quantity && isNaN(Number(formData.quantity))) {
      newErrors.quantity = 'Adet sayısı bir sayı olmalıdır';
    }
    
    console.log("%c Form doğrulama sonuçları:", "background: #2196F3; color: white;", 
      Object.keys(newErrors).length === 0 ? "Başarılı ✅" : "Hatalar var ❌", 
      newErrors
    );
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Google Drive'a dosya yükleme fonksiyonu
  const uploadFilesToGoogleDrive = async (files) => {
    console.log("%c Google Drive'a dosya yükleme başlatıldı", "background: #2196F3; color: white;");
    
    try {
      if (!isGoogleDriveAvailable) {
        console.error("%c Google Drive servisi kullanılamıyor", "background: #F44336; color: white;");
        throw new Error("Google Drive servisi kullanılamıyor. Lütfen daha sonra tekrar deneyin.");
      }
      
      // Google Drive modülünü dinamik olarak import et
      const { uploadFilesToDrive } = await import('../services/googleDriveService');
      
      // Dosyaları yükle
      const uploadedFiles = await uploadFilesToDrive(files);
      console.log("%c Dosyalar başarıyla yüklendi:", "background: #4CAF50; color: white;", uploadedFiles);
      
      return uploadedFiles;
    } catch (error) {
      console.error("%c Google Drive yükleme hatası:", "background: #F44336; color: white;", error);
      
      // Hata durumunda, dosya bilgilerini döndürelim ama hata bilgisini de ekleyelim
      return files.map(file => ({
        name: file.name,
        size: file.size,
        error: error.message || 'Dosya yükleme hatası'
      }));
    }
  };

  // Form gönderme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("%c Form gönderme işlemi başlatıldı", "background: #2196F3; color: white;");
    
    // Form doğrulama
    if (!validateForm()) {
      console.error("%c Form doğrulama hatası", "background: #F44336; color: white;");
      
      // Hata varsa, sayfayı hata mesajlarına kaydır
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log("%c Sayfa hata alanına kaydırıldı:", "background: #FF9800; color: white;", firstErrorField);
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('processing');
    console.log("%c Form gönderiliyor...", "background: #FF9800; color: white;");
    
    try {
      // 1. Dosyaları Google Drive'a yükle
      let uploadedFiles = [];
      let driveError = null;
      
      try {
        uploadedFiles = await uploadFilesToGoogleDrive(files);
      } catch (error) {
        console.error("%c Google Drive yükleme hatası (işlem devam edecek):", "background: #F44336; color: white;", error);
        driveError = error;
        
        // Hata durumunda basit dosya bilgilerini kullan
        uploadedFiles = files.map(file => ({
          name: file.name,
          size: file.size,
          error: error.message || 'Dosya yükleme hatası'
        }));
      }
      
      // 2. Email.js ile form bilgilerini ve dosya linklerini gönder
      const templateParams = {
        from_name: formData.fullName,
        company_name: formData.companyName,
        quantity: formData.quantity,
        material: formData.material,
        phone: formData.phone,
        email: formData.email || 'Belirtilmedi',
        message: formData.additionalInfo || 'Ek bilgi yok',
        files_info: uploadedFiles.map(file => `${file.name} (${(file.size / 1024).toFixed(2)} KB)`).join(', '),
        files_url: driveError ? 'Google Drive yükleme hatası oluştu' : 'https://drive.google.com/drive/folders/1PfnvH34JzjdlkHOm2XjXlEHgxsH4a1I4',
        drive_error: driveError ? `Hata: ${driveError.message}` : ''
      };
      
      console.log("%c Email.js parametreleri hazırlandı:", "background: #2196F3; color: white;", templateParams);
      
      // Müşteriye bilgilendirme e-postası gönder
      if (formData.email) {
        try {
          console.log("%c Müşteriye bilgilendirme e-postası gönderiliyor...", "background: #FF9800; color: white;");
          
          await emailjs.send(
            'service_dxhbeah',
            'template_v3w5fgn', // Müşteri bilgilendirme şablonu
            {
              to_email: formData.email,
              to_name: formData.fullName,
              company_name: formData.companyName,
              quantity: formData.quantity,
              material: formData.material
            },
            'Sq8gd7BcnY_BkL4WN'
          );
          
          console.log("%c Müşteriye bilgilendirme e-postası gönderildi", "background: #4CAF50; color: white;");
        } catch (error) {
          console.error("%c Müşteri e-postası gönderme hatası:", "background: #F44336; color: white;", error);
        }
      }
      
      // Firmaya sipariş bilgilerini gönder
      try {
        console.log("%c Firmaya sipariş bilgileri gönderiliyor...", "background: #FF9800; color: white;");
        
        await emailjs.send(
          'service_dxhbeah',
          'template_0butaqg', // Sipariş talep formu şablonu
          templateParams,
          'Sq8gd7BcnY_BkL4WN'
        );
        
        console.log("%c Firmaya sipariş bilgileri gönderildi", "background: #4CAF50; color: white;");
      } catch (error) {
        console.error("%c Firma e-postası gönderme hatası:", "background: #F44336; color: white;", error);
        throw error; // Bu hatayı yukarı ilet
      }
      
      // Başarılı durum
      console.log("%c Form başarıyla gönderildi", "background: #4CAF50; color: white;");
      setSubmitStatus('success');
      
      // Formu sıfırla
      setFormData({
        fullName: '',
        companyName: '',
        quantity: '',
        material: '',
        phone: '',
        email: '',
        additionalInfo: ''
      });
      setFiles([]);
      
      logger.info('UploadModel', 'Form gönderimi başarıyla tamamlandı');
    } catch (error) {
      console.error("%c Form gönderme hatası:", "background: #F44336; color: white;", error);
      setSubmitStatus('error');
      
      // Hata bilgisini göster
      ErrorLogger.logError(error, { componentStack: "UploadModel -> handleSubmit" });
      logger.error('UploadModel', 'Form gönderimi hatası', { error: error.toString(), stack: error.stack });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Typography variant="h2" className="text-3xl font-bold text-gray-900">
            Hızlı Teklif Alın
          </Typography>
          <Typography className="mt-2 text-lg text-gray-600">
            Dosyanızı yükleyin ve sipariş detaylarınızı girin, size en kısa sürede dönüş yapalım.
          </Typography>
        </div>
        
        {/* Form kartı */}
        <Card color="white" shadow={true} className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="bg-green-100 p-4 rounded-lg mb-6">
                <Typography variant="h4" color="green" className="mb-2">
                  Talebiniz Başarıyla Gönderildi!
                </Typography>
                <Typography className="text-gray-700">
                  Sipariş talebiniz ekibimize iletilmiştir. En kısa sürede sizinle iletişime geçeceğiz.
                </Typography>
              </div>
              <Button 
                onClick={() => setSubmitStatus(null)} 
                className="mt-4 bg-primary-blue"
              >
                Yeni Talep Oluştur
              </Button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Dosya Yükleme Alanı */}
              <div className="mb-6">
                <Typography variant="h6" className="mb-2">
                  Dosya Yükleme*
                </Typography>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} ${errors.files ? 'border-red-500' : ''}`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <div className="space-y-2">
                    <Typography className="text-gray-700">
                      Dosyalarınızı buraya sürükleyip bırakın veya
                    </Typography>
                    <Button 
                      onClick={onButtonClick}
                      variant="outlined"
                      className="mt-2"
                    >
                      Dosya Seçin
                    </Button>
                    <Typography className="text-xs text-gray-500">
                      3D model dosyaları (.stl, .obj, .step, .iges, vb.) veya teknik çizimler (.pdf, .dwg, vb.)
                    </Typography>
                  </div>
                </div>
                
                {errors.files && (
                  <Typography color="red" className="mt-1 text-sm">
                    {errors.files}
                  </Typography>
                )}
                
                {/* Yüklenen Dosyalar Listesi */}
                {files.length > 0 && (
                  <div className="mt-4">
                    <Typography variant="h6" className="mb-2">
                      Yüklenen Dosyalar
                    </Typography>
                    <ul className="divide-y divide-gray-200 border rounded-lg">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between py-3 px-4">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                              <Typography className="text-sm font-medium text-gray-900 truncate" style={{maxWidth: '200px'}}>
                                {file.name}
                              </Typography>
                              <Typography className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(2)} KB
                              </Typography>
                            </div>
                          </div>
                          <Button 
                            color="red" 
                            variant="text" 
                            size="sm" 
                            onClick={() => removeFile(index)}
                            className="p-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Kişisel Bilgiler */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    label="İsim Soyisim*"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                  />
                  {errors.fullName && (
                    <Typography color="red" className="mt-1 text-sm">
                      {errors.fullName}
                    </Typography>
                  )}
                </div>
                
                <div>
                  <Input
                    type="text"
                    label="Firma İsmi*"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    error={!!errors.companyName}
                  />
                  {errors.companyName && (
                    <Typography color="red" className="mt-1 text-sm">
                      {errors.companyName}
                    </Typography>
                  )}
                </div>
              </div>
              
              {/* Sipariş Detayları */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="number"
                    label="Adet*"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    error={!!errors.quantity}
                  />
                  {errors.quantity && (
                    <Typography color="red" className="mt-1 text-sm">
                      {errors.quantity}
                    </Typography>
                  )}
                </div>
                
                <div>
                  <Select
                    label="Malzeme*"
                    value={formData.material}
                    onChange={handleMaterialChange}
                    error={!!errors.material}
                  >
                    {materialOptions.map((material) => (
                      <Option key={material} value={material}>
                        {material}
                      </Option>
                    ))}
                  </Select>
                  {errors.material && (
                    <Typography color="red" className="mt-1 text-sm">
                      {errors.material}
                    </Typography>
                  )}
                </div>
              </div>
              
              {/* İletişim Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="tel"
                    label="Telefon Numarası*"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                  />
                  {errors.phone && (
                    <Typography color="red" className="mt-1 text-sm">
                      {errors.phone}
                    </Typography>
                  )}
                </div>
                
                <div>
                  <Input
                    type="email"
                    label="E-posta (Opsiyonel)"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                  />
                  {errors.email && (
                    <Typography color="red" className="mt-1 text-sm">
                      {errors.email}
                    </Typography>
                  )}
                </div>
              </div>
              
              {/* Ek Bilgiler */}
              <div>
                <Textarea
                  label="Ek Bilgiler (Opsiyonel)"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                />
              </div>
              
              {/* Gönder Butonu */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="mt-4 bg-primary-blue"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Spinner className="h-4 w-4 mr-2" /> Gönderiliyor...
                    </div>
                  ) : (
                    "Teklif Talebini Gönder"
                  )}
                </Button>
                
                {submitStatus === 'error' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <Typography color="red" className="text-center">
                      Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya bizimle doğrudan iletişime geçin.
                    </Typography>
                  </div>
                )}
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

export default UploadModel;
