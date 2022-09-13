import { Avatar, CardHeader, Grid, makeStyles } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ITip } from '../../models/tip.model';

interface CompProp {
  tips: ITip[];
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    alignItems: 'center',
    Typography: {
      padding: '20px',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  tips: {
    padding: '5px',
  },
  selected: {
    fontWeight: 'bold',
  },
  correct: {
    fontWeight: 'bold',
    color: 'green',
  },
}));

const randomColour = () => {
  const hex = Math.floor(Math.random() * 0xffffff);
  const color = '#' + hex.toString(16);
  return color;
};

const ViewTipsScreen = ({ tips }: CompProp) => {
  const classes = useStyles();
  const sortedTips = tips.sort((a, b) => b.startDateTime.getTime() - a.startDateTime.getTime())
  const userTips = sortedTips.reduce<Record<string, ITip[]>>((acc, curr) => {
    if (!acc[curr.user.username]) acc[curr.user.username] = []
    acc[curr.user.username] = [...acc[curr.user.username], curr]
    return acc;
  }, {})
  const keys = Object.keys(userTips);

  const correct = (tip: any, fieldId: string) => {
    if (tip.game.result && tip.game.result.id) {
      return fieldId === tip.selectedTip.id && tip.game.result.id === tip.selectedTip.id;
    }
  };

  return (
    <Grid container justifyContent="center" spacing={3}>
      {keys.map((key, index) => {
        const fieldName = key;
        return (
          <Grid key={fieldName + index} item xs={8}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: randomColour(),
                    }}
                  >
                    {key.slice(0, 1)}
                  </Avatar>
                }
                titleTypographyProps={{ variant: 'body1' }}
                title={key}
              ></CardHeader>
              <CardContent className={classes.content}>
                {userTips[key].map((tip) => {
                  const fieldName = `tip${tip.id}`;
                  return (
                    <Typography variant="body2" key={fieldName} gutterBottom>
                      <span
                        className={
                          correct(tip, tip?.game.homeTeam?.id || '')
                            ? classes.correct
                            : tip?.game.homeTeam?.name === tip?.selectedTip.name
                              ? classes.selected
                              : undefined
                        }
                      >
                        {tip?.game.homeTeam?.name}
                      </span>{' '}
                      - V -{' '}
                      <span
                        className={
                          correct(tip, tip?.game.awayTeam?.id || '')
                            ? classes.correct
                            : tip?.game.awayTeam?.name === tip?.selectedTip.name
                              ? classes.selected
                              : undefined
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
  );
};

export default ViewTipsScreen;
