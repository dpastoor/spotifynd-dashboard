/**
 * Created by devin on 1/11/16.
 */
import React from 'react';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const items = [];
for (let i = 0; i < 10; i++ ) {
  items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`}/>);
}

export default class NumberItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 10};
  }

  handleChange = (e, index, value) => this.setState({value});

  render() {
    return (
      <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange}>
        {items}
      </DropDownMenu>
    );
  }
}