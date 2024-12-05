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

const useQueryGetMyBlogs = (pageNumber: Number) => {
  return useQuery({
    queryKey: ["myBlogs", pageNumber],
    queryFn: () => MyBlogsAPI.myblogs(pageNumber),
    placeholderData: keepPreviousData,
  });
};

const useMutationDeleteMyBlog = (pageNumber: Number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MyBlogsAPI.deleteMyBlog(id),
    onSuccess: (data: any, id: string) => {
      queryClient.setQueryData(["myBlogs", pageNumber], (oldMyBlogs: any) => {
        const newMyBlogs: any = oldMyBlogs?.filter(
          (blog: any) => blog._id !== id
        );
        return newMyBlogs;
      });
    },
  });
};

const useMutationUpdateMyBlog = (text: string) => {
  return useMutation({
    mutationFn: (id: string) => MyBlogsAPI.updateBlog(text, id),
    onsuccess: (data: any, id: string) => {},
  });
};

export default {
  useQueryGetMyBlogs,
  useMutationDeleteMyBlog,
  useMutationUpdateMyBlog,
};
