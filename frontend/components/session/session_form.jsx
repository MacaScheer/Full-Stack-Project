import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        };
        this.demo_user_handler = this.demo_user_handler.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }
    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value })
        };
    }
    demo_user_handler() {
        const demoUser = {
            username: "demo_user1",
            password: "123456",
        }
        this.props.processForm1(demoUser)
    }
    errors() {
        if (this.props.errors.responseJSON) {
            return (<ul>
                {this.props.errors.responseJSON.map((error, i) => (<li key={i}>{error}</li>))}
            </ul>)
        }
    }
    componentDidMount() {
        this.props.clearErrors();
    }

    render() {
        let path = "/login";
        let title = "signup";
        let altTitle = "Log in";
        let instruc = "Already have an account?";
        let headerGreet = "Sign up to see photos and videos from your friends.";

        let emailInput = <input type="text"
            className="login-input"
            onChange={this.handleInput('email')}
            placeholder="Email"
            value={this.state.email}
        />
        if (this.props.formType === 'login') {
            title = "login";
            path = "/signup";
            altTitle = "Sign up";
            instruc = "Don't have an account?     ";
            headerGreet = "";
            emailInput = "";
        };


        return (
            <div className="page">
                <header className="headerBar"></header>

                <div className="login-page-container">
                    <div className="login-page-left">
                        <div className="login-left-image-container">
                            <img className="login-left-image" src="https://www.instagram.com/static/images/homepage/home-phones@2x.png/9364675fb26a.png" />
                            <img className="login-left-image-inner" src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg" />
                        </div>
                    </div>
                    <div className="login-page-right">
                        <ul className="login-errors">{this.errors()}</ul>
                        <div className="login-form-container">

                            <form onSubmit={this.handleSubmit} className="login-form-box">
                                <h1 className="fotobox-logo">fotobox</h1>
                                <div className="login-form">
                                    <span className="greeting">{headerGreet}</span>
                                    <br />
                                    <label>{emailInput}</label>
                                    <br />
                                    <label>
                                        <input type="text"
                                            className="login-input"
                                            onChange={this.handleInput('username')}
                                            placeholder="Username"
                                            value={this.state.username}
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        <input type="password"
                                            className="login-input"
                                            onChange={this.handleInput('password')}
                                            placeholder="Password"
                                            value={this.state.password}
                                        />
                                    </label>
                                    <br />
                                    <input className="session-submit login" type="submit" value={this.props.formType} />
                                    <br />
                                    &nbsp;Or&nbsp;
                                    <br />
                                    <button className="session-submit demo" onClick={this.demo_user_handler}>Demo Login
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="login-signup-link">
                            <div>{instruc}
                                <Link to={path}>{altTitle}</Link>
                                {/* <a href={path}>{altTitle}</a> */}
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        )
    }
}

export default SessionForm;