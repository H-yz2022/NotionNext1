import { siteConfig } from '@/lib/config'
import { useEffect } from 'react'

/**
 * 禁止用户拷贝文章的插件
 */

const DisableCopy = () => {
  useEffect(() => {
    const preventCopy = e => {
      e.preventDefault();
      alert('Copying is disabled on this site.');
      return false;
    };
    const preventCut = e => {
      e.preventDefault();
      return false;
    };
    const preventContextMenu = e => {
      e.preventDefault();
      return false;
    };
    const preventSelectStart = e => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCut);
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('selectstart', preventSelectStart);

    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCut);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('selectstart', preventSelectStart);
    };
  }, []);

  return null; // No UI needed
};

export default DisableCopy;
