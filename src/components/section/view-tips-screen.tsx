import { Box, Grid, makeStyles } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

interface CompProp {
  tips: any;
}

const useStyles = makeStyles(() => ({
  selected: {
    fontWeight: 'bold',
  },
  correct: {
    fontWeight: 'bold',
    color: 'green',
  },
}));

const ViewTipsScreen: React.FunctionComponent<CompProp> = ({ tips }) => {
  const classes = useStyles();
  const sortedTips = _.orderBy(tips, 'game.startDateTime');
  const userTips = _.groupBy(sortedTips, 'user.username');
  const keys = Object.keys(userTips);

  const correct = (tip, fieldId) => {
    if (tip.game.result && tip.game.result.id) {
      return fieldId === tip.selectedTip.id && tip.game.result.id === tip.selectedTip.id;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {keys.map((key, index) => {
          const fieldName = key;
          return (
            <Grid key={fieldName + index} item xs={8}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{key}</Typography>
                  {userTips[key].map((tip) => {
                    const fieldName = `tip${tip.id}`;
                    return (
                      <Typography variant="body2" key={fieldName}>
                        <span
                          className={
                            correct(tip, tip?.game.homeTeam?.id)
                              ? classes.correct
                              : tip?.game.homeTeam?.name === tip?.selectedTip.name
                              ? classes.selected
                              : null
                          }
                        >
                          {tip?.game.homeTeam?.name}
                        </span>{' '}
                        - V -{' '}
                        <span
                          className={
                            correct(tip, tip?.game.awayTeam?.id)
                              ? classes.correct
                              : tip?.game.awayTeam?.name === tip?.selectedTip.name
                              ? classes.selected
                              : null
                          }
                        >
                          {tip?.game.awayTeam?.name}
                        </span>
                      </Typography>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ViewTipsScreen;
