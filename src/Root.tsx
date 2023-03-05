import * as React from "react";
import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Search Params Example</h1>

      <p>
        This example demonstrates a simple search page that makes a request for
        user data to the GitHub API and displays information for that user on
        the page. The example uses the <code>useSearchParams()</code> hook to
        read and write the URL query string.
      </p>

      <Routes>
        <Route path="/:test" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function randomUser() {
  let users = ["chaance", "jacob-ebey", "mcansh", "mjackson", "ryanflorence"];
  return users[Math.floor(Math.random() * users.length)];
}

function Home() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [searchParams2, setSearchParams2] = useSearchParams();


  let { test } = useParams<string>();

console.log('testaaaaaaaaaaa', test)
  // searchParams is a URLSearchParams object.
  // See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  
  

 

  let user = searchParams.get("user");
  let summoner = searchParams.get("summoner"); //asdddddddddddddddddddddddddd


  console.log(summoner);

  let [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    let abortController = new AbortController();
 
    async function getGitHubUser() {
      let response = await fetch(`https://api.github.com/users/${test}`, {
        signal: abortController.signal,
      });
      if (!abortController.signal.aborted) {
        let data = await response.json();
        setUserData(data);
        console.log(data)
      }
    }

    if (user) {
      getGitHubUser();
    }

    return () => {
      abortController.abort();
    };
  }, [user, summoner, test]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let newUser = formData.get("user") as string;
    if (!newUser) return;
    setSearchParams({ user: newUser });
  }

  function handleRandomSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let newUser = randomUser();
    // our new random user is the same as our current one, let's try again
    if (newUser === user) {
      handleRandomSubmit(event);
    } else {
      setSearchParams({ user: newUser });
    }
  }

  return (
    <div>
      <div className="flex flex-col my-[40px] items-center">
        <form onSubmit={handleSubmit} className="mb-4">
          <label>
            <input defaultValue={user ?? undefined} type="text" name="user" className="shadow border py-1 px-4" />
          </label>
          <button type="submit" className="border bg-black text-white py-1 px-4">Search</button>
        </form>
        <form onSubmit={handleRandomSubmit}>
          <input type="hidden" name="random" />
          <button type="submit" className="border bg-black text-white py-1 px-4 rounded-2xl">Random</button>
        </form>
        <button onClick={() => setSearchParams2({summoner: 'Alis123'})} type="submit" className="border bg-black text-white py-1 px-4 rounded-2xl">Sum</button>
      </div>

      {userData && (
        <div
          style={{
            padding: "24px",
            margin: "24px 0",
            borderTop: "1px solid #eaeaea",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <img
            style={{ borderRadius: "50%" }}
            width={200}
            height={200}
            src={userData.avatar_url}
            alt={userData.login}
          />
          <div>
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}