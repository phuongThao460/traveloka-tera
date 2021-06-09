import './App.css'
import LoginForm from './components/pages/LoginForm'
import Home from './components/pages/Home'
//import Services from './components/pages/Services';
import Products from './components/pages/Products'
import RegistrationDetail from './components/pages/RegistrationDetail'
import AddHomeBlock from './components/pages/AddHomeBlock'
import ListHome from './components/pages/ListHome'
import ListApartment from './components/pages/ListApartment'
//import PropertyFacilities from './components/pages/PropertyFacilities'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Route path='/' exact component={LoginForm} />
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/products/:id' component={Products} />
          <Route path='/registrationDetail' component={RegistrationDetail}/>
          <Route path='/AddHomeBlock/:idTk' component={AddHomeBlock}/>
          <Route path='/ListHome' component={ListHome}/>
          <Route path="/lstApartment" component={ListApartment} />
        </Switch>
      </Router>
      {/* <PropertyFacilities/> */}
    </>
  );
}

export default App;
