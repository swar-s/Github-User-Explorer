import React from "react";
import { Link } from "react-router-dom";

const UsersContainer = ({ users }) => {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {users &&
        users.map(
          (user, index) =>
            user?.login && (
              <div
                key={index}
                className="mt-3 flex w-[200px] border rounded-lg border-gray-400 bg-gray-900 p-3 flex-col items-center"
              >
                <img
                  src={user?.avatar_url}
                  className="w-24 mb-4 border-2 border-gray-300 rounded-3xl"
                />
                <h2 className="m-0 text-2xl">{user?.login}</h2>
                <Link to={`/${user?.login}`}>
                  <span className="text-gray-200 bg-teal-700 my-3 font-semibold block py-1 px-4 tracking-wide rounded-lg">
                    View
                  </span>
                </Link>
              </div>
            )
        )}
    </div>
  );
};

export default UsersContainer;
