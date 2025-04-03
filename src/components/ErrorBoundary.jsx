import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logger from '../utils/logger.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
    
    logger.debug('ErrorBoundary', 'ErrorBoundary bileşeni oluşturuldu');
  }

  static getDerivedStateFromError(error) {
    // Bir sonraki render'da fallback UI'ı göstermek için state'i güncelle
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Hata bilgisini logla
    logger.critical('ErrorBoundary', 'Bileşen hatası yakalandı', {
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
    
    this.setState({
      error,
      errorInfo
    });
    
    // Hata bilgisini bir hata izleme servisine gönderebilirsiniz
    // sendToErrorTrackingService(error, errorInfo);
  }

  handleReload = () => {
    logger.info('ErrorBoundary', 'Sayfa yenileniyor');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Hata durumunda gösterilecek UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">Bir Hata Oluştu</h2>
            
            <div className="mb-4 p-3 bg-red-50 rounded-md border border-red-100">
              <p className="text-sm text-red-800 font-mono overflow-auto max-h-32">
                {this.state.error && this.state.error.toString()}
              </p>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                <summary className="text-sm text-gray-700 cursor-pointer">Hata Detayları</summary>
                <pre className="mt-2 text-xs text-gray-600 overflow-auto max-h-64 p-2 bg-gray-100 rounded">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col space-y-2">
              <button
                onClick={this.handleReload}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Sayfayı Yenile
              </button>
              
              <Link
                to="/"
                className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-center transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
              
              <button
                onClick={() => logger.saveLogsToFile()}
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                Hata Loglarını İndir
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Hata yoksa children'ı render et
    return this.props.children;
  }
}

export default ErrorBoundary;
