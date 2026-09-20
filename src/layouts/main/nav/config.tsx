import { paths } from '../../../routes/paths';
import { Iconify } from '../../../components/iconify';

// ----------------------------------------------------------------------

// TODO: update icons
export const defaultNavData = [
  { title: 'paths.home', path: '/', icon: <Iconify width={22} icon="iconmind:home-outline-thin" /> },
  {
    title: 'paths.courses',
    path: paths.programs.root,
    icon: <Iconify width={22} icon="iconmind:book-open-outline-thin" />,
    children: [
      { title: 'paths.uxProgram', path: paths.programs.ux },
      { title: 'paths.feProgram', path: paths.programs.fe },
    ],
  },
  {
    title: 'paths.blog',
    path: paths.blog.root,
    icon: <Iconify width={22} icon="iconmind:read-article-outline-thin" />,
  },
];
