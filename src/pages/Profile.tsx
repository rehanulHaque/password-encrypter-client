import axios from "axios"
import { useEffect, useState } from "react"

interface ProfileTypes {
  email: string
  username: string
  _id: string
}
const {VITE_HOST_URL} = import.meta.env

const Profile = () => {
  const [profileData, setProfileDate] = useState<ProfileTypes>()
  const token = JSON.parse(localStorage.getItem('passwordToken')!)
  const getProfile = async () => {
    const getData = await axios.get(`${VITE_HOST_URL}/api/v1/user/me`, 
    {headers: {
      'Authorization': token.token
    }})
    setProfileDate(getData.data)
  }
  useEffect(()=>{
    getProfile()
  }, [])
  return (
    <section className="grid place-items-center h-screen">
      <div className="p-5 bg-zinc-400 rounded-md">
        <h1><b>Name:</b> {profileData?.username}</h1>
        <h2><b>Email:</b> {profileData?.email}</h2>
        <h2><b>ID:</b> {profileData?._id}</h2>

      </div>
    </section>
  )
}

export default Profile
