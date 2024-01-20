import React from "react"
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ReportIcon from '@mui/icons-material/Report';
import Face6Icon from '@mui/icons-material/Face6';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BG from "../../Assets/BG.jpg"

const Home = () => {
    let navigate = useNavigate();

    return (
        <>
            <Box sx={{ margin: "0 10px" }}>
            </Box>
            <Paper elevation={5} sx={{ width: "95%", marginY: 4, marginX: "auto", padding: 0}}>
                <img src={BG} alt="BG" style={{ width: "100%" }} />
                <Box sx={{ padding: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, flexFlow: "wrap row" }}>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ px: 3, py: 1 }}
                        onClick={() => navigate("/studentDashboard")}
                    >
                        <ReportIcon sx={{ marginRight: 1 }} />Register Complaint
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        sx={{ px: 3, py: 1 }}
                        onClick={() => navigate("/signup")}
                    >
                        <Face6Icon sx={{ marginRight: 1 }} />
                        New User
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                    <SideNotification />

                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ padding: 4 }}>

                            <Typography variant="h4" sx={{ marginBottom: 3, textDecoration: "underline", textAlign: "center" }}>
                                Instruction to File a Compliant
                            </Typography>
                            <ul>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    When filing a complaint, ensure that you provide as much detailed information as possible about the issue you are facing or have witnessed. This includes dates, times, locations, and any individuals involved.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    While describing your complaint, maintain a calm and respectful tone. Focus on the facts and avoid using offensive language or making personal attacks.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    While describing your complaint, maintain a calm and respectful tone. Focus on the facts and avoid using offensive language or making personal attacks.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    If you have any evidence related to your complaint, such as photos, documents, or screenshots, consider attaching them as a link (Drive link or any link that is in public). Evidence can be valuable in addressing your concern.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    Do not provide false or misleading information in your complaint. Accuracy is essential for a fair resolution.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    All the attachments, links and data provided by you will be verified by the authorities and kept confidential.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    Do not use your complaint as a means to harass, threaten, or intimidate others. Keep your communication respectful and focused on the issue.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    Ensure that your complaint follows the platform's guidelines and policies. This helps maintain a positive and safe environment for all users.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    Submit your complaint only once and avoid spamming or duplicating it. Multiple submissions of the same complaint can cause delays.
                                    </Typography>
                                </li>

                            </ul>

                        </Box>
                    </Grid>

                </Grid>


            </Paper>


        </>
    )
}
export default Home
const SideNotification = () => { // SideNotification
    const [allNotifications, setAllNotifications] = React.useState([]) // allNotifications
    React.useEffect(() => { 
        const q = query(collection(db, "empowerkids_notification"));// query to get the user info from the database
        const unsubscribe = onSnapshot(q, (querySnapshot) => { // onSnapshot
            let tempNotific = [] // temporary variable to store the user info
            querySnapshot.forEach((doc) => { // for each document in the querySnapshot
                tempNotific.push({ ...doc.data(), key: doc.id }); // store the user info in mytempinfo
            }); // end of forEach
            setAllNotifications(tempNotific)// set the myinfo state to mytempinfo
        }); // end of onSnapshot

        return (() => { // return
            unsubscribe() // unsubscribe from the query
        })
    }, [])
    return (
        <>
            <Paper elevation={2} sx={{ margin: 2, bgcolor: "#008336" }}> 
                <Typography variant="h6" sx={{ padding: 2, color: "white", display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <NotificationsIcon sx={{ marginRight: 1 }} />Notification / Updates
                </Typography>
                <List component="marquee" direction="up" sx={{ width: '100%', height: "300px", bgcolor: 'background.paper' }}>
                    {
                        allNotifications.map((notific) => {// allNotifications
                            return (
                                <>
                                    <ListItem>
                                        <ListItemText
                                            primary={notific.notification} // notification
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </>
                            )
                        })
                    }

                </List>
            </Paper>
        </>
    )
}


