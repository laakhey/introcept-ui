import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./components/layout/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Client from "./components/pages/Client";
import NotFound from "./components/pages/NotFound";
import ClientForm from "./components/clients/ClientForm";
import ViewClient from "./components/clients/ViewClient";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={Client}/>
                    <Route exact path="/clients" component={Client}/>
                    <Route exact path="/clients/add" component={ClientForm}/>
                    <Route exact path="/clients/edit/:id" component={ClientForm} />
                    <Route exact path="/clients/:id" component={ViewClient} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
