// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';

import EditProfile from './EditProfile'
import { Grid } from '@mui/material';
// ----------------------------------------------------------------------

export default function FourView() {
  const settings = useSettingsContext();



  return (
    <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              mt: 5,
              alignContent: 'center',
              width: 1,
              height: 1,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <EditProfile />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
