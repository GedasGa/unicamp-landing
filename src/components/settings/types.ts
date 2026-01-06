import type { ThemeColorScheme } from 'src/theme/types';
import type { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type SettingsCaches = 'localStorage' | 'cookie';

export type SettingsDrawerProps = {
  sx?: SxProps<Theme>;
  hideFont?: boolean;
  hideCompact?: boolean;
  hidePresets?: boolean;
  hideNavColor?: boolean;
  hideNavLayout?: boolean;
  hideContrast?: boolean;
  hideColorScheme?: boolean;
};

export type SettingsState = {
  fontFamily: string;
  fontSize: 'small' | 'normal' | 'large';
  compactLayout: boolean;
  colorScheme: ThemeColorScheme;
  contrast: 'default' | 'hight';
  navColor: 'integrate' | 'apparent';
  navLayout: 'vertical' | 'horizontal' | 'mini';
  primaryColor: 'default' | 'black' | 'daltonism';
};

export type SettingsContextValue = SettingsState & {
  canReset: boolean;
  onReset: () => void;
  onUpdate: (updateValue: Partial<SettingsState>) => void;
  onUpdateField: (
    name: keyof SettingsState,
    updateValue: SettingsState[keyof SettingsState]
  ) => void;
  // Drawer
  openDrawer: boolean;
  onCloseDrawer: () => void;
  onToggleDrawer: () => void;
};

export type SettingsProviderProps = {
  settings: SettingsState;
  caches?: SettingsCaches;
  children: React.ReactNode;
};
