import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // For now, just a dummy check (you can replace with API call)
    if (form.username && form.password) {
      onLogin(); // ✅ tells App.jsx that the user is logged in
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-green-400 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-green-400 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
