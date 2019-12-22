import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <React.Fragment>
      <div>Oh dear. I can't work out what to show you.</div>
      <Link to="/">Back to homepage</Link>
    </React.Fragment>
  );
};

export default NotFound;
