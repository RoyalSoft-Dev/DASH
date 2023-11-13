import { Avatar, AvatarGroup, Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

export default function AvatarGroupCardCP(props: any) {
    return (
        <Card>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <AvatarGroup max={4}>
                        {props.users.map((person: any, index: number) => (
                            <Avatar key={index} alt={person.name} src={person.avatar} sx={{ width: '48px', height: '48px' }} />
                        ))}
                    </AvatarGroup>
                    <Typography marginLeft={2} fontWeight={'bold'} fontSize={20}>
                        Input Data
                    </Typography>
                </Box>
                <Box>
                    <Typography fontWeight={'bold'} fontSize={30}>123</Typography>
                    <Typography>Total Users</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
