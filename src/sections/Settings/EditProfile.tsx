import Grid from '@mui/material/Grid';
import { IUserItem } from 'src/types/user';
import { useSelector } from 'react-redux';
import { MuiTelInput, MuiTelInputContinent, MuiTelInputCountry, MuiTelInputInfo } from 'mui-tel-input';
import { useState } from 'react';
import { Avatar, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, Switch, TextField } from '@mui/material';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
// ----------------------------------------------------------------------

type Props = {
    currentUser?: IUserItem;
};

export default function UserNewEditForm() {
    const { user } = useSelector((state: any) => state.auth)

    const [username, setUsername] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [notificationFlag, setNotificationFlag] = useState(false)

    const [viewFlag, setViewFlag] = useState(false)

    const handleChange = (newValue: string, info: MuiTelInputInfo) => {
        setPhoneNumber(newValue)
    }

    const continents: MuiTelInputContinent[] = ['EU']
    const excludedCountries: MuiTelInputCountry[] = ['FR']

    return (
        <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
            <Grid item xs={8} marginTop={5} display={'flex'} justifyContent={'center'}>
                <Avatar src={''} alt={user.name} sx={{ width: 100, height: 100, border: 'solid', borderColor: '#637381' }} />
                <Label
                    variant="filled"
                    sx={{
                        backgroundColor: 'white',
                        px: 0.5,
                        height: 30,
                        width: 30,
                        position: 'absolute',
                        borderRadius: 1,
                        marginTop: 9,
                        marginLeft: 9
                    }}
                >
                    <CloudUploadOutlinedIcon sx={{ width: 12, height: 12 }} color='success' />
                </Label>
            </Grid>
            <Grid item xs={8}>
                <FormControl fullWidth>
                    <FormHelperText>
                        UserName
                    </FormHelperText>
                    <TextField value={username} onChange={e => setUsername(e.target.value)} />
                </FormControl>
            </Grid>
            <Grid item xs={8}>
                <FormControl fullWidth>
                    <FormHelperText>
                        Email
                    </FormHelperText>
                    <TextField value={email} onChange={e => setEmail(e.target.value)} />
                </FormControl>
            </Grid>
            <Grid item xs={8}>
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
            </Grid>
            <Grid item xs={8}>
                <FormControl fullWidth>
                    <FormHelperText>Old Password</FormHelperText>
                    <TextField
                        name="Password"
                        type={viewFlag ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
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
            </Grid>
            <Grid item xs={8}>
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
            </Grid>
            <Grid item xs={8}>
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
            </Grid>
        </Grid>
    );
}
