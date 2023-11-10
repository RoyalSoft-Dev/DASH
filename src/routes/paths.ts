// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

// ----------------------------------------------------------------------

export const paths = {
  // minimalUI: "https://mui.com/store/items/minimal-dashboard/",
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },
  // DASHBOARD
  dashboard: {
    dashboard: ROOTS.DASHBOARD,
    users: `${ROOTS.DASHBOARD}/users`,
    team_management: `${ROOTS.DASHBOARD}/team-management`,
    settings: `${ROOTS.DASHBOARD}/settings`,
    logout: `${ROOTS.DASHBOARD}/logout`,
    // group: {
    //   root: `${ROOTS.DASHBOARD}/group`,
    //   five: `${ROOTS.DASHBOARD}/group/five`,
    //   six: `${ROOTS.DASHBOARD}/group/six`,
    // },
  },
};
