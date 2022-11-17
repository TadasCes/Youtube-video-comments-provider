import { useState } from "react";
import { useGetVideoComments } from "../../../hooks/useGetVideoComments";

export const useHome = () => {
  const [idListInput, setIdListInput] = useState("");
  const [idListFormated, setIdListFormated] = useState([]);
  const [commentsToLoad, setCommentsToLoad] = useState({});
  const [commentsLoading, setCommentsLoading] = useState(true);

  const { getVideoDataQueryProps } = useGetVideoComments(idListFormated);

  const formatTimeStamp = (timestamp) => {
    return timestamp.split("T").join(" ").slice(0, -1);
  };

  const getVideoList = async () => {
    await FormatedIdList(idListInput).then(() => {
      getVideoDataQueryProps.refetch();
    });
  };

  const FormatedIdList = async (idList) => {
    const list = idList.split(",");
    const formatedList = [];
    list.forEach((item) => {
      formatedList.push(item.trim());
    });
    setIdListFormated(formatedList);
  };

  const selectCommentsToLoad = (videoId) => {
    setCommentsLoading(true);

    getVideoDataQueryProps.data.data.message.forEach((video) => {
      if (videoId === video.data.videoId) {
        setCommentsToLoad(video.data.comments);
        return;
      }
    });
    setCommentsLoading(false);
  };

  return {
    data: getVideoDataQueryProps.data,
    fetching: getVideoDataQueryProps.isFetching,
    loading: getVideoDataQueryProps.isLoading,
    formatTimeStamp,
    idListInput,
    setIdListInput,
    getVideoList,
    idListDisplay: idListFormated,
    selectCommentsToLoad,
    commentsToLoad,
    commentsLoading,
  };
};
