import React, { useEffect, useRef, useState } from "react";
import UsersContainer from "../components/UsersContainer";
import Loading from "../components/Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  let BaseURL = "https://api.github.com/users";
  const user = useRef("");

  const token = import.meta.env.VITE_GITHUB_API_TOKEN;

  async function checkRateLimit(){
    const res = await fetch("https://api.github.com/rate_limit",{
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await res.json();
    const remaining = data.rate.remaining;
    if(remaining === 0){
      setRateLimitExceeded(true);
    }
  }

  async function AllUsers() {
    await checkRateLimit();
    if (rateLimitExceeded) return;
    
    if (user.current.value === "") {
      setLoading(true);
      const res = await fetch(BaseURL,{
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
      setLoading(null);
      
    }
  }

  async function FindUser() {
    await checkRateLimit();
    if (rateLimitExceeded) return;

    setLoading(true);

    if (user.current.value !== "") {
      setUsers("");
      const res = await fetch(BaseURL + "/" + user.current.value, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const data = await res.json();
      setUsers(() => [data]);
      user.current.value = "";
    } else {
      AllUsers();
    }
    setLoading(null);
  }

  useEffect(() => {
    AllUsers();
  }, [setUsers]);
  return (
    <div>
      <div className="flex justify-center items-center h-11 my-5">
        <input
          type="text"
          placeholder="Search Github Username"
          className="h-full md:w-1/3 w-2/3 text-gray-900 px-2 font-semibold outline-none bg-gray-100 rounded-lg"
          ref={user}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              FindUser();
            }
          }}
        />
        <button
          onClick={FindUser}
          className="bg-teal-800 font-semibold px-4 h-full ml-3"
        >
          Search
        </button>
      </div>
      {rateLimitExceeded ? (
        <p className="text-red-600">API rate limit exceeded. Please try again later.</p>
      ) : loading ? (
        <Loading />
      ) : (
        <UsersContainer users={users} />
      )}
      
    </div>
  );
};

export default Users;
