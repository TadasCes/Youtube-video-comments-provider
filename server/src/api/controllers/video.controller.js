import mongoose from "mongoose";
import Video from "../models/video.model.js";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

async function getVideoList(idList) {
  const videoIdList = idList.idList;

  return await findVideoList(videoIdList)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function findVideoList(videoIdList) {
  const results = [];

  for (const id of videoIdList) {
    const videoData = await getVideoData(id);
    results.push(videoData);
  }
  return results;
}

async function getVideoData(videoId) {
  return await Video.findOne({ videoId: videoId })
    .then(async (data) => {
      if (!data) {
        return await createVideoEntry(videoId).then((response) => {
          return {
            source: "youtube",
            data: response,
          };
        });
      } else {
        if (isLastSearchOlderThan24h(data.latestSearch)) {
          return await getYoutubeVideoById(videoId).then((response) => {
            return { source: "youtube", data: response };
          });
        } else {
          return await updateVideoLatestSearchTime(videoId)
            .then((response) => {
              return { source: "database", data: response };
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    })
    .catch((err) => {
      return err;
    });
}

async function updateVideoLatestSearchTime(videoId) {
  const query = { videoId: videoId };
  return await Video.findOneAndUpdate(query, { latestSearch: new Date() }).then(
    (res) => {
      return res;
    }
  );
}

async function createVideoEntry(videoId) {
  const videoComments = await getYoutubeVideoById(videoId);
  const newVideo = new Video({
    videoId: videoId,
    firstSearch: new Date(),
    latestSearch: new Date(),
    comments: videoComments.items,
  });
  return await Video.create(newVideo).then((response) => {
    return response;
  });
}

async function getYoutubeVideoById(id) {
  const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=20&videoId=${id}&key=${process.env.API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

function isLastSearchOlderThan24h(lastSearch) {
  const date = new Date(new Date() - 24 * 60 * 60 * 1000);
  return lastSearch > date ? false : true;
}

export { getVideoList };
