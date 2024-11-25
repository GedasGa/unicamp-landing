'use client';

import type { BoxProps } from '@mui/material/Box';

import { useId, forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';
import { CONFIG } from '../../config-global';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  onlyLogo?: boolean;
  disableLink?: boolean;
  onBlack?: boolean;
};

// TODO: Change logo based on theme
export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    {
      width,
      href = '/',
      height,
      onlyLogo = true,
      disableLink = false,
      onBlack = false,
      className,
      sx,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    const singleLogo = (
      <Box
        alt="Single logo"
        component="img"
        src={`${CONFIG.assetsDir}/logo/logo-single.svg`}
        width="100%"
        height="100%"
      />
    );

    const singleLogoOnBlack = (
      <Box
        alt="Single logo on black"
        component="img"
        src={`${CONFIG.assetsDir}/logo/logo-single.svg`}
        width="100%"
        height="100%"
      />
    );

    const fullLogo = (
      <Box
        alt="Full logo"
        component="img"
        src={`${CONFIG.assetsDir}/logo/logo-full.svg`}
        width="100%"
        height="100%"
      />
    );

    const baseSize = {
      width: width ?? 40,
      height: height ?? 40,
      ...(!onlyLogo && {
        width: width ?? 102,
        height: height ?? 36,
      }),
    };

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: 'inline-flex',
          verticalAlign: 'middle',
          ...(disableLink && { pointerEvents: 'none' }),
          ...sx,
        }}
        {...other}
      >
        {onlyLogo ? singleLogo : fullLogo}
      </Box>
    );
  }
);
