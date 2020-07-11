import React from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react'

class App extends React.Component {

  state = {
    values: [{id: 1, name: 'Waleed'}, {id: 2, name: 'Bheen'}]
  };

  componentDidMount() {
    axios.get('http://localhost:5000/api/values')
      .then(res => this.setState({
        values: res.data
      }))
  };

  render() {

    return (
      <div>
        <Header as='h2'>
          <Icon name='plug' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>       
          {this.state.values.map((val) => (
            <List.Item key = {val.id}>{val.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
