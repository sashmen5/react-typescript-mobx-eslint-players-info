import * as React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import All from './components/All';
import Admin from './components/admin/Admin';

import {Route, Switch} from 'react-router-dom';
import ViewStore from "../stores/ViewStore";
import Loader from "./components/Loader";

interface AppProps {
    viewStore: ViewStore
}

interface AppState {

}

class App extends React.Component<AppProps, AppState> {

    constructor(props){
        super(props);

    }
    render(){
        const {viewStore} = this.props;
        const {isLoading} = viewStore;
        return (
            <div className={`${isLoading ? 'is-loading' : ''}`}>
                {
                    isLoading ? <Loader/> : <div>
                        {/* NavBar - do I need to include the ending tag? :) */}
                        <NavBar />

                        <div className="container-fluid">
                            <div className="row">
                                <div className="container main-content">
                                    <div className="row">

                                        {/* Main content - start */}
                                        <div className={`col-sm-12`} >

                                            <Switch>
                                                <Route exact path="/" component={Home}/>
                                                <Route path="/admin" component={Admin}/>
                                                <Route path="/all" component={All}/>
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

export default App;