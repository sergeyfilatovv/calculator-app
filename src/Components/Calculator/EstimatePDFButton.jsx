import { useState } from 'react';
import { useSelector } from 'react-redux';
import { generateEstimatePDF } from '../../utils/generateEstimatePDF';
import * as S from './EstimatePDFButton.styles'


export default function EstimatePDFButton() {
  const estimatorState = useSelector((state) => state.estimator);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      await generateEstimatePDF(estimatorState);
    } catch (e) {
      console.error('Ошибка генерации PDF:', e);
      alert('Не удалось сформировать PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.CreatePDFButton 
    onClick={handleDownload} 
    disabled={loading}>
    {loading ? 'Формируем PDF…' : 'Скачать смету (PDF)'}
    </S.CreatePDFButton>
  );
}