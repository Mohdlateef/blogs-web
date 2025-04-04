import {
  keepPreviousData,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { MyBlogsAPI } from "../..";

type Data = {
  data: any;
  isPending: boolean;
};

const useQueryGetMyBlogs = (pageNumber: number) => {
  return useQuery({
    queryKey: ["myBlogs", pageNumber],
    queryFn: () => MyBlogsAPI.myblogs(pageNumber),
    placeholderData: keepPreviousData,
  });
};

const useMutationDeleteMyBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MyBlogsAPI.deleteMyBlog(id),
    onSuccess: (data: any, id: string) => {
      // queryClient.invalidateQueries("myBlogs")
      // queryClient.setQueryData(["myBlogs", pageNumber], (oldMyBlogs: any) => {
      //   const newMyBlogs: any = oldMyBlogs?.filter(
      //     (blog: any) => blog._id !== id
      //   );
      //   return newMyBlogs;
      // });
    },
  });
};

const useMutationUpdateMyBlog = (text: string) => {
  return useMutation({
    mutationFn: (id: string) => MyBlogsAPI.updateBlog(text, id),
  });
};

export default {
  useQueryGetMyBlogs,
  useMutationDeleteMyBlog,
  useMutationUpdateMyBlog,
};
