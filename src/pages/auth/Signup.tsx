import axios from "axios";
import {FormEvent, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
const {VITE_HOST_URL} = import.meta.env

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useNavigate()

  const handelSubmit = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const postData = await axios.post(`${VITE_HOST_URL}/api/v1/user/register`, {
      username,
      email,
      password
    })
    localStorage.setItem('passwordToken', postData.data.token)
    router('/dashboard')
  }
  return (
    <section className="mt-20">
      <form className="max-w-sm mx-auto" onSubmit={handelSubmit}>
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Create an account</h1>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            User Name
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="John Doe"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <p className="mt-3 text-sm">Already have an account? <Link className="text-blue-700 underline" to={'/login'}>Login</Link></p>
      </form>
    </section>
  )
}

export default Signup
