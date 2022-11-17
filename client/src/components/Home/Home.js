import { Button, Grid, TextField, Typography } from "@mui/material";
import "../../style.css";
import React from "react";
import { useHome } from "./hooks/useHome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/system";

export const Home = () => {
  const {
    data,
    loading,
    commentsLoading,
    formatTimeStamp,
    idListInput,
    setIdListInput,
    getVideoList,
    selectCommentsToLoad,
    commentsToLoad,
  } = useHome();

  return (
    <>
      <Grid container sx={{ padding: "20px" }}>
        <Grid container item md={3} sx={{ display: "block" }} rowSpacing={4}>
          <Grid item>
            <Grid item xs={12}>
              <Typography variant="h4">Comments parser</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{ display: "block", paddingTop: "8px" }}
              >
                Provide youtube video id list separated by comma:
              </Typography>
              <Box>
                <TextField
                  label="Id list: "
                  value={idListInput}
                  className="input"
                  onChange={(event) => setIdListInput(event.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  className="main-color-bg"
                  onClick={() => getVideoList()}
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid container item sx={{ maxHeight: "200px" }}>
            {!loading && (
              <>
                <Typography variant="h5">Video list</Typography>
                <Grid container item sx={{ width: "80%" }}>
                  {data.data.message.map((video) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        key={video.data.videoId}
                        className="video-list-item"
                        onClick={() => selectCommentsToLoad(video.data.videoId)}
                      >
                        <Box>
                          <Typography>Id: {video.data.videoId}</Typography>
                          <Typography variant="subtitle2">
                            Source: {video.source}
                          </Typography>
                        </Box>
                        <Box>
                          <Button className="no-hover-bg-change">
                            <ArrowForwardIcon />
                          </Button>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          </Grid>
          <Grid container item sx={{ bacground: "red" }}></Grid>
        </Grid>
        <Grid container item md={9}>
          {commentsToLoad.length === 0 ? (
            <>
              <Typography variant="h5">No comments</Typography>
            </>
          ) : (
            <>
              {!commentsLoading && (
                <>
                  <Typography variant="h5">Comments</Typography>
                  {commentsToLoad.map((comment) => {
                    return (
                      <Grid container item key={comment.id} className="comment">
                        <Grid container item>
                          <Grid
                            container
                            item
                            sx={{
                              marginTop: "8px",
                              padding: "8px 16px",
                            }}
                          >
                            <Grid item xs={4}>
                              <Box>
                                <Box>
                                  <Typography className="bold-text">
                                    Author:
                                  </Typography>
                                </Box>
                                <Box>
                                  <Box sx={{ display: "flex" }}>
                                    <Box sx={{ marginRight: "8px" }}>
                                      <img
                                        src={
                                          comment.snippet.topLevelComment
                                            .snippet.authorProfileImageUrl
                                        }
                                        alt="avatar"
                                      />
                                    </Box>
                                    <Typography>
                                      {
                                        comment.snippet.topLevelComment.snippet
                                          .authorDisplayName
                                      }
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box>
                                <Typography className="bold-text">
                                  Date:
                                </Typography>
                              </Box>
                              <Typography>
                                {formatTimeStamp(
                                  comment.snippet.topLevelComment.snippet
                                    .publishedAt
                                )}
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Box>
                                <Typography className="bold-text">
                                  Like count:
                                </Typography>
                              </Box>
                              <Typography>
                                {
                                  comment.snippet.topLevelComment.snippet
                                    .likeCount
                                }
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item sx={{ padding: "8px 16px" }}>
                          <Typography>
                            {
                              comment.snippet.topLevelComment.snippet
                                .textOriginal
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
