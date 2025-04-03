import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import logger from '../utils/logger.js';

const TestDebug = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    logger.info('TestDebug', 'Test sayfası yüklendi');
    
    // Sayfa yüklendiğinde farklı log seviyelerini test et
    logger.debug('TestDebug', 'Debug seviyesi log mesajı');
    logger.info('TestDebug', 'Info seviyesi log mesajı');
    logger.warning('TestDebug', 'Warning seviyesi log mesajı');
    
    return () => {
      logger.debug('TestDebug', 'Test sayfası kaldırıldı');
    };
  }, []);
  
  // Konsol hata mesajı oluştur
  const triggerConsoleError = () => {
    logger.info('TestDebug', 'Console.error tetikleniyor');
    console.error('Bu bir test konsol hatasıdır');
  };
  
  // JavaScript hatası oluştur
  const triggerJsError = () => {
    logger.info('TestDebug', 'JavaScript hatası tetikleniyor');
    try {
      // Bilinçli olarak bir hata oluştur
      const obj = null;
      obj.nonExistentMethod();
    } catch (error) {
      logger.error('TestDebug', 'Yakalanan JavaScript hatası', {
        message: error.message,
        stack: error.stack
      });
    }
  };
  
  // Yakalanmamış hata oluştur
  const triggerUncaughtError = () => {
    logger.info('TestDebug', 'Yakalanmamış hata tetikleniyor');
    // Bu hata ErrorBoundary tarafından yakalanacak
    throw new Error('Bu bir test yakalanmamış hatasıdır');
  };
  
  // Promise hatası oluştur
  const triggerPromiseError = () => {
    logger.info('TestDebug', 'Promise hatası tetikleniyor');
    
    // Promise hatası
    new Promise((resolve, reject) => {
      reject(new Error('Bu bir test Promise hatasıdır'));
    }).catch(error => {
      logger.error('TestDebug', 'Yakalanan Promise hatası', {
        message: error.message,
        stack: error.stack
      });
    });
    
    // Yakalanmamış Promise hatası
    setTimeout(() => {
      new Promise((resolve, reject) => {
        reject(new Error('Bu bir yakalanmamış Promise hatasıdır'));
      });
    }, 1000);
  };
  
  // Asenkron hata oluştur
  const triggerAsyncError = async () => {
    logger.info('TestDebug', 'Asenkron hata tetikleniyor');
    
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Bu bir test asenkron hatasıdır'));
        }, 1000);
      });
    } catch (error) {
      logger.error('TestDebug', 'Yakalanan asenkron hata', {
        message: error.message,
        stack: error.stack
      });
    }
  };
  
  // Network hatası oluştur
  const triggerNetworkError = () => {
    logger.info('TestDebug', 'Network hatası tetikleniyor');
    
    fetch('https://non-existent-domain-123456789.com')
      .then(response => response.json())
      .catch(error => {
        logger.error('TestDebug', 'Network hatası', {
          message: error.message,
          stack: error.stack
        });
      });
  };
  
  // Log dosyasını indir
  const downloadLogs = () => {
    logger.info('TestDebug', 'Log dosyası indiriliyor');
    logger.saveLogsToFile();
  };
  
  // Log geçmişini temizle
  const clearLogs = () => {
    logger.info('TestDebug', 'Log geçmişi temizleniyor');
    logger.clearLogHistory();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h4" color="blue" className="mb-4">
            Hata Ayıklama Test Sayfası
          </Typography>
          
          <Typography className="mb-4">
            Bu sayfa, logger sisteminin ve hata yakalama mekanizmalarının test edilmesi için oluşturulmuştur.
            Aşağıdaki butonları kullanarak farklı hata türlerini tetikleyebilir ve log sisteminin nasıl çalıştığını gözlemleyebilirsiniz.
          </Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button color="blue" onClick={triggerConsoleError}>
              Konsol Hatası Oluştur
            </Button>
            
            <Button color="green" onClick={triggerJsError}>
              JavaScript Hatası Oluştur
            </Button>
            
            <Button color="red" onClick={triggerUncaughtError}>
              Yakalanmamış Hata Oluştur
            </Button>
            
            <Button color="amber" onClick={triggerPromiseError}>
              Promise Hatası Oluştur
            </Button>
            
            <Button color="purple" onClick={triggerAsyncError}>
              Asenkron Hata Oluştur
            </Button>
            
            <Button color="indigo" onClick={triggerNetworkError}>
              Network Hatası Oluştur
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button color="green" onClick={downloadLogs}>
              Log Dosyasını İndir
            </Button>
            
            <Button color="red" onClick={clearLogs}>
              Log Geçmişini Temizle
            </Button>
            
            <Button 
              color="blue-gray" 
              onClick={() => {
                const logContainer = document.getElementById('app-log-container');
                if (logContainer) {
                  logContainer.style.display = logContainer.style.display === 'none' ? 'block' : 'none';
                  document.getElementById('app-log-toggle-button')?.style.display = 
                    logContainer.style.display === 'none' ? 'block' : 'none';
                }
              }}
            >
              Log Panelini Aç/Kapat
            </Button>
          </div>
        </CardBody>
      </Card>
      
      <Card>
        <CardBody>
          <Typography variant="h5" color="blue" className="mb-4">
            State Değişikliği Testi
          </Typography>
          
          <div className="flex items-center gap-4 mb-4">
            <Button color="blue" onClick={() => {
              setCount(prev => {
                const newCount = prev + 1;
                logger.info('TestDebug', 'State değişikliği', { count: newCount });
                return newCount;
              });
            }}>
              Artır
            </Button>
            
            <Typography variant="h6">Sayaç: {count}</Typography>
            
            <Button color="red" onClick={() => {
              setCount(prev => {
                const newCount = prev - 1;
                logger.info('TestDebug', 'State değişikliği', { count: newCount });
                return newCount;
              });
            }}>
              Azalt
            </Button>
          </div>
          
          <Typography className="text-sm text-gray-600">
            State değişiklikleri de log sisteminde kaydedilir. Artır ve Azalt butonlarına tıklayarak state değişikliklerini izleyebilirsiniz.
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default TestDebug;
