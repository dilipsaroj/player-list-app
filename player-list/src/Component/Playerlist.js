import React,{useState,useEffect} from 'react';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";

const Playerlist = () => {
    const [playerlist, setPlayerlist] = useState([]);
    const [teamlist, setTeamlist] = useState([]);

    useEffect(() => {
        fetchPlayerlist()
      },[]);

    const fetchPlayerlist = async()=>{
        let url = "https://api.npoint.io/20c1afef1661881ddc9c";
        console.log("url",url)
        await trackPromise(axios.get(url,{
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            // console.log(response.data)
            
            if(response){
                let all_data = response.data;
                setPlayerlist(all_data.playerList)
                setTeamlist(all_data.teamsList)
            }
        })
        )
    }
    console.log("playerlist",playerlist);
    console.log("teamlist",teamlist)
  return (
    <div>

    </div>
  )
}

export default Playerlist;