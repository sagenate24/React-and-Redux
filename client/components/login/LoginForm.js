import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';
import { connect } from 'react-redux';
import { loginActions } from '../../actions/authActions';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
            console.log('Not valid')
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('hey im here')
        if (this.isValid()) {
            
            this.setState({ errors: {}, isLoading: true });
            this.props.loginActions(this.state).then(
                (res) => this.context.router.push('/'),
                (err) => this.setState({ errors: err.data.errors, isLoading: false }),
                console.log('Hey i got here')
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, identifier, password, isLoading } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

                { errors.form && <div className="alert alert-danger">{errors.form}</div>}

                <TextFieldGroup
                field="identifier"
                label="Username / Email"
                value={identifier}
                error={errors.identifier}
                onChange={this.onChange}
                />

                <TextFieldGroup
                field="password"
                label="Password"
                value={password}
                error={errors.password}
                onChange={this.onChange}
                type="password"
                />

                <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    loginActions: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { loginActions })(LoginForm);