import { useParams } from "react-router-dom"

function User() {
    const {userid} = useParams();
  return (
    <div className="bg-gray-700 text-white text-center h-[100px] text-4xl flex items-center justify-center">User ID: {userid}</div>
  )
}

export default User