import { useState } from "react";
import { MyBlogsQuery } from "../../../apiServices";
import myBlogsQuery from "../../../apiServices/blogs/myBlogs/myBlogsQuery";
import Button from "../../../components/Button";
export const MyBlogs = () => {
  const [pageNumber, setpage] = useState<number>(0);
  const [newtext, setnewText] = useState("");
  const { data, isPending }:any = MyBlogsQuery.useQueryGetMyBlogs(pageNumber);
  const deletemutation = MyBlogsQuery.useMutationDeleteMyBlog(pageNumber);
  const updateMutation = myBlogsQuery.useMutationUpdateMyBlog(
    newtext,
    pageNumber
  );

  // console.log(data,isPending);
  return (
    <div className="h-[90h] overflow-scroll w-[87vw]">
      {isPending ? (
        <h3>loading....</h3>
      ) : (
        data?.map((ele: any) => (
          <div
            key={ele._id}
            className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg  my-4 w-70vw"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {ele.title}
              </h2>
              <p
                className="text-gray-600 text-base"
                id={`${ele._id}`}
                onInput={(e) => {
                  setnewText(e.target.textContent);
                }}
              >
                {ele.textbody}
              </p>
            </div>
            <div className="flex justify-between  px-12">
              <Button>
                {" "}
                <button
                  onClick={(e) => {
                    let textele = document.getElementById(`${ele._id}`);
                    textele?.setAttribute("contentEditable", "true");
                    textele?.focus();
                  }}
                >
                  edit
                </button>
              </Button>

              <Button>
                <button
                  onClick={() => {
                    updateMutation.mutate(ele._id);
                    let textele = document.getElementById(`${ele._id}`);
                    textele?.setAttribute("contentEditable", "false");
                  }}
                >
                  Save
                </button>
              </Button>

              <Button>
                {" "}
                <button
                  onClick={() => {
                    deletemutation.mutate(ele._id);
                  }}
                >
                  delete
                </button>
              </Button>
            </div>
          </div>
        ))
      )}
      <div className="flex items-center gap-1">
        <button
          disabled={pageNumber === 0 ? true : false}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
          onClick={() => setpage((prev) => prev - 2)}
        >
          Prev
        </button>

        <h2>{pageNumber / 2}</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setpage((prev) => prev + 2)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
