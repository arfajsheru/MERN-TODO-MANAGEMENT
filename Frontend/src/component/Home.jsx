import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";
import { MdAddReaction } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:2000/todo/fetch", {
          withCredentials: true, // Iska matlab hai ke agar authentication ke liye cookies ya token chaiye, toh wo bhej diye jayenge.
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.todos);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch Todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "http://localhost:2000/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create Todos");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:2000/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to fetch find Todos");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to delete Todos");
    }
  };

  const navigateTo = useNavigate();

  const logout = async() => {
    try {
      axios.get("http://localhost:2000/user/logout", {
        withCredentials:true,
      })
      toast.success('user logged out successfully');
      localStorage.removeItem("jwt");
      navigateTo('/login')
      
    } catch (error) {
      toast.error("Error loging logout")
    }
  }

  let TodoRemaining = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="mt-8 bg-[#62cff4] p-6 max-w-lg rounded-lg shadow-lg flex flex-col gap-4 mx-8 sm:mx-auto">
      <h1 className="text-2xl text-gray-700 font-bold text-center ">
        Todo app
      </h1>

      <div className="flex justify-between">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && todoCreate()}
          type="text"
          className="p-2 h-8 sm:h-9 flex-1 text-[14px] sm:text-[16px] rounded-l-sm font-medium border-none outline-none focus:none bg-gray-300 hover:bg-gray-200 duration-500 transition-colors "
          placeholder="enter todo"
        />
        <div
          onClick={todoCreate}
          className="flex  items-center justify-center gap-1 bg-green-600 h-8 sm:h-9 px-1 text-sm md:text-lg cursor-pointer md:px-2 sm:text-xl font-normal rounded-r-sm hover:bg-green-700 duration-500 transition-colors"
        >
          <MdAddReaction className="text-sm md:text-[16px] text-white" /> add
        </div>
      </div>

      <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-1">
  <div className="flex justify-center ">
    {loading ? (
      <span className="loader"></span>
    ) : (
      <div className="text-center text-red-500 font-medium text-base md:text-lg animate-shake">
        {error}
      </div>
    )}
  </div>
</div>

        {todos.map((item, index) => {
          return (
            <div
              key={index}
              className=" flex justify-between items-center sm:text-xl shadow-md "
            >
              <div className="flex text-[14px] h-8 sm:h-9 items-center gap-1 pl-2 rounded-sm flex-1 bg-gray-300 hover:bg-gray-200 duration-500 transition-colors  ">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => todoStatus(item._id)}
                  className="cursor-pointer"
                />
                <span
                  className={`${
                    item.completed && "line-through text-gray-600"
                  } text-gray-800 font-medium pointer-events-none`}
                >
                  {item.text}
                </span>
              </div>
              <div
                onClick={() => todoDelete(item._id)}
                className="flex items-center justify-center gap-1 px-1 md:px-2 text-sm md:text-lg bg-red-600 h-8 sm:h-9 rounded-r-sm font-normal hover:bg-red-700 duration-500 transition-colors cursor-pointer"
              >
                <RiDeleteBin5Fill className="text-sm md:text-[16px] text-white" />Delete
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-[14px] sm:text-[18px] text-gray-500 ">
        {TodoRemaining} todo remaining
      </div>

      <button onClick={logout} className="flex items-center justify-center gap-1 text-lg md:text-xl bg-red-600 p-2 font-normal px-5 mx-auto  rounded-sm hover:bg-red-800 duration-500 transition-colors shadow-lg">
        <RiLogoutBoxFill className="text-lg md:text-xl text-white" /> Logout
      </button>
    </div>
  );
};

export default Home;
