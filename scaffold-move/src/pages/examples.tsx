import { useEffect, useState } from "react";
import { NextPage } from "next";
import "../app/globals.css";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  github: string;
  tags: string[];
  if_bodhi: boolean;
  if_gpt: boolean;
  author: {
    twitter: string;
  };
}

const Examples: NextPage = () => {
  const [filtedProjects, setFiltedProjects] = useState<Project[]>([]);
  const init = async () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const tag = queryParameters.get("tag");
    const response = await fetch("https://scaffold-aptos.deno.dev/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "no-cors",
    });
    const data = await response.json();
    console.log(`data: ${JSON.stringify(data)}`);
    setFiltedProjects(data);
    if (tag == "bodhi") {
      const filtedProj = data.filter((elem: Project) => elem.if_bodhi == true);
      console.log(filtedProj);
      setFiltedProjects(filtedProj);
    }
    if (tag == "gpt") {
      const filtedProj = data.filter((elem: Project) => elem.if_gpt == true);
      console.log(filtedProj);
      setFiltedProjects(filtedProj);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="grid lg:grid-cols-1 flex-grow">
      <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      {/* <div className="hero min-h-screen bg-base-200 bg-gradient-to-r from-green-500 to-blue-500"> */}
        <div className="hero-content text-center">
          <div className="max-w-screen-xl">
            <h1 className="text-2xl font-bold">🏝️ Scaffold-Aptos Examples 🏝️</h1>
            <p className="py-6"> -- See the AwEsOMe Examples of scaffold-move!
            </p>
            <div className="join mb-6">
              <div className="grid gap-5 mt-5 md:grid-cols-1 lg:grid-cols-1">
                {filtedProjects.map(({ id, name, description, url, github, tags, author}) => (
                  <div
                    key={id}
                    className="w-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                  {/* TODO: make width more */}
                    <div className="p-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-y-auto">
                        {description}
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32"
                      >
                        🚀Launch App
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <a
                        href={github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32"
                      >
                        🌎Github
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <a
                        href={author.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32"
                      >
                        👀Author
                      </a>
                      
                      <br></br>
                      <br></br>
                      <div>
                        <b>Tags: </b>
                        {tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 text-xs font-semibold leading-none text-white bg-orange-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
