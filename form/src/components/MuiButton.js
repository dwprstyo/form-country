import React from 'react'
import { Stack, Button } from "@mui/material";

const MuiButton = () => {
  return (
    <Stack spacing={2} direction="row">
        <Button variant='text'>
            Text
        </Button>
        <Button variant='contained'>
            contained
        </Button>
        <Button variant='filled'>
            filled
        </Button>
    </Stack>
  )
}

export default MuiButton