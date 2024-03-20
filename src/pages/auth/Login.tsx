import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../redux/slices/UserSlice";
import { useDispatch } from "react-redux";
const {VITE_HOST_URL} = import.meta.env
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useNavigate()
  const dispatch = useDispatch()

  const handelSubmit = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const postData = await axios.post(`${VITE_HOST_URL}/api/v1/user/login`, {
      email,
      password
    })
    if(postData.data.sucess){
      const data= {token: postData.data.token, name: postData.data.name}
      localStorage.setItem('passwordToken', JSON.stringify(data))
      dispatch(login((postData.data.name)))
      router('/dashboard')
      toast.success('Login Success')
    }
    else{
      toast.error(postData.data.message)
    }
  }
  return (
    <section className="mt-20">
      <form className="max-w-sm mx-auto" onSubmit={handelSubmit}>
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Login to your account</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="example@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
      <p className="mt-3 text-sm">Don't have an account? <Link className="text-blue-700 underline" to={'/signup'}>Create One</Link></p>
      </form>
    </section>
  );
};

export default Login;
