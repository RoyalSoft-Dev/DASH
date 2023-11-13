// @mui
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
// Custom components
import AddPhoneNumberCP from './AddPhoneNumberCP';
import AvatarGroupCardCP from './AvatarGroupCardCP';
import TeamManagementTableCP from './TeamManagementTableCP';
// Load images
import User1 from 'src/assets/images/avatars/user1.png'
import User3 from 'src/assets/images/avatars/user3.png'
import User4 from 'src/assets/images/avatars/user4.png'
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function ThreeView() {
  const settings = useSettingsContext();

  const [openCreateRoleDialog, setOpenCreateRoleDialog] = useState(false)
  const [openAssignRoleDialog, setOpenAssignRoleDialog] = useState(false)
  const [openEditRoleDialog, setOpenEditRoleDialog] = useState(false)

  const userGroup = [
    {
      name: 'user1',
      avatar: User1
    },
    {
      name: 'user3',
      avatar: User3
    },
    {
      name: 'user4',
      avatar: User4
    },
    {
      name: 'user4',
      avatar: User4
    },
  ]

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <AddPhoneNumberCP />

      <Typography marginTop={2} fontWeight={'bold'} fontSize={20}>Roles List</Typography>
      <Typography>A role provide access to predefined menus and features so that depending on assigned role an administrator can have access to what he need</Typography>

      <Grid container marginTop={1} spacing={2}>
        <Grid item xs={4}>
          <AvatarGroupCardCP users={userGroup} />
        </Grid>
        <Grid item xs={4}>
          <AvatarGroupCardCP users={userGroup} />
        </Grid>
        <Grid item xs={4}>
          <AvatarGroupCardCP users={userGroup} />
        </Grid>
      </Grid>

      <Grid item xs={12} marginTop={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <Typography fontWeight={'bold'} fontSize={20}>Total Users with their Roles</Typography>
          <Typography>Find all of your company's administrator accounts and their associate roles.</Typography>
        </Box>
        <Box display={'flex'}>
          <Button variant='outlined' sx={{ color: '#388E3C', marginRight: 1 }} onClick={() => setOpenAssignRoleDialog(true)}>Assign Role</Button>
          <Button variant='contained' sx={{ backgroundColor: '#388E3C' }} onClick={() => setOpenCreateRoleDialog(true)}>Create a new Role</Button>
        </Box>
      </Grid>

      <Grid item xs={12} marginTop={2}>
        <TeamManagementTableCP setOpenEditRoleDialog={setOpenEditRoleDialog} />
      </Grid>

      <Dialog
        open={openCreateRoleDialog}
        onClose={() => setOpenCreateRoleDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography fontWeight={'bold'} fontSize={28} align='center'>Create a new Role</Typography>
          <Typography fontSize={20} align='center'>Add permissions  to the role by checking the boxes</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <FormHelperText>
              Role Name
            </FormHelperText>
            <TextField />
          </FormControl>

          <Typography margin={2} fontWeight={'bold'} fontSize={20}>Select Permissions</Typography>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography>Administrator Access</Typography>
            <FormControlLabel control={<Checkbox />} label='Select All' />
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
            <Typography>Assistant</Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'50%'}>
              <FormControlLabel control={<Checkbox />} label='Read' />
              <FormControlLabel control={<Checkbox />} label='Write' />
            </Box>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography>Sales Cordinator</Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'50%'}>
              <FormControlLabel control={<Checkbox />} label='Read' />
              <FormControlLabel control={<Checkbox />} label='Write' />
            </Box>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography>Manger Actions</Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'50%'}>
              <FormControlLabel control={<Checkbox />} label='Read' />
              <FormControlLabel control={<Checkbox />} label='Write' />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} sx={{ width: '100%' }}>
            <Button fullWidth variant='outlined' onClick={() => setOpenCreateRoleDialog(false)}>Discard</Button>
            <Button fullWidth variant='contained' sx={{ backgroundColor: '#388E3C', color: 'white', marginLeft: 3 }} onClick={() => setOpenCreateRoleDialog(false)} autoFocus>
              Create
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAssignRoleDialog}
        onClose={() => setOpenAssignRoleDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography fontWeight={'bold'} fontSize={28} align='center'>Assign Role</Typography>
          <Typography fontSize={20} align='center'>Assigning role to the user</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <FormHelperText>
              Name
            </FormHelperText>
            <TextField />
          </FormControl>
          <FormControl fullWidth>
            <FormHelperText>
              Email
            </FormHelperText>
            <TextField />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} sx={{ width: '100%' }}>
            <Button fullWidth variant='outlined' onClick={() => setOpenAssignRoleDialog(false)}>Discard</Button>
            <Button fullWidth variant='contained' sx={{ backgroundColor: '#388E3C', color: 'white', marginLeft: 3 }} onClick={() => setOpenAssignRoleDialog(false)} autoFocus>
              Create
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditRoleDialog}
        onClose={() => setOpenEditRoleDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography fontWeight={'bold'} fontSize={28} align='center'>Create a new Role</Typography>
          <Typography fontSize={20} align='center'>Add permissions  to the role by checking the boxes</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <FormHelperText>
              Name
            </FormHelperText>
            <TextField />
          </FormControl>
          <FormControl sx={{ marginTop: 3 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} sx={{ width: '100%' }}>
            <Button fullWidth variant='outlined' onClick={() => setOpenEditRoleDialog(false)}>Discard</Button>
            <Button fullWidth variant='contained' sx={{ backgroundColor: '#388E3C', color: 'white', marginLeft: 3 }} onClick={() => setOpenEditRoleDialog(false)} autoFocus>
              Create
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Container >
  );
}
