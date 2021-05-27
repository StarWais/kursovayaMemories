import { useState, useContext, useEffect } from 'react';
import {
  Paper,
  Grid,
  Slider,
  Checkbox,
  FormControl,
  FormLabel,
  TextField,
  ButtonGroup,
  Button,
  FormGroup,
  FormControlLabel,
  IconButton,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import styles from './style';
import clsx from 'clsx';
import { GlobalContext } from '../../ContextProvider';

export default function FilterPanel() {
  const classes = styles();
  const [withLikes, setWithLikes] = useState(false);
  const [withComments, setWithComments] = useState(false);
  const [expand, setExpand] = useState(false);
  const { getPostsData, maxLikesCount } = useContext(GlobalContext);
  const [commentor, setCommentor] = useState('');
  const [liker, setLiker] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [commentorError, setCommentorError] = useState(false);
  const [commentTextError, setCommentTextError] = useState(false);
  const [likerError, setLikerError] = useState(false);

  const handleFilteredPosts = () => {
    if (!withComments && !withLikes) {
      getPostsData();
      return;
    }
    getPostsData({
      withLikes,
      withComments,
      commentor,
      liker,
      commentText,
      likesCount,
    });
  };

  const handleSliderChange = (event, newValue) => {
    setLikesCount(newValue);
  };
  const undoFiltredData = () => {
    setWithLikes(false);
    setCommentor('');
    setCommentText('');
    setLiker('');
    setCommentorError(false);
    setLikerError(false);
    setCommentTextError(false);
    setWithComments(false);
    getPostsData();
  };
  return (
    <Paper
      className={
        expand
          ? classes.filterPaper
          : clsx(classes.filterPaperNotExpanded, classes.filterPaper)
      }
    >
      {expand && (
        <Grid container direction="column">
          <Grid
            item
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">Likes and Comments</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={withLikes}
                        onChange={() => setWithLikes(!withLikes)}
                        name="likes"
                      />
                    }
                    label="With Likes"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={withComments}
                        onChange={() => setWithComments(!withComments)}
                        name="comments"
                      />
                    }
                    label="With Comments"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">Comments</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <TextField
                        label="Commentor"
                        disabled={!withComments}
                        value={commentor}
                        error={commentorError}
                        onChange={(e) => {
                          if (e.target.value > 10) {
                            setCommentorError(true);
                            return;
                          } else {
                            setCommentorError(false);
                            setCommentor(e.target.value);
                          }
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    control={
                      <TextField
                        label="Comment text"
                        disabled={!withComments}
                        value={commentText}
                        error={commentTextError}
                        onChange={(e) => {
                          if (e.target.value > 10) {
                            setCommentTextError(true);
                            return;
                          } else {
                            setCommentTextError(false);
                            setCommentText(e.target.value);
                          }
                        }}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">Likes</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <TextField
                        label="Liker"
                        disabled={!withLikes}
                        value={liker}
                        error={likerError}
                        onChange={(e) => {
                          if (e.target.value > 10) {
                            setLikerError(true);
                            return;
                          } else {
                            setLikerError(false);
                            setLiker(e.target.value);
                          }
                        }}
                      />
                    }
                  />

                  <Slider
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                    min={1}
                    value={likesCount}
                    onChange={handleSliderChange}
                    disabled={!withLikes}
                    max={maxLikesCount}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" justify="center">
            <ButtonGroup style={{ marginTop: '1rem' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFilteredPosts}
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={undoFiltredData}
              >
                Undo
              </Button>
            </ButtonGroup>
            <IconButton
              onClick={() => setExpand(false)}
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            >
              <ExpandLessIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
      {!expand && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setExpand(true)}
        >
          SHOW FILTERS
        </Button>
      )}
    </Paper>
  );
}
