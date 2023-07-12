import { useEffect } from 'react';

const useGoogleAccountsAPI = (handleCallbackResponse) => {
  useEffect(() => {
    const initializeGoogleAPI = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: '298190749020-jbmufb0osmmv0l355e2s269kaqareki3.apps.googleusercontent.com',
          callback: handleCallbackResponse,
        });
      }
    };

    if (window.google && window.google.accounts && window.google.accounts.id) {
      initializeGoogleAPI();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleAPI;
      document.head.appendChild(script);
    }
  }, [handleCallbackResponse]);
};

export default useGoogleAccountsAPI;
    