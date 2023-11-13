import { Helmet } from 'react-helmet-async';
// sections
import TeamManagement from 'src/sections/team-management/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Three</title>
      </Helmet>

      <TeamManagement />
    </>
  );
}
