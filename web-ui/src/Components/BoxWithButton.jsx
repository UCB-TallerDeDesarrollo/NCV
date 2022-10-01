import * as React from 'react';
import Box from '@mui/material/Box';
import { Fragment } from 'react'

export default function BoxWithButton({ about }) {
  return (
    <Box sx={{ flexGrow: 1 , display: about.display}}>
     <Fragment>
            <button className={about.nameClass} onClick={about.action}>
                {about.texto}
            </button>
        </Fragment>
    </Box>
  );
}