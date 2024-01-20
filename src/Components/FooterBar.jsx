import React from "react"
import Box from '@mui/material/Box';
import { Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: "#131313",
                    color: "white"
                }}
            >
                <Container maxWidth="xl">  {/* xl is the max width of the container */}
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column" }}> {/* flexFlow is the shorthand for flex-direction and flex-wrap */}
                        <a href="" target="_blank" rel="noreferrer" >
                        </a>
                        <Box>
                        {/* Link to the EmpowerKids Complaint Register Portal */} 
                        <Typography  sx={{ cursor: "pointer", display:"inline-block", marginX:1 }} onClick={() => window.open("", '_blank')}> 
                        EmpowerKids Complaint Register Portal
                        </Typography>

                        </Box>
                        {/* Copyright notice */}
                        <Typography sx={{ textAlign: "center" }}>
                            EmpowerKids<br />2023 &#169; All Rights Reserved
                        </Typography> 
                    </Box>
                </Container> {/* End of Container */}
            </Box>
        </>
    )
}

export default Footer