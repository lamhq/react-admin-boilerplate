// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';

const items = [
  {
    path: '/',
    name: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    name: 'Posts',
    icon: ViewListIcon,
    collapse: true,
    subItems: [
      {
        path: '/admin/posts/add',
        name: 'Add New',
        mini: 'AN',
      },
      {
        path: '/admin/posts',
        name: 'All Posts',
        mini: 'AP',
      },
    ],
  },
];

export default items;
