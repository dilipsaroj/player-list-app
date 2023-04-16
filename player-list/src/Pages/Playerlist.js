import React,{useState,useEffect} from 'react';
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import CustomButton from '../Components/custom/CustomButton';

const Playerlist = () => {
    const [playerlist, setPlayerlist] = useState([]);
    const [teamlist, setTeamlist] = useState([]);
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        fetchPlayerlist()
        setInputValue("")
      },[]);

    const fetchPlayerlist = async()=>{
        let url = "https://api.npoint.io/20c1afef1661881ddc9c";
        await trackPromise(axios.get(url,{
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            
            if(response){
                let all_data = response.data;
                setPlayerlist(all_data.playerList)
                setTeamlist(all_data.teamsList)
            }
        })
        )
    }
    const OnChangeInput = (e) =>{
      let item = e.target.value;
        if(!item){
          setInputValue("")
        }
        else{
          setInputValue(item)
        }
    }

    const onSubmit = () =>{
      let filervalue = playerlist.filter((item) => item.TName == inputValue || item.PFName == inputValue)
      if(filervalue){
        setPlayerlist(filervalue)
      }
    }
    const refreshHandler = () =>{
      setInputValue("")
      fetchPlayerlist()
    }


    const convertDate = (paramDate) => {
      if(paramDate){
        var date = new Date(paramDate)

        return  date.getDate() + "-" +
                date.getMonth() + "-" +
                date.getFullYear() +  ' ' +
                date.getHours() + ':' +
                date.getMinutes() + ':' +
                date.getSeconds()

      }
      else{
        return "-"
      } 
    }
    
    
  return (
   <div className='wrapper'>
      <div className=" row form-group filter_content col-lg-12">
        <div className='col-lg-4 col-md-4 col-sm-4 col-12'>
          <input type="email" className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter TName or PFName" value={inputValue} onChange={(e) => OnChangeInput(e)} />
        </div>
        <div className='col-lg-1 col-md-1 col-sm-1 col-4'>
          <CustomButton className="btn" onClick={() => onSubmit()}>Submit</CustomButton>
        </div>
        <div className='col-lg-1 col-md-1 col-sm-1 col-4'>
          <CustomButton className="btn" onClick={() => refreshHandler()}>Reset</CustomButton>
        </div>
      </div>
      {
      playerlist.length > 0 ?
      <div className='main_content'>
      {playerlist.map((item) =>{
        playerlist.sort((el1,el2) => el1.Value.localeCompare(el2.Value, undefined, {numeric: true}));     

        return(
          <div className='card'>  
          <div className='card_content'>
            <div>
              <div className='col-lg-12 main_img_style'>
                  <img className="img_style" src={`${process.env.PUBLIC_URL}/player-images/${item.Id}.jpg`} />
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <h5>{item.PFName ? item.PFName : "-"}</h5>                
                <h6>Name</h6>
              </div>
             <div className='col-lg-6 col-md-6 col-sm-12'>
                <h5>{item.SkillDesc ? item.SkillDesc: "-"}</h5>
                <h6>Skill</h6>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <h5>${item.Value}</h5>
                <h6>Value</h6>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                {
                  item.UpComingMatchesList?.[0].CCode != "" && item.UpComingMatchesList?.[0].VsCCode != "" ?
                  <h5>{item.UpComingMatchesList?.[0].CCode}  vs.  {item.UpComingMatchesList?.[0].VsCCode}</h5>:
                  "-"
                }
                
                <h6>UpComing Match</h6>
              </div> 
              
            </div>
            <div className='row'>
              
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <h5>{ convertDate(item.UpComingMatchesList?.[0].MDate)}</h5>
                <h6>Match Time</h6>
              </div>

            </div>
          </div>
        </div> 
        )
      })}

        </div>
          : 
          <div style={{width:'100%',float:'left',color:'black',textAlign:'center'}}>
              <h4> No Record Found </h4>
          </div>
        }

    </div>  
  )
}

export default Playerlist;