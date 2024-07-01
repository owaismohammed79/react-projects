//import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"
//import { useLoaderData } from "react-router-dom"
import githubInfoLoader from "./GithubAPI";

function Github() {
  let {id} = useParams();
  if(id === undefined){
    id = "owaismohammed79";
  }
  const [url, setUrl] = useState(null)
  const [followers, setFollowers] = useState(null)
  //Waise to we could've done it through the useEffect hook se kar sakte he but ye githubInfoLoader wale function ko as a loader use karke optimize kar rahe he ham wo API call ko
  githubInfoLoader(id).then((data)=>{setUrl(data.avatar_url); setFollowers(data.followers)})

  // useEffect(()=>{
  //   // fetch(`https://api.github.com/users/${id}`)
  //   // .then(res => res.json())
    
  //   // .then((data)=>{
  //   //  setUrl(data.avatar_url);
  //   //  setFollowers(data.followers);
  //   //})
  // },[data])

  return (
    <div className="text-center m-4 text-white p-4 text-3xl bg-gray-700 flex-col items-center justify-center">
      <div className="w-full p-2">Github followers: {followers}</div> 
      <div className="w-full flex justify-center p-2">
        <img src={url} alt="Github profile photo"  className="w-[300px]" />
      </div>
    </div>
  )
}

export default Github

