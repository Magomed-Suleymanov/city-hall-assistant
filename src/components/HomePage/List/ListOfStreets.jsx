import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { LoadModalList } from '../../../redux/actions/application';
import { CircularProgress, Grid } from '@material-ui/core';
import { loadingAppeals } from '../../../redux/actions/appeals';

const useStyle = makeStyles(() => ({
  wrapList: {
    borderRadius: '5px',
    width: '500px',
    background: '#fdfcf9',
    margin: ' 20px 25px 0px 25px',
    boxShadow: '0px 0px 4px 2px rgb(217, 217, 217)',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.04)',
      transition: '.1s',
    },
  },
  loading: {
    position: 'absolute',
    left: 'calc(50% - 60px)',
    color: 'red',
    top: '40%',
  },
}));

function ListOfStreets() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.application.items);
  const loading = useSelector((state) => state.application.loadingItems);

  useEffect(() => {
    dispatch(loadingAppeals());
  }, [dispatch]);

  const classes = useStyle();

  return (
    <Box>
      {loading ? (
        <Box className={classes.loading}>
          <CircularProgress color="secondary" />
          <CircularProgress />
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        list.map((itemStreet) => {
          return (
            <Box
              key={itemStreet.id}
              className={classes.wrapList}
              onClick={() => dispatch(LoadModalList(itemStreet.id))}
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Box display="flex" marginRight="15px" alignItems="center">
                  <img
                    alt="Img"
                    width="120px"
                    height="100px"
                    style={{ borderRadius: '5px' }}
                    src={itemStreet.url}
                  />
                </Box>
                <Box fontSize="16px" padding="5px 0" color="black">
                  {itemStreet.address}
                </Box>
              </Grid>
            </Box>
          );
        })
      )}
    </Box>
  );
}

export default ListOfStreets;
