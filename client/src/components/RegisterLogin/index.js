import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/user_actions';
import { Link} from 'react-router-dom';

class RegisterLogin extends Component {

    state={
        email:"",
        password:"",
        errors:[],
    };

    displayErrors= errors=>
            errors.map((error, i) => <p key={i}>{error}</p>)

    handleChange= event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    submitForm= event=> {
        event.preventDefault();

        let dataToSubmit= {
            email: this.state.email,
            password: this.state.password
        };

        if(this.isFormValid(this.state)){
            this.setState({errors:[]})
                this.props.dispatch(loginUser(dataToSubmit))
                .then(response=> {
                    if(response.payload.loginSuccess){
                        this.props.history.push('/')
                    } else{
                        this.setState({
                            errors: this.state.errors.concat(
                                "Login failed, username or password is inncorrect"
                            )
                        })
                    }
                })
        }  else{
            this.setState({
                errors: this.state.errors.concat(
                    "Empty email or password"
                )
            })
        }
    }

    isFormValid= ({email,password})=> email && password

    render() {
        return (
            <div className="container">
                <h2>Login</h2>
                <div className="row">
                    <form className="col 12" onSubmit={event => this.submitForm(EventSource)} >
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

                            <label htmlFor="email">Email</label>
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
                                name="password"
                                value={this.state.password}
                                onChange={e => this.handleChange(e)}
                                id="password"
                                type="password"
                                className="validate"
                            />
                            <label htmlFor="password">Password</label>
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
                                >Login</button>
                            </div>

                            <div className="col s6">
                                <Link to="/register">
                                <button
                                    className="btn waves-effect red lighten-2"
                                    type="submit"
                                    name="action"
                                >SignUp</button></Link>
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

export default connect(mapStateToProps)(RegisterLogin)