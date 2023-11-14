import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { MuiTelInput, MuiTelInputContinent, MuiTelInputCountry, MuiTelInputInfo } from 'mui-tel-input';
import { useEffect, useState } from 'react';
import { Avatar, Box, Button, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, Switch, TextField } from '@mui/material';
import Iconify from 'src/components/iconify';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { updateUser, uploadAvatar } from 'src/store/actions/authAction';
import { SplashScreen } from 'src/components/loading-screen';
import { useNavigate } from 'react-router';
// ----------------------------------------------------------------------

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UserNewEditForm() {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const { user, uid, loading } = useSelector((state: any) => state.auth)

    const [username, setUsername] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [notificationFlag, setNotificationFlag] = useState(user.notification)

    const [viewFlag, setViewFlag] = useState(false)

    const handleChange = (newValue: string, info: MuiTelInputInfo) => {
        setPhoneNumber(newValue)
    }

    const handleFileChange = (e: any) => {
        avatarHandleChange(e.target.files[0])
    }

    useEffect(() => {
        console.log(loading)
    }, [loading])

    const avatarHandleChange = (file: any) => {
        try {
            if (file === undefined) {
                return
            }
            if (file.size > 3000000) {
                toast.error('Error: Image size is too big')
                return
            }
            const validFormats = ['image/jpeg', 'image/jpg', 'image/png']

            if (!validFormats.includes(file.type)) {
                toast.error(`Error: Invalid file format. Please select a .jpg, .jpeg, or .png image.`)
                return
            }
            // Upload the avatar
            dispatch(uploadAvatar(uid, user.avatar, file, () => {
                toast.success('Upload the avatar successfully')
            }))
        } catch (error) {
            console.log(error.message)
        }
    }

    const updatePasswordInfo = () => {
        let updateInfo = {}
        if (!newPassword && !confirmPassword) {
            updateInfo = {
                name: username,
                email,
                phoneNumber,
                notification: notificationFlag,
            }
        } else {
            if (newPassword !== confirmPassword) {
                toast.error('Password is not correct')
                return
            }
            if (newPassword.length < 6) {
                toast.error('Password should includes 6 characters')
                return
            }
            updateInfo = {
                name: username,
                email,
                phoneNumber,
                notification: notificationFlag,
                newPassword,
                confirmPassword
            }
        }
        dispatch(updateUser(uid, updateInfo, () => {
            toast.success('Updated the profile')
        }))
    }

    const continents: MuiTelInputContinent[] = ['EU']
    const excludedCountries: MuiTelInputCountry[] = ['FR']

    return (
        <Grid container spacing={4} display={'flex'} justifyContent={'center'}>
            {loading && <SplashScreen />}
            <Grid item xs={8} marginTop={5}>
                <Box display={'flex'} justifyContent={'center'} marginBottom={2}>
                    <Avatar src={user.avatar} alt={user.name} sx={{ width: 100, height: 100, border: 'solid', borderColor: '#637381' }} />
                    <Button component="label"
                        sx={{
                            px: 0.5,
                            width: 100, height: 100, position: 'absolute',
                            borderRadius: 1,
                            ':hover': { 'backgroundColor': 'white', 'opacity': '0.5' },
                            WebkitBorderRadius: '50%',
                            opacity: 0
                        }}
                    >
                        <FileUploadOutlinedIcon sx={{ width: 50, height: 50 }} />
                        <VisuallyHiddenInput onChange={handleFileChange} type="file" />
                    </Button>
                </Box>
                <FormControl fullWidth>
                    <FormHelperText>
                        UserName
                    </FormHelperText>
                    <TextField value={username} name='name' onChange={e => setUsername(e.target.value)} />
                </FormControl>
                <FormControl fullWidth>
                    <FormHelperText>
                        Email
                    </FormHelperText>
                    <TextField value={email} name='email' onChange={e => setEmail(e.target.value)} />
                </FormControl>
                <FormControl fullWidth>
                    <FormHelperText>Phone Number</FormHelperText>
                    <MuiTelInput
                        value={phoneNumber}
                        onChange={handleChange}
                        continents={continents}
                        excludedCountries={excludedCountries}
                    />
                </FormControl>
                <FormControlLabel sx={{ marginTop: 1 }} control={<Switch checked={notificationFlag} onChange={e => setNotificationFlag(e.target.checked)} />} label="SMS Notifications" />
                <FormControl fullWidth>
                    <FormHelperText>New Password</FormHelperText>
                    <TextField
                        name="newPassword"
                        type={viewFlag ? 'text' : 'password'}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setViewFlag(!viewFlag)} edge="end">
                                        <Iconify icon={viewFlag ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <FormHelperText>Confirm Password</FormHelperText>
                    <TextField
                        name="confirmPassword"
                        type={viewFlag ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setViewFlag(!viewFlag)} edge="end">
                                        <Iconify icon={viewFlag ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <Box marginTop={5} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Button variant='outlined' fullWidth onClick={() => navigate(-1)}>Discard</Button>
                    <Button variant='contained' sx={{ marginLeft: 3 }} disabled={loading} fullWidth onClick={updatePasswordInfo}>Update</Button>
                </Box>
            </Grid>

        </Grid >
    );
}
