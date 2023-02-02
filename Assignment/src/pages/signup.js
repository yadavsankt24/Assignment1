import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import axios from "axios";

const postDisplayData = (data) => {
  console.log(data);
  try {
    return axios.post(`https://json-mock6.onrender.com/user`, data);
  } catch (err) {
    alert("Something Went Wrong");
    console.log(err);
  }
};
function displayData() {
  try {
    return axios.get(`https://json-mock6.onrender.com/user`);
  } catch (err) {
    alert("Something Went Wrong");
    console.log(err);
  }
}

const Signup = () => {
  const [email, emailchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [confirm, setConfirm] = useState("");
  const [signup, setSignup] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    displayData().then((res) => {
      setSignup(res.data);
    });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (email == "" || password == "" || name == "" || confirm == "") {
      alert("Fill All Details");
    } else {
      if (signup) {
        const array = signup.filter((e) => e.name == name);
        if (array.length > 0) {
          alert("Use Different Username");
        } else {
          if (confirm == password) {
            const obj = {
              email: email,
              password: password,
              name: name,
            };
            postDisplayData(obj).then((res) => {
              alert("Signed up Successfully");
              navigate("/login");
            });
          } else {
            alert("Password doesnot match");
          }
        }
      }
    }
  };
  return (
    <div className={style.container}>
      <div className={style.top_content}>
        <h1>Welcome !</h1>
        <h2>Sign in to </h2>
        <p>Lorem Ispum is simply</p>
      </div>

      <form className={style.login_form} onSubmit={handlesubmit}>
        <label className={style.label}>Email</label>
        <input
          className={style.input}
          value={email}
          onChange={(e) => emailchange(e.target.value)}
          type="email"
          placeholder="Enter your user name"
          id="email"
          name="email"
        />
        <label className={style.label}>User name</label>
        <input
          className={style.input}
          value={name}
          onChange={(e) => namechange(e.target.value)}
          type="text"
          placeholder="Enter your user name"
          id="name"
          name="email"
        />
        <label className={style.label}>Password</label>
        <input
          className={style.input}
          value={password}
          onChange={(e) => passwordchange(e.target.value)}
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
        />
        <label className={style.label}>Confirm Password</label>
        <input
          className={style.input}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Enter your password"
          id="id"
          name="password"
        />
        <div className="check_forget"></div>
        <input type="checkbox" />
        <label htmlFor="">Remember me</label>
        <label>Forget password?</label>
        <button className={style.btn} type="submit">
          Login
        </button>
      </form>
      <Link to={"/login"}>Already User?</Link>
    </div>
  );
};

export default Signup;
