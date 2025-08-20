import React, { useEffect, useState } from 'react';
import { GrInstallOption } from "react-icons/gr";
const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    deferredPrompt && (
      <button
  onClick={handleInstallClick}
className='  px-3 py-3 border border-gray-400 shadow-sm  rounded-full bg-purple-600'
>
  <GrInstallOption className='text-xl text-white ' />  
</button>
    )
  );
};

export default InstallPrompt;