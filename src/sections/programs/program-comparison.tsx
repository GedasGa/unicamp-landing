import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varAlpha, SECTION_PADDING, SECTION_CONTENT_GAP } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { renderEmphasis } from '../home/components/section-title';

// ----------------------------------------------------------------------

type Row = { label: string; values: string[] };

/** Values that render as a mark rather than text; the label is read out instead of the icon. */
const MARKS: Record<string, { icon: string; muted?: boolean }> = {
  yes: { icon: 'iconmind:check-outline-thin' },
  no: { icon: 'iconmind:close-outline-thin', muted: true },
  partial: { icon: 'iconmind:minus-outline-thin', muted: true },
};

function CellValue({ value, label }: { value: string; label: string }) {
  const mark = MARKS[value];

  if (!mark) {
    return <span>{value}</span>;
  }

  return (
    <Iconify
      icon={mark.icon}
      width={20}
      aria-label={label}
      sx={{ color: mark.muted ? 'text.disabled' : 'text.primary' }}
    />
  );
}

// ----------------------------------------------------------------------

export function ProgramComparison({ sx, ...other }: BoxProps) {
  // Comparing the academy rather than one programme, so the copy lives with the home page.
  const { t } = useTranslate('home', { keyPrefix: 'comparison' });

  const columns = (t('columns', { returnObjects: true, defaultValue: [] }) ?? []) as string[];
  const rows = (t('rows', { returnObjects: true, defaultValue: [] }) ?? []) as Row[];

  if (!columns.length || !rows.length) {
    return null;
  }

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <Typography component="h2" variant="h2">
            {renderEmphasis(t('title'))}
          </Typography>
          <Typography sx={{ mt: 1, mb: SECTION_CONTENT_GAP, color: 'text.secondary' }}>
            {t('description')}
          </Typography>

          {/* Narrow screens scroll the table sideways rather than squeezing four columns. */}
          <Card sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  {columns.map((column, index) => (
                    <TableCell
                      key={column}
                      align="center"
                      sx={(theme) => ({
                        typography: 'subtitle2',
                        // Our own column is the one being argued for, so it is marked.
                        ...(index === 0 && {
                          color: 'text.primary',
                          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                        }),
                      })}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell sx={{ typography: 'subtitle2', whiteSpace: 'nowrap' }}>
                      {row.label}
                    </TableCell>

                    {row.values.map((value, index) => (
                      <TableCell
                        key={columns[index] ?? index}
                        align="center"
                        sx={(theme) => ({
                          typography: 'body2',
                          color: index === 0 ? 'text.primary' : 'text.secondary',
                          ...(index === 0 && {
                            bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                          }),
                        })}
                      >
                        <CellValue value={value} label={t(`marks.${value}`, value)} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Container>
      </MotionViewport>
    </Box>
  );
}
