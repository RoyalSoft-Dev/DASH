import { Helmet } from 'react-helmet-async';
// sections
import Settings from 'src/sections/Settings/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Four</title>
      </Helmet>

      <Settings />
    </>
  );
}
