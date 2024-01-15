import { Suspense, useState } from "react";
import {
  Await,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import getRandomInt from "@/helpers/getRandomInt";
import SearchParamsCache from "@/helpers/SearchParamsCache";

import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import "./root.css";

function Root() {
  const [countInSync, setCountInSync] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { slowCount, fastCount } = useLoaderData() as RootData;
  const { state } = useNavigation();

  const handleUpdateSearchParam = (
    key: keyof RootData,
    value: string
  ): void => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Suspense fallback={<button>loading slow count...</button>}>
          <Await
            resolve={slowCount}
            errorElement={<>error...</>}
            children={(resolvedSlowCount: Awaited<RootData["slowCount"]>) => {
              SearchParamsCache.set("slowCount", resolvedSlowCount);

              return (
                <button
                  onClick={() =>
                    handleUpdateSearchParam("slowCount", `${getRandomInt(100)}`)
                  }
                >
                  slow count is {resolvedSlowCount}
                </button>
              );
            }}
          />
        </Suspense>
        <button
          onClick={() =>
            handleUpdateSearchParam("fastCount", `${getRandomInt(100)}`)
          }
        >
          {state === "loading"
            ? "loading fast count"
            : `fast count is ${fastCount}`}
        </button>
        <button onClick={() => setCountInSync((prev) => (prev += 1))}>
          count in sync is {countInSync}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Root;
