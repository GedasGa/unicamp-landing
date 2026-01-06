'use client';

import { frFR as frFRCore } from '@mui/material/locale';
import { enUS as enUSDate, frFR as frFRDate } from '@mui/x-date-pickers/locales';
import { enUS as enUSDataGrid, frFR as frFRDataGrid } from '@mui/x-data-grid/locales';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: 'lt',
    label: 'Lietuvių',
    countryCode: 'LT',
    adapterLocale: 'lt',
    numberFormat: { code: 'lt-LT', currency: 'EUR' },
    systemValue: {
      // TODO: MUI components localization for Lithuanian language
      components: { ...frFRCore.components, ...frFRDate.components, ...frFRDataGrid.components },
    },
  },
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'EUR' },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
  },
  // {
  //   value: 'fr',
  //   label: 'French',
  //   countryCode: 'FR',
  //   adapterLocale: 'fr',
  //   numberFormat: { code: 'fr-Fr', currency: 'EUR' },
  //   systemValue: {
  //     components: { ...frFRCore.components, ...frFRDate.components, ...frFRDataGrid.components },
  //   },
  // },
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
