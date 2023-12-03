import React, { useState, useEffect } from 'react'
import axios from 'axios';
export default function useAuth(code){
    const [accessToken,setAcesstoken] =useState()
    const [refershToken,setRefershToken]=useState()
    const [expireToken,setExpireToken]=useState()

    useEffect(()=>{
        axios.post("http://localhost:3001/login", {
            code
        }).then( res=>{
            // console.log(res.data);
            setAcesstoken(res.data.accessToken);
            setRefershToken(res.data.refershToken);
            setExpireToken(61);
            window.history.pushState({},null,"/")
        }).catch(()=>{
            // window.location='/'
        })
    },[code])
    useEffect(()=>{
        if(!refershToken || !expireToken) return
        const timeout=setInterval( () =>{
        axios.post("http://localhost:3001/refresh", {refershToken})
          .then( res=>{
            setRefershToken(res.data.refershToken);
            setExpireToken(61);

            // window.history.pushState({},null,"/")
        }).catch(()=>{
            // window.location = '/'
        })
    },(expireToken - 60) *1000)
        return ()=>clearInterval(timeout)
    },[refershToken,expireToken])

    return accessToken
}