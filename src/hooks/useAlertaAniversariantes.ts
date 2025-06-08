
import { useState, useEffect } from 'react';

export const useAlertaAniversariantes = () => {
  const [alertaDismissed, setAlertaDismissed] = useState(false);

  useEffect(() => {
    // Verifica se o alerta já foi dispensado hoje
    const hoje = new Date().toDateString();
    const alertaDismissedHoje = localStorage.getItem(`alerta_dismissed_${hoje}`);
    
    if (alertaDismissedHoje === 'true') {
      setAlertaDismissed(true);
    } else {
      setAlertaDismissed(false);
    }
  }, []);

  const dismissAlert = () => {
    const hoje = new Date().toDateString();
    localStorage.setItem(`alerta_dismissed_${hoje}`, 'true');
    setAlertaDismissed(true);
  };

  const resetAlert = () => {
    setAlertaDismissed(false);
  };

  return {
    alertaDismissed,
    dismissAlert,
    resetAlert
  };
};
