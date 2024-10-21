import React, { useEffect, useState } from "react";

const RateLimitChecker = () => {
  const [rateLimit, setRateLimit] = useState(null);
  const [remainingRequests, setRemainingRequests] = useState(null);

  const token = import.meta.env.VITE_GITHUB_API_TOKEN;

  async function checkRateLimit() {
    const res = await fetch("https://api.github.com/rate_limit", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await res.json();
    setRateLimit(data.rate);
    setRemainingRequests(data.rate.remaining);
  }

  useEffect(() => {
    checkRateLimit();
  }, []);

  return (
    <div className="text-white text-sm flex justify-center items-center">
      {rateLimit ? (
        <div className="flex gap-5 m-3">
          <p>© Swarup Suryawanshi</p>
          <p>Remaining Requests: {remainingRequests}</p>
          <p>Limit: {rateLimit.limit}</p>
          <p>Reset Time: {new Date(rateLimit.reset * 1000).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p>Loading rate limit info...</p>
      )}
    </div>
  );
};

export default RateLimitChecker;
