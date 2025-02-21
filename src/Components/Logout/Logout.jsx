import { useNavigate } from "react-router-dom"

export default function Logout(){
    const navigate=useNavigate()
    const handlelogout=()=>{
        navigate('/');
    }
    return(
        <div>
            <button type="button" onClick={handlelogout}>Logout</button>
        </div>
    )
}