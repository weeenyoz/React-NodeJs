import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import CardComponent from './material-ui-components/Card';

const LoginForm: React.FC<RouteComponentProps> = (props) => {
   return (
      <div>
         <CardComponent />
      </div>
   )
}

export default LoginForm;