import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

let globalScreenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const useScreenDimensions = () => {
  const [screenDimensions, setScreenDimensions] = useState(globalScreenDimensions);
  useEffect(() => {
    const update = () => {
      const next = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      };
      globalScreenDimensions = next;
      setScreenDimensions(next);
    };
    const sub = Dimensions.addEventListener('change', update);
    return () => sub?.remove();
  }, []);
  return screenDimensions;
};

export const getScreenWidth = () => globalScreenDimensions.width;
export const getScreenHeight = () => globalScreenDimensions.height;

export const calculateCardWidth = (cols = 1, gap = 10, padding = 16) => {
  const w = getScreenWidth();
  const available = w - padding - gap * (cols - 1);
  return available / cols;
};

export const calculateCardWidthByPercentage = (pct = 90, gap = 0) => {
  return getScreenWidth() * (pct / 100) - gap;
};