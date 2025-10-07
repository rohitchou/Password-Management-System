import React, { useEffect, useState } from "react";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    try {
      const req = await fetch("http://localhost:3000/"); // matches backend GET route
      const passwords = await req.json();
      setPasswordArray(passwords);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST", // matches backend POST route
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (result.success) {
        getPasswords(); // Refresh the list after saving
        setForm({ site: "", username: "", password: "" });
      }
    } catch (error) {
      console.log("Error saving password:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className="px-2 mycontainer ">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700"> &lt;</span>
          <span>Password</span>
          <span className="text-green-700"> Safety/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <input
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center gap-3 border-2 border-black-900 items-center bg-green-600 hover:bg-green-500 hover:font-semibold rounded-full px-8 py-2 w-fit"
          >
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 text-center">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border border-white text-center w-32">
                      <a href={item.site} target="_blank" rel="noreferrer">
                        {item.site}
                      </a>
                    </td>
                    <td className="py-2 border border-white text-center w-32">
                      {item.username}
                    </td>
                    <td className="py-2 border border-white text-center w-32">
                      {item.password}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;