import type { IPostItem } from 'src/types/blog';
import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { SECTION_PADDING, SECTION_CONTENT_GAP } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { PostItem } from '../blog/post-item';
import { useTranslate } from '../../locales';
import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  /** Newest first; the first three are shown. */
  posts: IPostItem[];
};

/** Links the latest articles from the home page, so they are found and crawled. */
export function HomeBlog({ posts, sx, ...other }: Props) {
  const { t } = useTranslate('home');

  if (!posts.length) {
    return null;
  }

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <Container component={MotionViewport}>
        <SectionTitle
          title={t('blog.title')}
          description={t('blog.description')}
          sx={{ textAlign: 'center' }}
        />

        {/* Centred flex rather than a grid, so one or two posts don't leave an empty column. */}
        <Box
          sx={{
            mt: SECTION_CONTENT_GAP,
            gap: 3,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {posts.slice(0, 3).map((post) => (
            <Box
              key={post.id}
              component={m.div}
              variants={varFade({ distance: 24 }).inUp}
              sx={{
                width: { xs: 1, sm: 'calc((100% - 24px) / 2)', md: 'calc((100% - 48px) / 3)' },
              }}
            >
              <PostItem post={post} sx={{ height: 1 }} />
            </Box>
          ))}
        </Box>

        <Box component={m.div} variants={varFade().in} sx={{ mt: 5, textAlign: 'center' }}>
          <Button
            component={RouterLink}
            href={paths.blog.root}
            color="inherit"
            endIcon={<Iconify icon="iconmind:arrow-right-outline-thin" width={20} />}
          >
            {t('blog.cta')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
