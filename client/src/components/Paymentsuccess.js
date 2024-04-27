import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useSearchParams } from "react-router-dom";

const Paymentsuccess = () => {
    
    const searchQuery = useSearchParams()[0];
    
    const referencenum = searchQuery.get("reference")
  return (
    <Stack height={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <h1> Payment Success</h1>
        <p> Referece No.: {referencenum} </p>

    </Stack>
  )
}

export default Paymentsuccess
