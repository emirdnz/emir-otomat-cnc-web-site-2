import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

function ProductionProcessSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const steps = [
    {
      number: '1',
      title: t('productionProcess.step1.title'),
      description: t('productionProcess.step1.desc')
    },
    {
      number: '2',
      title: t('productionProcess.step2.title'),
      description: t('productionProcess.step2.desc')
    },
    {
      number: '3',
      title: t('productionProcess.step3.title'),
      description: t('productionProcess.step3.desc')
    },
    {
      number: '4',
      title: t('productionProcess.step4.title'),
      description: t('productionProcess.step4.desc')
    }
  ];

  const handleQuoteClick = () => {
    navigate('/upload-model');  // Bu sayfayı daha sonra oluşturacağız
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('productionProcess.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-blue text-white text-xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={handleQuoteClick}
            className="bg-primary-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {t('productionProcess.cta')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductionProcessSection;
