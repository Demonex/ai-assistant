import './index.css'
// import {FirstStub} from "./pages/FirstStub.tsx";
import WelcomePage from "./pages/WelcomePage/index.js";


function App() {
  let type: 'first' | 'second' | 'third' = 'second';
  return <WelcomePage/>
  /*type === 'third' ? <Test /> : (
    type === 'second' ? <SecondStub/> : <FirstStub/>
  )*/
}

export default App
