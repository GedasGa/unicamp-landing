import { paths } from '../routes/paths';
import { Iconify } from '../components/iconify';
import { CONFIG } from '../config-global';

// ----------------------------------------------------------------------

export const navData = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  {
    title: 'Courses',
    path: paths.courses,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: 'Lecturers',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: paths.lecturers,
  },
];
