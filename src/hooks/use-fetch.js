// import { useSession } from "@clerk/clerk-react";
// import { useState } from "react";

// const useFetch = (cb, options = {}) => {
//   const [data, setData] = useState(undefined);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const { session } = useSession();

//   const fn = async (...args) => {
//     setLoading(true);
//     setError(null);

//     try {
//       let token = null;

//       // Only fetch token if required (default is true)
//       if (options.requireAuth !== false) {
//         if (!session) throw new Error("Session not available");
//         token = await session.getToken({ template: "supabase" });
//       }

//       const response = await cb(token, options, ...args);
//       setData(response);
//       return response;
//     } catch (error) {
//       setError(error);
//       console.error("useFetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, fn };
// };

// export default useFetch;







// update for edit 

import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      let token = null;

      // Only fetch token if required (default is true)
      if (options.requireAuth !== false) {
        if (!session) throw new Error("Session not available");
        token = await session.getToken({ template: "supabase" });
      }

      // Pass token only if required, otherwise call the function without it
      const response = options.requireAuth === false
        ? await cb(...args)
        : await cb(token, options, ...args);

      setData(response);
      return response;
    } catch (error) {
      setError(error);
      console.error("useFetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
