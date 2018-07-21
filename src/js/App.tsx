import * as React from 'react';

import {All, NavBar, Home, Loader, Login} from './components'

import Admin from './components/admin/Admin';
import {Route, Switch} from 'react-router-dom';
import ViewStore from "../stores/ViewStore";
import DevTools from "mobx-react-devtools";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {RequireAuth} from "./components/routes";


interface AppProps {
    viewStore: ViewStore
}

interface AppState {

}

@observer
class App extends React.Component<AppProps, AppState> {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        const {viewStore} = this.props;
        viewStore.firebaseCheckAuth();
    }

    render(){
        const {viewStore} = this.props;
        const {isLoading} = viewStore;
        return (
            <div className={`${isLoading ? 'is-loading' : ''}`}>
                {
                    <DevTools/>
                }
                {
                    isLoading ? <Loader/> : <div>
                        <NavBar viewStore={viewStore}/>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="container main-content">
                                    <div className="row">

                                        {/* Main content - start */}
                                        <div className={`col-sm-12`} >

                                            <Switch>
                                                <Route exact path="/" component={Home}/>
                                                <Route path="/admin" component={RequireAuth(Admin)}/>
                                                <Route path="/all" component={RequireAuth(All)}/>
                                                <Route path="/login" component={routeProps => <Login {...routeProps} viewStore={viewStore}/>}/>
                                                {/*<Route path="/login" component={Login}></Route>*/}
                                            </Switch>
                                        </div>
                                        {/* Main content - end */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }


            </div>
        )
    }
}

export default withRouter(App);