import { useQuery } from "@tanstack/react-query";
import { ProfileAPI } from "..";

const useQueryGetprofile = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: () => ProfileAPI.getprofile(),
  });
};

export default {
  useQueryGetprofile,
};
