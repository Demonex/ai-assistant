import './index.css'
import {FirstStub} from "./pages/FirstStub.js";
import ThirdStubPage from "./pages/ThirdStub.js";


function App() {
  let type: 'first' | 'second' | 'third' = 'second';
  return <ThirdStubPage/>
  /*type === 'third' ? <Test /> : (
    type === 'second' ? <SecondStub/> : <FirstStub/>
  )*/
}

export default App
