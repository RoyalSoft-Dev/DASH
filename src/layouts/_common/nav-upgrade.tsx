// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// routes
import { paths } from 'src/routes/paths';
// locales
// components
import Label from 'src/components/label';
// Load MUI icons
import EditIcon from '@mui/icons-material/Edit';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const { user } = useMockedUser();

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar src={user?.photoURL} alt={user?.displayName} sx={{ width: 80, height: 80, border: 'solid', borderColor: 'white' }} />
          <Label
            variant="filled"
            sx={{
              backgroundColor: 'white',
              top: 60,
              px: 0.5,
              left: 60,
              height: 25,
              width: 25,
              position: 'absolute',
              borderRadius: 1
            }}
          >
            <EditIcon sx={{ width: 12, height: 12 }} color='success' />
          </Label>
        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap fontSize={20} color={'white'}>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" noWrap fontSize={15} color={'white'}>
            {user?.email}
          </Typography>
        </Stack>

        {/* <Button variant="contained" href={paths.minimalUI} target="_blank" rel="noopener">
          Upgrade to Pro
        </Button> */}
      </Stack>
    </Stack>
  );
}
