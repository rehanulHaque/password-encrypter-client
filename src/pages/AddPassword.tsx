import { FormEvent, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const {VITE_HOST_URL} = import.meta.env

const AddPassword = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [websitelink, setWebsitelink] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [phone, setPhone] = useState<Number>();
  const [encrypt, setEncrypt] = useState(true);

  const token = JSON.parse(localStorage.getItem('passwordToken')!);
  const navigate = useNavigate()
  const handelSubmit = async(e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const postData = await axios.post(`${VITE_HOST_URL}/api/v1/password/`, {
      email,
      username,
      websitelink,
      password,
      doEncrypt: encrypt,
      title,
      key,
      phone
    }, {
      headers: {
        'Authorization': token.token
      }
    })
    if(postData.data.sucess){
      toast.success(postData.data.message)
      navigate('/dashboard')
    }else{
      toast.error(postData.data.message)
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-700 my-10">Add Password</h1>
      <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
      <div className="max-w-xl">
          <label htmlFor="title">Email*</label>
          <input
            type="text"
            placeholder="example@example.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="max-w-xl">
          <label htmlFor="title">Phone</label>
          <input
            type="number"
            placeholder="1234567890"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setPhone(Number(e.target.value))}
          />
        </div>
        <div className="max-w-xl">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            placeholder="example"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="max-w-xl">
          <label htmlFor="username">User name</label>
          <input
            type="text"
            placeholder="john doe"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="max-w-xl">
          <label htmlFor="websitelink">Website link</label>
          <input
            type="text"
            placeholder="https://example.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setWebsitelink(e.target.value)}
            value={websitelink}
          />
        </div>
        <div className="max-w-xl">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            placeholder="********"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="max-w-xl">
          <label htmlFor="password">Key</label>
          <input
            type="password"
            placeholder="KEY"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => setKey(e.target.value)}
            value={key}
          />
        </div>
        <div className="max-w-xl">
          <label htmlFor="encrypt" className="mr-3">
            Encrypt your password
          </label>
          <input type="checkbox" id="ecnrypt" checked={encrypt} onChange={(e) => setEncrypt(e.target.checked)} />
        </div>
        <div className="max-w-xl">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPassword;
