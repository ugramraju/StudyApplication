import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSignUp from "./components/user/userSignUp";
import Home from "./components/Home/Home";
import VenderLogin from "./components/vender/venderLogin";
import UserLogin from "./components/user/userLogin";
import VenderSignup from './components/vender/venderSign';
import ProposalForm from './components/ProposalForm';
import DisplayComponent from './components/DisplayComponent';
import DisplayAllComponent from './components/DisplayAllFiles/DisplayAllFiles';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/venderlogin" element={<VenderLogin/>} />
          <Route path="/userlogin" element={<UserLogin/>} />
          <Route path="/usersignup" element={<UserSignUp />} />
          <Route path="/vendersignup" element={<VenderSignup/>} />
          <Route path="/proposalForm" element={<ProposalForm/>}/>
          <Route path="/displayComponent" element={<DisplayComponent/>}/>
          <Route path="/displayAllProposals" element={<DisplayAllComponent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
