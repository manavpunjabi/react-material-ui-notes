import PropTypes from "prop-types";
import React from "react";
import {
  Card,
  Avatar,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { blue, green, pink, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
   backgroundColor:({category})=>{
     console.log('category :>> ', category);
     if(category===`work`){
       return yellow[700]
     }
     if(category===`money`){
      return green[500]
    }
    if(category===`work`){
      return pink[500]
    }
    return blue[500]
   }
  },
});

const NoteCard = ({ note: { id, title, details, category }, handleDelete }) => {
  const classes = useStyles({category});
  return (
    <Card elevation={3} className={classes.test}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{category[0].toUpperCase()}</Avatar>}
        action={
          <IconButton onClick={() => handleDelete(id)}>
            <DeleteOutlined />
          </IconButton>
        }
        title={title}
        subheader={category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {details}
        </Typography>
      </CardContent>
    </Card>
  );
};

NoteCard.propTypes = {
  handleDelete: PropTypes.func,
};

export default NoteCard;
