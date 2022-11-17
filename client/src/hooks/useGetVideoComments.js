import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbars } from "./useSnacbars";

export const useGetVideoComments = (idList) => {
  const { errorSnackbar } = useSnackbars();

  const { ...queryProps } = useQuery(
    ["getVideoData"],
    () =>
      axios
        .post(`http://localhost:5000/video/`, {
          idList: idList,
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          errorSnackbar(err);
        }),
    {
      enabled: false,
    }
  );

  return { getVideoDataQueryProps: { ...queryProps } };
};
