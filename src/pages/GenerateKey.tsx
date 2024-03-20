import { useState } from "react";

const RandomStringGenerator = () => {
  const [randomString, setRandomString] = useState("");

  const generateRandomString = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRandomString(result);
  };
  const handelCopy = () => {
    navigator.clipboard.writeText(randomString);
    alert("Copied the text: " + randomString);
  };
  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-700 my-10">Generate Random Key</h1>
      <div className="my-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={generateRandomString}
        >
          Generate Random String
        </button>
        {randomString && (
          <p>
            <b>Random Key:</b>{" "}
            <span
              onClick={handelCopy}
              className="cursor-copy hover:underline transition-all"
            >
              {randomString}
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default RandomStringGenerator;
