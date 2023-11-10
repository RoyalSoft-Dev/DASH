import { memo, useState, useCallback } from 'react';
// @mui
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
//
import { NavSectionProps, NavListProps, NavConfigProps } from '../types';
import { navVerticalConfig } from '../config';
import { StyledIcon, StyledSubheader } from './styles';

import NavList from './nav-list';
import { Box, Button, Typography } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

// ----------------------------------------------------------------------

function NavSectionVertical({ data, config, sx, ...other }: NavSectionProps) {
  return (
    <Stack sx={sx} {...other}>
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          subheader={group.subheader}
          items={group.items}
          config={navVerticalConfig(config)}
        />
      ))}
    </Stack>
  );
}

export default memo(NavSectionVertical);

// ----------------------------------------------------------------------

type GroupProps = {
  subheader: string;
  items: NavListProps[];
  config: NavConfigProps;
};

function Group({ subheader, items, config }: GroupProps) {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderContent = items.map((list) => (
    <NavList
      key={list.title + list.path}
      data={list}
      depth={1}
      hasChild={!!list.children}
      config={config}
    />
  ));

  return (
    <List disablePadding sx={{ px: 2, height: '100%' }}>
      {subheader ? (
        <>
          <StyledSubheader disableGutters disableSticky onClick={handleToggle} config={config}>
            {subheader}
          </StyledSubheader>

          <Collapse in={open}>{renderContent}</Collapse>
        </>
      ) : (
        <Box sx={{ height: '100%' }}>
          {renderContent}
          <Button sx={{
            marginTop: '200px',
            marginBottom: '100px',
            width: '100%',
            height: '50px',
            backgroundColor: '#0A1828'
          }}>
            <LogoutRoundedIcon sx={{ color: 'white' }} />
            <Typography color={'white'} marginLeft={2} fontWeight={'bold'} fontSize={18}>
              Log Out
            </Typography>
          </Button>
        </Box>
      )}
    </List>
  );
}
