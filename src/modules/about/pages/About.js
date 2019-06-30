import React from 'react';
import { Link } from 'react-router-dom';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Link to="/home">go Home page</Link>
        about page
      </div>
    );
  }
}
