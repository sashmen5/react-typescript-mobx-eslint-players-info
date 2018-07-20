import * as React from 'react';
import ViewStore from "../../stores/ViewStore";

interface LoginProps {
    viewStore: ViewStore;
}

interface LoginState {
}

class Login extends React.Component<LoginProps, LoginState> {
    email: HTMLInputElement;
    pw: HTMLInputElement;

    constructor(props) {
        super(props)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.email.value, this.pw.value)
    };
    render() {
        const {errorMessage} = this.props.viewStore;
        return (
            <div id="login-form" className="panel panel-info">
                <div className="panel-heading">
                    <div className="panel-title">Sign In</div>
                </div>

                <div className="panel-body">

                    <form id="loginform" className="form" role="form" onSubmit={this.handleSubmit}>

                        {
                            errorMessage !== '' && <div className="col-sm-12">
                                <div className="row form-group">
                                    <div id="login-alert" className="alert alert-danger">Invalid username/password</div>
                                </div>
                            </div>
                        }


                        <div className="col-sm-12">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    ref={(input) => this.email = input}
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"/>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="form-group">
                                <label htmlFor="pw">Password</label>
                                <input
                                    type="password"
                                    ref={(input) => this.pw = input}
                                    className="form-control"
                                    name="pw"
                                    placeholder="Password"/>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        );
    }
}

export default Login;