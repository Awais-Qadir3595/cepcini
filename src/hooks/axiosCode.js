import axios from "axios";
import { BASE_URL } from "./ROUTES";


const Axios_Fetch=async(Route)=>{
    
  // console.log(`${BASE_URL}${Route}`);
 return new Promise((resolve)=>{

    axios({
        method: 'get',
        url: `${BASE_URL}${Route}`,
        headers:{
          "Authorization": "Bearer "+ global?.user?.data?.token,
      
          
        }
      }).then((response) => {
    
        resolve( response.data);
      }).catch(error=>{
        console.log('error');
      })
 })
   
}


const Axios_Post_data=(obj,url)=>{
    
  return new Promise((resolve,reject)=>{

    axios({
      method: 'post',
      url: `${BASE_URL}${url}`,
      data: obj,
      headers:{
        "Authorization": "Bearer "+ global?.userData?.token,
        // "Authorization": "Bearer "+ '264|WvTcfIZER26iDbx2uRszRQmbLr4Rteko3YPic7x3ef7ec315',
      }
    }).then((Response)=>{
      console.log(Response);
      
     if(Response.status==200)
     {
      resolve(Response.data)
     }
     else{
           reject('yyyy')
     }
    });

  })

  

}
export {Axios_Fetch,Axios_Post_data};