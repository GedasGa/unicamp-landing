'use client';

import type { IPostItem } from 'src/types/blog';

import { useState, useCallback } from 'react';

import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { orderBy } from 'src/utils/helper';

import { PostList } from '../post-list';
import { PostSort } from '../post-sort';
import { useTranslate } from '../../../locales';

// ----------------------------------------------------------------------

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: 'sort_by.latest' },
  { value: 'oldest', label: 'sort_by.oldest' },
];

// ----------------------------------------------------------------------

type Props = {
  posts: IPostItem[];
};

export function PostListHomeView({ posts }: Props) {
  const { t } = useTranslate('blog');

  const [sortBy, setSortBy] = useState('latest');

  const dataFiltered = applyFilter({ inputData: posts, sortBy });

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        {t('title')}
      </Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      <PostList posts={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IPostItem[];
  sortBy: string;
};

const applyFilter = ({ inputData, sortBy }: ApplyFilterProps) => {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  return inputData;
};
