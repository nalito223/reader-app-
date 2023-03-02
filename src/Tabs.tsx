import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./Tabs.css"
import { accordionActionsClasses } from '@mui/material';
import { useNavigate } from "react-router-dom"

export default function Tabs(props: any) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(Number(newValue));
    props.setSelectedSection(props.sections[newValue])
    navigate("/")
  };

  let counter = -1
  const allTabs = props.sections.map((section: string) => {
    counter++
    return (
      <Tab
        key={counter}
        value={`${counter}`}
        label={`${section}`}
        style={{ color: 'RGB(0, 31, 63)' }}
        sx={{ fontFamily: "'Lora', serif" }}
      />
    )
  })

  return (
    <Box sx={{ width: '100%', typography: 'body1', }}>
      <TabContext value={String(value)}>
        <Box sx={{
          borderBottom: 1,
          borderColor: 'divider',
          overflowX: 'auto',
        }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            className="tablist-container"
            TabIndicatorProps={{
              style: {
                backgroundColor: 'RGB(0, 31, 63)',
                height: '3px',
              },
            }}
            sx={{
              '& .Mui-selected': {
                color: 'RGB(0, 31, 63)',
                // borderBottom: '2px solid RGB(0, 31, 63)',
              },
              display: 'flex',
              flexWrap: 'nowrap',
              maxWidth: '100%',
            }}
          >
            {allTabs}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
