import { useEffect, useState } from "react"
import axios from 'axios'

const Home = ()=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    // console.log(backendUrl)
    const [users, setUsers] = useState([])

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const[btnTxt, setBtnTxt] = useState('Add')
    const[userId, setUserId] = useState(null)

    // const users = [{id: 1,name: 'raj', email: 'raj@gmail.com'},{id: 2,name: 'abc', email: 'abc'}]

    const getUsers = async()=>{
        const result = await axios.get(backendUrl)
        // console.log(result)
        setUsers(result.data.users)
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        // console.log(username, email)
        if(btnTxt === 'Add'){
            const result = await axios.post(backendUrl, {name: username,email})
            // console.log(result)
            if(result.data.success){
                alert(`${result.data.user.name} 's data added successfully`)
            }
            else{
                alert(result.data.message)
            }
        }else{
            const result = await axios.put(`${backendUrl}/${userId}`, {name: username,email})
            // console.log(result)
            if(result.data.success){
                alert(`${result.data.updatedUser.name} 's data updated successfully`)
            }
            else{
                alert(result.data.message)
            }
        }
        setUsername('')
        setEmail('')
        setUserId(null)
        setBtnTxt('Add')
        getUsers()
    }

    const deleteUser = async(id) =>{
        const result = await axios.delete(`${backendUrl}/${id}`)
        alert(result.data.message)
        getUsers()
    }

    const updateUser = (user)=>{
        setBtnTxt('Update')
        setUsername(user.name)
        setEmail(user.email)
        setUserId(user.id)
    }

    useEffect(()=>{
        getUsers()
    },[])

    return(
        <>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="name" onChange={(e)=> setUsername(e.target.value)} value={username} placeholder="Enter name of user" required></input>
                <input type="text" name="email" onChange={(e)=> setEmail(e.target.value)} value={email} placeholder="Enter email of user"></input> &nbsp;
                <button type="submit">{btnTxt}</button>
            </form>

            {users && users.length > 0 ? 
                <ul>
                    {users.map((user)=>(
                        <span key={user.id}>Name: <b>{user.name }</b> &nbsp;
                        Email: <b>{ user.email}</b> &nbsp;
                        <button onClick={() => updateUser(user)}>Update</button> &nbsp;
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                        <br></br></span>
                    ))}
                </ul>
            : <p> Users are empty </p>}

        </>
    )
}

export default Home