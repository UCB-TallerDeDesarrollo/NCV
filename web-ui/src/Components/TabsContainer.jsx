import * as React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import Container from './Container';
import { Box } from '@mui/material';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #023859;
  cursor: pointer;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px 0px 0px 0px;
  border: none;
  border-radius: 12px 12px 0px 0px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    outline: 3px solid ${blue[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: #023859;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)(
  ({ theme }) => `
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  `,
);

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  max-width: 1000px;
  background-color: #5cd4e2;
  border-radius: 12px 12px 0px 0px;
  display: flex;
  align-items: bottom;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

export default function TabsContainer({tabsNames,tabsContent}) {
  return (
    <Box sx={{width:0.75, mb:2}}>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
        {
          tabsNames.map((tab,i)=>{
            return (<Tab key={i}>{tab}</Tab>);
          })
        }
        </TabsList>
        <Container sx={{width:1,margin:0, borderTopLeftRadius:0 }}>
        {
          tabsContent.map((tab,i)=>(<TabPanel key={i} value={i}>{tab}</TabPanel>))
        }
        </Container>
      </TabsUnstyled>
    </Box>
  );
}
