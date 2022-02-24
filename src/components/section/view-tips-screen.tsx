import { makeStyles } from '@material-ui/core';
import React from 'react';

interface CompProp {
    tips: any
}

const useStyles = makeStyles(() => ({
  selected: {
    fontWeight: 'bold',
  },
}));

const ViewTipsScreen: React.FunctionComponent<CompProp> = ({tips}) => {
    const classes = useStyles();

    return (
    <div>
        {tips.map((tip) => {
        const fieldName = `tip${tip.id}`;
        return (<div key={fieldName}>
            <span className={tip?.game.homeTeam?.name === tip?.selectedTip.name ? classes.selected : null}>{tip?.game.homeTeam?.name}</span> - V - <span className={tip?.game.awayTeam?.name === tip?.selectedTip.name ? classes.selected : null}>{tip?.game.awayTeam?.name}</span></div>)
        })}
    </div>
    );
}

export default ViewTipsScreen;