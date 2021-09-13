import "./App.css";
import Main from "./pages/main/Main";
import SignIn from "./components/signin/SignIn";

import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";


function App() {
  return (
    <div className="App">

      <Router>
          <Switch>
              <Route path="/" exact component={()=>{
                  if(localStorage.getItem("agro_auth")==="true"){
                    return(<Redirect to="/admin/dashboard"/>)
                  }else{
                    return(<Redirect to="/login"/>)
                  }
              }}/>
              <Route path="/admin" component={Main}/>
              <Route path="/login"  component={SignIn}/>
          </Switch>
       </Router>   

      
    </div>
  );
}

export default App;
