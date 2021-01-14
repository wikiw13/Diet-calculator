import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    width: "30%",
    margin: "auto",
  },
  tableContainer: {
    boxShadow: "none",
  },
});

interface BasicTableProps {
  activity: string,
  goal: string,
  totalCalories: number
}

export default function BasicTable(props: BasicTableProps) {
  const {activity, goal, totalCalories} = props;
  const classes = useStyles();

  let activityText = '';
  if (activity === 'high') {
    activityText = 'High - physical work / 4-5 workouts during week'
  } else if (activity === 'low') {
    activityText = 'Low - sedentary lifestyle with low physical activity'
  } else {
    activityText = 'Normal - standing work / 2-3 workouts during week';
  }

  let goalText = '';
  if (goal === 'loose') {
    goalText = 'Loose weight'
  } else if (goal === 'gain') {
    goalText = 'Gain weight / muscle mass'
  } else {
    goalText = 'Healthy eating / weight maintenance';
  }

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>Activity</TableCell>
            <TableCell align="center">{activityText}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Goal</TableCell>
            <TableCell align="center">{goalText}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total calories</TableCell>
            <TableCell align="center">{totalCalories} kcal</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
