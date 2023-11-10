import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';
// MUI icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  // user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('dashboard'),
  home: icon('home-simple'),
  user: icon('user-linear'),
  settings: icon('settings-linear'),
  logout: icon('logout'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: '',
        items: [
          { title: 'Dashboard', path: paths.dashboard.dashboard, icon: ICONS.home },
          { title: 'Users', path: paths.dashboard.users, icon: ICONS.user },
          {
            title: 'Team Management',
            path: paths.dashboard.team_management,
            icon: ICONS.dashboard,
          },
          {
            title: 'Settings',
            path: paths.dashboard.settings,
            icon: ICONS.settings,
          },
        ],
      },

      // USER MANAGEMENT
      // ----------------------------------------------------------------------
      // {
      //   subheader: '',
      //   items: [
      //     { title: 'Log out', path: paths.dashboard.logout, icon: ICONS.logout },
      //   ],
      // },
    ],
    []
  );

  return data;
}
