import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>stage title</title>
        </Helmet>
        <Link to="/home">go Home page1</Link>
        about page
      </div>
    );
  }
}
