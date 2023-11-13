import { Box, Button, Typography } from '@mui/material'
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp';

export default function AddPhoneNumberCP() {
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{ border: 'dashed', borderColor: '#FFAB00', borderWidth: 1, borderRadius: '10px', padding: 1 }}>
            <Box display={'flex'} alignItems={'center'}>
                <ErrorOutlineSharpIcon sx={{ width: 40, height: 40 }} color='warning' />
                <Box marginLeft={1}>
                    <Typography fontWeight={'bold'} fontSize={17}>Receive Update on the Information</Typography>
                    <Typography>For your ease, Please add a phone number so you can get updates on the information. A pop will appear.</Typography>
                </Box>
            </Box>
            <Box>
                <Button variant='contained' color='warning'>
                    <Typography color={'white'}>Add Phone Number</Typography>
                </Button>
            </Box>
        </Box>
    )
}
