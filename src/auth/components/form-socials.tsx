import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { GithubIcon, GoogleIcon, TwitterIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

type FormSocialsProps = BoxProps & {
  signInWithGoogle?: () => void;
  signInWithGithub?: () => void;
  signInWithTwitter?: () => void;
  googleButtonText?: string;
};

export function FormSocials({
  sx,
  signInWithGoogle,
  signInWithGithub,
  signInWithTwitter,
  googleButtonText = 'Sign in with Google',
  ...other
}: FormSocialsProps) {
  return (
    <Box gap={1.5} display="flex" justifyContent="center" sx={sx} {...other}>
      {signInWithGoogle && (
        <Button
          color="inherit"
          variant="outlined"
          onClick={signInWithGoogle}
          startIcon={<GoogleIcon width={22} />}
        >
          {googleButtonText}
        </Button>
      )}
      {signInWithGithub && (
        <IconButton color="inherit" onClick={signInWithGithub}>
          <GithubIcon width={22} />
        </IconButton>
      )}
      {signInWithTwitter && (
        <IconButton color="inherit" onClick={signInWithTwitter}>
          <TwitterIcon width={22} />
        </IconButton>
      )}
    </Box>
  );
}
