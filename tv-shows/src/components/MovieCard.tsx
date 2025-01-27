import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Rating } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  })
}));

export default function MovieCard(props) {
  
  const tvShow = props.tvShow;
  const handleExpandClick = (name: string) => {
   props.handleExpandClick(name);
  };

  return (
    <Card sx={{ maxWidth: 250 }}  style={{ cursor:'pointer'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            G
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{
          fontSize: 16,
          fontWeight:'bold'
        }}
        title={tvShow.name}
        subheader=""
        onClick={()=>handleExpandClick(tvShow.name)}
      />
      <CardMedia
        style={{ width:'100%'}}
        component="img"
        
        image={tvShow.imageThumbnail}
        alt="Movie Poster"
        onClick={()=>handleExpandClick(tvShow.name)}
      />
      
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        
        <IconButton aria-label="rating">
          <Rating /> 
        </IconButton>
        {tvShow.rating}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
      
    </Card>
  );
}
