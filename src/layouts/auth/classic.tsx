// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Logo from 'src/components/logo';
// Langing image load
import MainImage from 'src/assets/images/landing/main.png'
import EarthImage3 from 'src/assets/images/landing/earth3.png'
import EarthImage2 from 'src/assets/images/landing/earth2.png'
import PeopleImage from 'src/assets/images/landing/people.png'

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Box
        component="img"
        alt="auth"
        src={MainImage}
        sx={{
          maxWidth: {
            xs: 480,
            lg: 560,
            xl: 720,
          },
        }}
      />

      <Box
        component="img"
        alt="auth"
        src={EarthImage3}
        sx={{
          position: 'absolute',
          top: '60%',
          left: 50,
          zIndex: 100,
          maxWidth: {
            xs: 480,
            lg: 560,
            xl: 720,
          },
        }}
      />

      <Box
        component="img"
        alt="auth"
        src={EarthImage2}
        sx={{
          position: 'absolute',
          maxWidth: {
            top: -50,
            left: -150,
            xs: 480,
            lg: 560,
            xl: 720,
          },
        }}
      />

      <Box sx={{ position: 'absolute' }}>
        <Box
          component="img"
          alt="auth"
          src={PeopleImage}
          sx={{
            maxWidth: {
              xs: 480,
              lg: 560,
              xl: 720,
            },
          }}
        />

        <Typography sx={{ position: 'relative' }} fontSize={35} fontWeight={'bold'} align='center' color={'#388E3C'}>Seamless Project Management</Typography>
        <Typography fontWeight={'bold'} align='center' fontSize={20}>A few clicks away</Typography>
      </Box>
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {/* {renderLogo} */}

      {mdUp && renderSection}

      {renderContent}
    </Stack>
  );
}
