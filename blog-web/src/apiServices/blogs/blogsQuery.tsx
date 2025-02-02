import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { BlogsAPI } from "..";

const useQueryreadBlogs = (pageNumber: number) => {
  return useQuery({
    queryKey: ["blogs", pageNumber],
    queryFn: () => BlogsAPI.readBlogs(pageNumber),
    placeholderData: keepPreviousData,
  });
};

const useMutationCreateBlog = (blogTitle: string, blogInput: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => BlogsAPI.createBlog(blogTitle, blogInput),
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });
};

export default {
  useQueryreadBlogs,
  useMutationCreateBlog,
};
