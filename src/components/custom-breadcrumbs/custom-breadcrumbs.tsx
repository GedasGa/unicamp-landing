import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { Iconify } from 'src/components/iconify';

import { BreadcrumbsLink } from './breadcrumb-link';

import type { CustomBreadcrumbsProps } from './types';

// ----------------------------------------------------------------------

export function CustomBreadcrumbs({
  links,
  action,
  heading,
  subtitle,
  moreLink,
  activeLast,
  slotProps,
  sx,
  ...other
}: CustomBreadcrumbsProps) {
  const lastLink = links[links.length - 1].name;

  const handleBack = () => {
    window.history.back();
  };

  const renderBackButton = (
    <Button
      variant="outlined"
      size="small"
      startIcon={<Iconify icon="eva:arrow-back-fill" />}
      onClick={handleBack}
      sx={{ alignSelf: 'flex-start' }}
    >
      Back
    </Button>
  );

  const renderLinks = (
    <Breadcrumbs separator={<Separator />} sx={{ ...slotProps?.breadcrumbs }} {...other}>
      {links.map((link, index) => (
        <BreadcrumbsLink
          key={link.name ?? index}
          link={link}
          activeLast={activeLast}
          disabled={link.name === lastLink}
        />
      ))}
    </Breadcrumbs>
  );

  const renderHeading = (
    <Typography variant="h3" sx={slotProps?.heading}>
      {heading}
    </Typography>
  );

  const renderSubtitle = (
    <Typography variant="body1" color="text.secondary" sx={{ mt: 1, ...slotProps?.subtitle }}>
      {subtitle}
    </Typography>
  );

  const renderAction = <Box sx={{ flexShrink: 0, ...slotProps?.action }}> {action} </Box>;

  const renderMoreLink = (
    <Box component="ul">
      {moreLink?.map((href) => (
        <Box key={href} component="li" sx={{ display: 'flex' }}>
          <Link href={href} variant="body2" target="_blank" rel="noopener" sx={slotProps?.moreLink}>
            {href}
          </Link>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box gap={2} display="flex" flexDirection="column" sx={sx} {...other}>
      {/* Back button */}
      {renderBackButton}

      {/* Breadcrumbs */}
      {!!links.length && renderLinks}

      {/* Heading and action in same row */}
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2}>
        <Box sx={{ flexGrow: 1 }}>
          {heading && renderHeading}
          {subtitle && renderSubtitle}
        </Box>

        {action && renderAction}
      </Box>

      {!!moreLink && renderMoreLink}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        bgcolor: 'text.disabled',
      }}
    />
  );
}
