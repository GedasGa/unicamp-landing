import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { Iconify } from '../iconify';

import type { ConfirmDialogProps } from './types';
import { useTranslate } from '../../locales';

// ----------------------------------------------------------------------

export function ConfirmDialog({
  open,
  title,
  action,
  content,
  onClose,
  showActions = true,
  ...other
}: ConfirmDialogProps) {
  const { t } = useTranslate('common');
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2, display: 'flex', alignItems: 'center', pr: 6 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      {showActions && (
        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            {t('cancel')}
          </Button>
          {action}
        </DialogActions>
      )}
    </Dialog>
  );
}
