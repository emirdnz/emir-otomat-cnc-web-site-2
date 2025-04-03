import { google } from 'googleapis';

// Google Drive API yapılandırması
const API_KEY = 'AIzaSyBiNqsCZ5yEqloXUDevcQ3ZsU0z37lE7CI';
const FOLDER_ID = '1PfnvH34JzjdlkHOm2XjXlEHgxsH4a1I4';
const CLIENT_ID = '827199416031-oa8riu5hl3lm54kqvrn6fo6nkqfnk2ef.apps.googleusercontent.com';

// Google Drive API istemcisini oluşturma
const drive = google.drive({
  version: 'v3',
  auth: API_KEY
});

/**
 * Dosyayı Google Drive'a yükler
 * @param {File} file - Yüklenecek dosya
 * @param {string} fileName - Dosya adı
 * @returns {Promise<Object>} - Yüklenen dosya bilgileri
 */
export const uploadFileToDrive = async (file, fileName) => {
  try {
    // Dosyayı Base64'e çevirme
    const base64Data = await convertFileToBase64(file);
    
    // Dosya içeriğini oluşturma
    const fileMetadata = {
      name: fileName,
      parents: [FOLDER_ID]
    };
    
    // Dosyayı Google Drive'a yükleme
    const response = await drive.files.create({
      resource: fileMetadata,
      media: {
        body: Buffer.from(base64Data, 'base64'),
        mimeType: file.type
      },
      fields: 'id,name,webViewLink,size'
    });
    
    console.log('Dosya başarıyla yüklendi:', response.data);
    
    return {
      id: response.data.id,
      name: response.data.name,
      url: response.data.webViewLink,
      size: file.size
    };
  } catch (error) {
    console.error('Google Drive yükleme hatası:', error);
    
    // Hata durumunda, dosya bilgilerini döndürelim ama hata bilgisini de ekleyelim
    // Bu şekilde form gönderimi başarısız olmaz, ancak log'larda hatayı görebiliriz
    return {
      name: file.name,
      url: `https://drive.google.com/drive/folders/${FOLDER_ID}`,
      size: file.size,
      error: error.message
    };
  }
};

/**
 * Birden fazla dosyayı Google Drive'a yükler
 * @param {Array<File>} files - Yüklenecek dosyalar dizisi
 * @returns {Promise<Array<Object>>} - Yüklenen dosyaların bilgileri
 */
export const uploadFilesToDrive = async (files) => {
  try {
    // Her dosya için yükleme işlemini başlat
    const uploadPromises = files.map(file => uploadFileToDrive(file, file.name));
    
    // Tüm yükleme işlemlerinin tamamlanmasını bekle
    const uploadedFiles = await Promise.all(uploadPromises);
    
    return uploadedFiles;
  } catch (error) {
    console.error('Toplu dosya yükleme hatası:', error);
    
    // Hata durumunda, dosya bilgilerini döndürelim
    return files.map(file => ({
      name: file.name,
      url: `https://drive.google.com/drive/folders/${FOLDER_ID}`,
      size: file.size,
      error: 'Yükleme başarısız oldu'
    }));
  }
};

/**
 * Dosyayı Base64'e çevirir
 * @param {File} file - Çevrilecek dosya
 * @returns {Promise<string>} - Base64 formatında dosya içeriği
 */
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Google Drive klasör linkini döndürür
 * @returns {string} - Google Drive klasör linki
 */
export const getDriveFolderLink = () => {
  return `https://drive.google.com/drive/folders/${FOLDER_ID}`;
};

export default {
  uploadFileToDrive,
  uploadFilesToDrive,
  getDriveFolderLink
};
