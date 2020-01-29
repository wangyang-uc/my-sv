import React from "react";
import _ from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { validSolution: false };

    this.other = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.row_format = [...props.sudoku_data];
    this.col_format = _.zip(...props.sudoku_data);
    this.grid_format = this.splitIntoGrid(props.sudoku_data);
  }
  splitIntoGrid = sd => {
    let result = [[], [], [], [], [], [], [], [], []];
    let r, c;
    for (r = 0; r < 9; r++) {
      for (c = 0; c < 9; c++) {
        // Calculate grid identifiers
        var gridRow = Math.floor(r / 3);
        var gridCol = Math.floor(c / 3);
        var gridIndex = gridRow * 3 + gridCol;

        // Save each grid in a new row
        result[gridIndex].push(sd[r][c]);
      }
    }
    return result;
  };
  validate = segment => {
    return _.isEqual(segment, this.other);
  };
  componentDidMount() {
    let i;
    let line_result;
    let final_result = true;
    //Exam Row
    for (i = 0; i < 9; i++) {
      line_result = this.validate(this.row_format[i].sort());
      console.log("ROW:", i, line_result);
      final_result = final_result && line_result;
    }
    //Exam Col
    for (i = 0; i < 9; i++) {
      line_result = this.validate(this.col_format[i].sort());
      console.log("COL:", i, line_result);
      final_result = final_result && line_result;
    }
    //Exam Grid
    for (i = 0; i < 9; i++) {
      console.log("Grid:", i, this.validate(this.grid_format[i].sort()));
      final_result = final_result && line_result;
    }
    console.log(final_result);
    this.setState({
      validSolution: final_result
    });
  }
  render() {
    console.log(this.state.validSolution);
    let message = "";
    if (this.state.validSolution) {
      message = "Valid Result";
    } else {
      message = "Invalid Result";
    }

    return (
      <div>
        App
        <br />
        {message}
      </div>
    );
  }
}

export default App;
