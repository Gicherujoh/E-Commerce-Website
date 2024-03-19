import React from 'react';
import MyRating from '@material-ui/lab/Rating';

function Rating(props) {
  const [value, setValue] = React.useState(0);

  return (
    <Rating
      name="customized-1"
      value={props.value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
}
export default MyRating;