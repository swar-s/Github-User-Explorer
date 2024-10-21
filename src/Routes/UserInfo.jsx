import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import Repo from "../components/Repo";
import Events from "../components/Events";
import UsersContainer from "../components/UsersContainer";
import Loading from "../components/Loading";

const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [type, setType] = useState("repos");
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(null);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let BaseURL = "https://api.github.com/users";

  const token = import.meta.env.VITE_GITHUB_API_TOKEN;

  async function checkRateLimit() {
    const res = await fetch("https://api.github.com/rate_limit", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await res.json();
    const remaining = data.rate.remaining;
    if (remaining === 0) {
      setRateLimitExceeded(true);
    }
  }

  async function GetUserInfo() {
    setLoading(true);
    await checkRateLimit();
    if (rateLimitExceeded) return;

    const res = await fetch(BaseURL + pathname, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await res.json();
    setUser(() => [data]);
    setLoading(null);
  }

  async function GetUrls() {
    setUser([]);
    setLoading(true);
    await checkRateLimit();
    if (rateLimitExceeded) return;

    const res = await fetch(BaseURL + pathname + `/${type}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await res.json();
    setInfos(data);
    setLoading(null);
  }

  useEffect(() => {
    GetUserInfo();
    GetUrls();
    console.log(user);
    console.log(type);
  }, [pathname, type]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-700 rounded text-gray-200"
      >
        Back
      </button>
      {rateLimitExceeded ? (
        <p className="text-red-600">
          API rate limit exceeded. Please try again later.
        </p>
      ) : (
        user?.map((uinfo, i) => (
          <div
            key={i}
            className="flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10"
          >
            <img
              src={uinfo?.avatar_url}
              className="w-[250px] border-4 border-teal-600 md:mx-0 mx-auto rounded-full"
            />
            <div className="leading-8">
              <h2 className="text-3xl pb-4">{uinfo?.name}</h2>
              <h2>
                <span className="text-teal-500 font-medium">Login Name: </span>{" "}
                {uinfo?.login}
              </h2>
              <h2>
                <span className="text-teal-500 font-medium">Followers: </span>{" "}
                {uinfo?.followers}
              </h2>
              <h2>
                <span className="text-teal-500 font-medium">Following: </span>{" "}
                {uinfo?.following}
              </h2>
              <h2>
                <span className="text-teal-500 font-medium">
                  Public Repositories:{" "}
                </span>{" "}
                {uinfo?.public_repos}
              </h2>
              <h2>
                <span className="text-teal-500 font-medium">Joined on: </span>{" "}
                {new Date(uinfo?.created_at).toLocaleDateString()}
              </h2>
              <a
                href={uinfo?.html_url}
                target="_blank"
                className="text-gray-300 font-semibold rounded px-4 py-1 bg-teal-600 my-3 tracking-wide hover:text-gray-600"
              >
                Visit
              </a>
            </div>
          </div>
        ))
      )}
      <div className="flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-lg">
        <Tabs type={type} setType={setType} />
      </div>
      {loading && <Loading />}
      {type === "repos" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          { infos && <Repo repos ={infos} />}
        </div>
      )}
      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          {infos && <Events events = {infos}/>}
        </div>
      )}
      {type === "followers" && (
        <div>
          <UsersContainer users={infos} />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
