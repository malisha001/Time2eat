import React from 'react';
import { Link } from 'react-router-dom';
import classes from './notFound.module.css';

export default function NotFound({message, linkRoute, linkText }) {
  return  (
  <div className={classes.container}>
  {message}
  <Link to={linkRoute}>{linkText}</Link>
  </div>
  );
  
}

NotFound.defaultProps ={
    message : 'Nothing Found!',
    linkRoute : '/respage',
    linkText : 'Go to home page',
}