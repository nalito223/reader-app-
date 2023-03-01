import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./Tabs.css"
import { accordionActionsClasses } from '@mui/material';

export default function Tabs(props: any) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(Number(newValue));
    props.setSelectedSection(props.sections[newValue])
    // console.log("TABS VALUE", props.sections[newValue])
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
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={String(value)}>
        <Box sx={{
          borderBottom: 1, borderColor: 'divider'

        }}>
          <TabList onChange={handleChange}
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
            }}
          >

            {allTabs}

            {/* <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        {/* <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
}