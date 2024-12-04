import React ,{useState}from "react";
// import { readBlogs } from "../../apiServices/blogs/readBlogs";
import { BlogsQuery } from "../../apiServices";

export default function ShowBlogs() {


  const [page, setpage] = useState <number>(0);
  type Data = {
    data: any;
    isPending: boolean;
    isError?: any;
    error?: any;
  };


  const { data, isPending, isError, error }: Data =BlogsQuery.useQueryreadBlogs(page)
  // console.log(data, 24);



  
  return (
    <div className="h-1/2">
      {isPending && <h1>Loading....</h1>}
      {isError && <h1>error:{error.message}</h1>}
      {data?.map((ele:any, index:number) => (
        <div
          key={index}
          className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg  my-4 w-screen"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {ele.title}
            </h2>
            <p className="text-gray-600 text-base">{ele.textbody}</p>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-1">
        <button
          disabled={page === 0 ? true : false}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
          onClick={() => setpage((prev) => prev - 2)}
        >
          Prev
        </button>
        <h2>{page / 2}</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setpage((prev) => prev + 2)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
