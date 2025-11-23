import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Dashboard from "./Pages/Users/Dashboard";
import Board from "./Components/User/Board";
import Login from "./Pages/Auth/Login";
import CVBuilder from "./Components/User/CVBuilder";
import Dashboardadmin from "./Pages/Admin/Dashboardadmin";
import Dash from "./Components/Admin/Dash";
import CV from "./Components/User/CV";
import { AuthProvider } from "./context/AuthContext";
import Preview from "./Components/User/AddCv/Preview";
import TemplateEditor from "./Components/Admin/TemplateEditor/TemplateEditor";


import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UserList from "./Components/Admin/UserList";
import UserAdd from "./Components/Admin/UserAdd";
import Setting from "./Components/Admin/Settings";
import TemplateList from "./Components/Admin/TemplateList";
import Parametreuser from "./Components/User/Parametreuser";
import Statistique from "./Components/Admin/Statistique";
import Conseils from "./Components/Admin/Conseils";
import Conseilsus from "./Components/User/Conseilsus";


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <DndProvider backend={HTML5Backend}> */}

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />


          <Route path="/utilisateur" element={<Dashboard />}>
            <Route path="tableau_de_bord" element={<Board />} />
            <Route path="creer_un_cv" element={<CVBuilder />} />
            <Route path="mes_cvs" element={<CV />} />
            <Route path="parametre" element={<Parametreuser />} />
            <Route path="preview/:cvId" element={<Preview />} />
            <Route path="conseils" element={<Conseilsus />} />
          </Route>

          <Route path="/admin" element={<Dashboardadmin />}>
            <Route path="dashboard" element={<Dash />} />
            <Route path="template" element={<TemplateEditor />} />
            <Route path="template-liste" element={<TemplateList />} />
            <Route path="utilisateurs" element={<UserList />} />
            <Route path="ajout-utilisateur" element={<UserAdd />} />
            <Route path="conseils" element={<Conseils />} />
            <Route path="statistique" element={<Statistique />} />
            <Route path="parametres" element={<Setting />} />
          </Route>
        </Routes>
        {/* </DndProvider> */}
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
