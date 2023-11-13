import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box, Button, Card, CardMedia, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material';
// Logo
import DashLogo from 'src/assets/images/logo/DASH.png'
// Load firebase database
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getCompanyID, loginUser } from 'src/store/actions/authAction';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  // Defined by smile
  const dispatch: any = useDispatch()
  const navigate = useNavigate()
  const [companyPassword, setCompanyPassword] = useState('')
  const [openInputPasswordDialog, setOpenInputPasswordDialog] = useState(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'smile@dash.com',
    password: '111111',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Login function call
      console.log(data)
      dispatch(loginUser(data, () => {
        navigate('/dashboard')
        toast.success('Login Success')
      }))

      // router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  // Defined by smile
  const onSelectCompanyByPassword = () => {
    setOpenInputPasswordDialog(true)
  }

  const handleCompanyPassword = () => {
    dispatch(getCompanyID(companyPassword, () => {
      navigate('/auth/register')
      toast.success('Selected the company')
    }))
  }

  const renderHead = (
    <Stack sx={{ mb: 5 }}>
      <Card sx={{ boxShadow: 'none' }}>
        <CardMedia component={'img'} sx={{ width: '163px' }} image={DashLogo} alt='Dash Logo' />
      </Card>
      <Typography marginTop={5} variant="h4">Welcome to Dash</Typography>
      <Typography variant="h4">Sign In to Continue.</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Don't have an account?</Typography>

        <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }} variant="subtitle2" onClick={onSelectCompanyByPassword}>
          Create an account
        </Typography>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <FormControlLabel control={<Checkbox />} label={'Remember me'} />

        <Link variant="body2" color="inherit" underline="always">
          Forgot password?
        </Link>
      </Box>

      <LoadingButton
        fullWidth
        sx={{ backgroundColor: '#388E3C' }}
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {renderForm}
      </FormProvider>

      <Dialog
        open={openInputPasswordDialog}
        onClose={() => setOpenInputPasswordDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography fontWeight={'bold'} fontSize={28} align='center'>Password</Typography>
          <Typography fontSize={20} align='center'>Please input the password to view the signup page.</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <FormHelperText>
              Password
            </FormHelperText>
            <TextField type='password' value={companyPassword} onChange={e => setCompanyPassword(e.target.value)} />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} sx={{ width: '100%' }}>
            <Button fullWidth variant='outlined' onClick={() => setOpenInputPasswordDialog(false)}>Discard</Button>
            <Button fullWidth variant='contained' sx={{ backgroundColor: '#388E3C', color: 'white', marginLeft: 3 }} onClick={handleCompanyPassword} autoFocus>
              Create
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
