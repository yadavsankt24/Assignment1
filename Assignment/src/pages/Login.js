import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import axios from "axios";

function displayData() {
    try {
      return axios.get(`https://json-mock6.onrender.com/user`);
    } catch (err) {
      alert("Something Went Wrong");
      console.log(err);
    }
  }




export const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [signup, setSignup] = useState("");
    const[exist,setExist]=useState([])

    const navigate = useNavigate();

  
    useEffect(() => {
        displayData().then((res) => {
          setSignup(res.data);
        });
      }, []);


   function handlesubmit(e) {
    e.preventDefault();

    if (username == "" || password == "") {
        alert("Fill All Details");
      }else {
        let exist=signup.filter((item)=> item.name == username && item.password == password)
        setExist(exist)
        if(exist.length>0){
         alert("Welcome task page")
         navigate("/home")
         
        }else{
         alert("No Username Exist")
        }
       }
  }
  
//   console.log(tempData);    


  return (
    <div className={style.container}>
      <div className={style.top_content}>
        <h2>Welcome !</h2>
        <h2>Sign in to </h2>
        <p>Lorem Ispum is simply</p>
      </div>

      <form className={style.login_form} onSubmit={handlesubmit}>
        <label className={style.label}>User name</label>
        <input
          className={style.input}
          value={username}
          onChange={(e) => usernameupdate(e.target.value)}
          type="text"
          placeholder="Enter your user name"
          
        />
        <label className={style.label}>Password</label>
        <input
          className={style.input}
          value={password}
          onChange={(e) => passwordupdate(e.target.value)}
          type="password"
          placeholder="Enter your password"
          
        />
        <div className="check_forget"></div>
        <input type="checkbox" />
        <label htmlFor="">Remember me</label>
        <label>Forget password?</label>
        <button className={style.btn} type="submit">
          Login
        </button>
      </form>
      <button className="link-button">Don't have an account? Register </button>
    </div>
  );
};


