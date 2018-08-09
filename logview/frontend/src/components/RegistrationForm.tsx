import * as React from 'react';
import {Form, Input, SignUp} from './RegistrationStyles';

interface IRegFormState{
    username: string;
    email: string;
    password: string;
    company: string;
}
interface IRegFormProps {
	onSubmit: Function;
}
 

export default class RegistrationForm extends React.Component<IRegFormState, IRegFormProps>{
constructor(props){
  super(props);

  this.state = {
      username: '',
      email:    '',
      password: '',
      company:  '',
  };
}

handleFieldChange =  (e: React.FormEvent<HTMLInputElement>): void =>{
    this.setState(state =>({
        ...state,
        [e.currentTarget.name]: e.currentTarget.value

    }));
};

handleSubmit = () =>{
    if(this.props.onSubmit){
        this.props.onSubmit(this.state);
    }
};

render(){
   const {username, email, password, company} = this.state;
   return(
     
        <Form>
            <h2>{Register}</h2>
            <Input 
             label = "Username"
             name = "username"
             value = {this.state.username}
             placeHolder = "Username"
             onChange = {() => this.handleFieldChange()}
            />
            <Input 
             label = "Email"
             name = "email"
             value = {this.state.email}
             placeHolder = "Email"
             onChange = {() => this.handleFieldChange()}
            />
            <Input
             label = "Password"
             name = "password"
             value = {this.state.password}
             placeHolder = "Password"
             onChange = {() => this.handleFieldChange()}
            />
            <Input
             label = "Company"
             name = "company"
             value = {this.state.company}
             placeHolder = "Company"
             onChange = {() => this.handleFieldChange()}
            />
        </Form>
        <SignUp type="submit" value = "sign up">Sign up</SignUp>
     
   )
}

};