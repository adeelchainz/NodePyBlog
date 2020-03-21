import React, { Component } from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/user_actions';

class register extends Component {
    
    state={
        name:"",
        lastname:"",
        email:"",
        password:"",
        passwordConfirmation:"",
        errors:[],
    };

    handleChange= event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    displayErrors= errors=>
            errors.map((error, i) => <p key={i}>{error}</p>)

    isFormValid= ()=> {
        let errors= [];
        let error;

        if(this.isFormEmpty(this.state)){
            error= {message: "Empty Feilds"};
            this.setState({errors: errors.concat(error)});
        } else if(!this.isPasswordValid(this.state)){
            error= {message: "Invalid Password"};
            this.setState({errors: errors.concat(error)});
        } else {
            return true;
        }
    }

    isPasswordValid= ({password, passwordConfirmation})=> {
        if (password.length<6 || passwordConfirmation.length<6){
            return false;
        } else if (password !== passwordConfirmation){
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty= ({lastname, name, email,password ,passwordConfirmation})=>{
        return(
            !name.length ||
            !lastname.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );

    }

    submitForm= event=> {
        event.preventDefault();

        let dataToSubmit= {
            email: this.state.email,
            name: this.state.name,
            lastname: this.state.lastname,
            password: this.state.password,
            passwordConfirmation: this.state.password
        };

        if(this.isFormValid(this.state)){
            this.setState({errors:[]})
                this.props.dispatch(registerUser(dataToSubmit))
                .then(response=> {
                    //console.log(response);   //ToValidateOutput
                    if(response.payload.success){
                        this.props.history.push('/login')
                    } else{
                        this.setState({
                            errors: this.state.errors.concat(
                                "Registeration failed, Failed to connect"
                            )
                        })
                    }
                })
                .catch(err=> {
                    this.setState({
                        errors: this.state.errors.concat(err)
                    });
                })
        }  else{
            this.setState({
                errors: this.state.errors.concat(
                    "Empty email Form isnt Valid"
                )
            })
        }
    }



    render() {
        return (
            <div className="container">
                <h2>SignUp</h2>
                <div className="row">
                    <form className="col 12" onSubmit={event => this.submitForm(EventSource)} >
                        <div className="row">
                            <div className="input-field col s12">

                            <input 
                                name="name"
                                value={this.state.name}
                                onChange={e => this.handleChange(e)}
                                id="name"
                                type="text"
                                className="validate"
                            />

                            <label className="active" htmlFor="name">Name</label>
                            <span 
                                className="helper=text"
                                data-error="Email type invalid"
                                data-success="right"
                            />
                            
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">

                            <input 
                                name="lastname"
                                value={this.state.lastname}
                                onChange={e => this.handleChange(e)}
                                id="lastname"
                                type="text"
                                className="validate"
                            />
                            <label className="active" htmlFor="lastname">Lastname</label>
                            <span 
                                className="helper=text"
                                data-error="wrong"
                                data-success="right"
                            />

                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">

                            <input 
                                name="email"
                                value={this.state.email}
                                onChange={e => this.handleChange(e)}
                                id="email"
                                type="email"
                                className="validate"
                            />
                            <label className="active" htmlFor="email">Email</label>
                            <span 
                                className="helper=text"
                                data-error="wrong"
                                data-success="right"
                            />

                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">

                            <input 
                                name="password"
                                value={this.state.password}
                                onChange={e => this.handleChange(e)}
                                id="password"
                                type="password"
                                className="validate"
                            />
                            <label className="active" htmlFor="password">Password</label>
                            <span 
                                className="helper=text"
                                data-error="wrong"
                                data-success="right"
                            />

                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">

                            <input 
                                name="passwordConfirmation"
                                value={this.state.passwordConfirmation}
                                onChange={e => this.handleChange(e)}
                                id="passwordConfirmation"
                                type="password"
                                className="validate"
                            />
                            <label className="active" htmlFor="passwpasswordConfirmationord">Password Confirmation</label>
                            <span 
                                className="helper=text"
                                data-error="wrong"
                                data-success="right"
                            />

                            </div>
                        </div>
                        
                        {/* //To Disply Errors */}
                        {this.state.errors.length >0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )}

                        {/* LoginButton */}
                        <div className="row">
                            <div className="col s6">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >Create an Account</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(register)