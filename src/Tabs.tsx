import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom"

export default function ScrollableTabs(props: any) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.setSelectedSection(props.sections[newValue])
    navigate("/")
  };

  const allTabs = props.sections.map((section: string) => (
    <Tab
      key={section}
      label={section}
      style={{ color: 'RGB(0, 31, 63)' }}
      sx={{ fontFamily: "'Lora', serif" }}
    />
  ))

  return (
    // <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      bgcolor: 'none',
    }}>
   <Tabs
  value={value}
  onChange={handleChange}
  variant="scrollable"
  scrollButtons="auto"
  aria-label="scrollable auto tabs example"
  allowScrollButtonsMobile={true}
  TabIndicatorProps={{
    style: {
      backgroundColor: 'RGB(0, 31, 63)',
      height: '3px',
    },
  }}
  sx={{
    '& .Mui-selected': {
      color: 'RGB(0, 31, 63)',
    },
  }}
>
        {allTabs}
      </Tabs>
    </Box>
  );
}
