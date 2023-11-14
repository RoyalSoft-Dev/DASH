// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// components
import Label from 'src/components/label';
// Load MUI icons
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Card, CardMedia } from '@mui/material';
// Load logo
import DASH_LOGO from 'src/assets/images/logo/DASH_White.png'

// ----------------------------------------------------------------------

export default function NavUpgrade() {

  const { user } = useSelector((state: any) => state.auth)
  const navigate = useNavigate()

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <img src={DASH_LOGO} alt='DASH' />
        <Box sx={{ position: 'relative' }}>
          <Avatar src={user.avatar} alt={user.name} sx={{ width: 80, height: 80, border: 'solid', borderColor: 'white' }} />
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
            <EditIcon onClick={() => navigate('/dashboard/settings')} sx={{ width: 12, height: 12, cursor: 'pointer' }} color='success' />
          </Label>
        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap fontSize={20} color={'white'}>
            {user.name}
          </Typography>

          <Typography variant="body2" noWrap fontSize={15} color={'white'}>
            {user.email}
          </Typography>
        </Stack>

        {/* <Button variant="contained" href={paths.minimalUI} target="_blank" rel="noopener">
          Upgrade to Pro
        </Button> */}
      </Stack>
    </Stack>
  );
}
