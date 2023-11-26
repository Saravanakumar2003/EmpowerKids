import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"


import { Paper } from "@mui/material"
import UsersTable from "./UsersTable"
import MyInfo from "../../Components/MyInfo"

const AdminDashboard = ({ currUser, notify }) => { 
    const navigate = useNavigate() // useNavigate is a hook that allows us to navigate to a different page

    const [myinfo, setmyinfo] = useState({}) // myinfo is the info of the current user

    useEffect(() => {
        if (myinfo.accountType) {
            if (myinfo.accountType === "Student") { // if the account type is student, navigate to student dashboard
                navigate("/studentDashboard")
            } else if (myinfo.accountType === "Empowerkids Team" || 
            myinfo.accountType === "Legal Expert" ||
            myinfo.accountType === "Government Official") {
                navigate("/officerDashboard") // if the account type is Empowerkids Team, Legal Expert or Government Official, navigate to officer dashboard
            } else if (myinfo.accountType === "Admin") { 
                navigate("/adminDashboard")// if the account type is Admin, navigate to admin dashboard
            }
        }
    }, [myinfo, navigate]) // this useEffect will run when myinfo or navigate changes

    useEffect(() => { 
        if (!currUser) {
            navigate("/login") // if the user is not logged in, navigate to login page
            return
        }

        const q = query(collection(db, "empowerkids_users"), where("uid", "==", currUser.uid)); // query to get the user info from the database
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let mytempinfo // temporary variable to store the user info
            querySnapshot.forEach((doc) => {
                mytempinfo = doc.data() // store the user info in mytempinfo
            });
            setmyinfo(mytempinfo) // set the myinfo state to mytempinfo
        });

        return (() => {
            unsubscribe() // unsubscribe from the query
        })
    }, [currUser, navigate]) 

    return (
        <>
            <MyInfo currUser={currUser} myinfo={myinfo} /> 
            <Paper elevation={6} sx={{ my: 3, p: 3 }}>
                <UsersTable currUser={currUser} myinfo={myinfo} notify={notify} /> 
            </Paper>
        </>
    )
}

export default AdminDashboard