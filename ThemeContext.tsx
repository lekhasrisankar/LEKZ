import React, { createContext, useContext, useState, useEffect } from 'react';
import { AvatarFullConfig, genConfig } from 'react-nice-avatar';

export type BackgroundStyle = 'default' | 'grid' | 'dots' | 'paper';

interface ThemeContextType {
  background: BackgroundStyle;
  setBackground: (bg: BackgroundStyle) => void;
  avatarConfig: AvatarFullConfig;
  setAvatarConfig: (config: AvatarFullConfig | ((prev: AvatarFullConfig) => AvatarFullConfig)) => void;
  isCustomizePanelOpen: boolean;
  setIsCustomizePanelOpen: (isOpen: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const AVATAR_STORAGE_KEY = 'quiz_app_avatar_config';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [background, setBackground] = useState<BackgroundStyle>('default');
  const [isCustomizePanelOpen, setIsCustomizePanelOpen] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState<AvatarFullConfig>(() => {
    const saved = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved avatar config', e);
      }
    }
    return genConfig({
      sex: 'man',
      faceColor: '#F9C9B6',
      earSize: 'small',
      hairColor: '#000',
      hairStyle: 'normal',
      hatStyle: 'none',
      eyeStyle: 'circle',
      glassesStyle: 'none',
      noseStyle: 'short',
      mouthStyle: 'smile',
      shirtStyle: 'hoody',
      shirtColor: '#9287FF',
      bgColor: '#E0DDFF',
    });
  });

  useEffect(() => {
    localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(avatarConfig));
  }, [avatarConfig]);

  return (
    <ThemeContext.Provider value={{ background, setBackground, avatarConfig, setAvatarConfig, isCustomizePanelOpen, setIsCustomizePanelOpen }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
