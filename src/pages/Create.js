import React, { useState } from "react";
import {
  Typography,
  Button,
  ButtonGroup,
  Container,
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import { AcUnitOutlined, Send, KeyboardArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  field: { marginTop: 20, marginBottom: 20, display: "block" },
});

export default function Create() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState(`todos`);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (!title) setTitleError(true);

    if (!details) setDetailsError(true);
    if (title && details && category) {
      fetch(`http://localhost:8000/notes`, {
        method: `POST`,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push(`/`));
    }
  };
  const classes = useStyles();
  return (
    <Container>
      <Typography
        className={classes.title}
        color="textSecondary"
        variant="h6"
        component="h2"
        gutterBottom
      >
        Create a new Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Note Details"
          multiline
          rows={4}
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel control={<Radio />} value="money" label="Money" />
            <FormControlLabel control={<Radio />} value="todos" label="Todos" />
            <FormControlLabel
              control={<Radio />}
              value="reminders"
              label="Reminders"
            />
            <FormControlLabel control={<Radio />} value="work" label="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="secondary"
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
