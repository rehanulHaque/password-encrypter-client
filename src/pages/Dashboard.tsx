import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
const {VITE_HOST_URL} = import.meta.env

interface PasswordTypes {
  _id: string;
  title: string;
  email: string;
  username: string;
  websitelink: string;
  password: string;
  phone: number;
}
const Dashboard = () => {
  const [key, setKey] = useState('');
  const [passwordId, setId] = useState('')
  const [userPasswords, setUserPasswords] = useState<PasswordTypes[]>();
  const [openModal, setOpenModal] = useState(false);
  const token = JSON.parse(localStorage.getItem("passwordToken")!);

  const getAllPasswords = async () => {
    const getData = await axios.get(`${VITE_HOST_URL}/api/v1/password/`, {
      headers: {
        Authorization: token.token,
      },
    });
    if (getData.data.length === 0) {
      return <h1>No Password to show</h1>;
    }
    setUserPasswords(getData.data);
  };
  useEffect(() => {
    getAllPasswords();
  }, []);
  const handelSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const getPassword = await axios.post(`${VITE_HOST_URL}/api/v1/password/decrypt`, {
      key,
      passwordId
    }, {
      headers: {
        'Authorization': token.token
      }
    })
    if(getPassword.data.sucess){
      navigator.clipboard.writeText(getPassword.data.password)
      toast.success("password copied")
    }else{
      toast.error(getPassword.data.message)
    }

  };

  const handelDelete = async (id: string) =>{
    const postData = await axios.post(`${VITE_HOST_URL}/api/v1/password/delete`, {
      id
    }, {
      headers: {
        'Authorization': token.token
      }
    })
    if(postData.data.sucess){
      toast.success(postData.data.message)
      getAllPasswords();
    }else{
      toast.error(postData.data.message)
    }
  }

  return (
    <section className="relative">
      <h1 className="text-3xl font-bold text-gray-700 my-10">
        Save your Password
      </h1>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Copy password
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Website Link
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {userPasswords?.map((password) => {
              return (
                <tr className="bg-white border-b " key={password._id}>
                  <td className="px-6 py-4">
                    <button onClick={() => {
                      setOpenModal(!openModal)
                      setId(password._id)
                    }}>
                      Copy
                    </button>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {password.title}
                  </th>

                  <td className="px-6 py-4">{password.email}</td>
                  <td className="px-6 py-4">{password.phone}</td>
                  <td className="px-6 py-4">{password.username}</td>
                  <td className="px-6 py-4">{password.websitelink}</td>
                  <td className="px-6 py-4">{password.password}</td>
                  <td className="px-6 py-4"><button onClick={() => handelDelete(password._id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className={`${openModal ? "block" : "hidden"} ${
          openModal ? "fixed" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Enter Key to Get Password
              </h3>
              <button
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => setOpenModal(!openModal)}
              ><ImCross className="text-black" />
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handelSubmit}>
                <div>
                  <label
                    htmlFor="key"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Key
                  </label>
                  <input
                    type="text"
                    id="key"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="********************************"
                    required
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Copy Password
                </button>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
