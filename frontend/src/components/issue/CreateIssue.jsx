import React, {useState,useEffect} from 'react';
// import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import axios from "axios";

const CreateIssue = () => {
    const [userId, setUserId] = useState('');   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [user, setUser] = useState('');
    const [assignee, setAssignee] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [dueDate, setDueDate] = useState('');
    useEffect(() => {
        const userId=localStorage.getItem('userId');
        setUserId(userId);
        const userName= async () => {
            const response = await fetch(`http://localhost:3000/userProfile/${userId}`);
            const data = await response.json();
            const name= data.username;
            setUser(name[0]);
        }
        userName();
    }, []);
    const submitedIssues= async (e) => {
        e.preventDefault();
        // const issue = {title, description};
        const response = await axios.post('http://localhost:3000/create/issue', {
              
             title: title,
             description: description,
            },
        );
        // const data = await response.json();
        // console.log(data);
    }
    return ( 
        <>
        <div className='mt-8 p-9 '>
            <h1 className='flex  lg:text-3xl md:text-2xl sm:text-1xl '><span className='bg-slate w-10 text-center border-2 
            rounded-full h-10 text-white'>{user}</span> &nbsp;Create new Issue</h1>
            <form action="" method='post' className='mt-5 sm:mx-4 md:m-8 lg:mx-16'>
                 <label htmlFor="title">add a title</label>
                    <input type="text" name="title" id="title" className='w-full border-2
                     border-gray-300 p-2 bg-slate-900 rounded-md' onChange={(e)=>setTitle(e.target.value)}/>
                <label htmlFor="description">add a description</label>
                <textarea name="description" id="description" rows="20" className=' bg-slate-900 w-full border-2
                     border-gray-300 p-2 rounded-md' onChange={(e)=>setDescription(e.target.value)}></textarea>
                     <button className='  lg:w-[6%] md:w-[10%] sm:w-[10%] h-10 rounded-lg relative lg:right-[-75rem] md:right-[-45rem] mt-8 border-stone-800 bg-green-700'>Create</button>
            </form>

        </div>
        </>
    );
    }

export default CreateIssue;