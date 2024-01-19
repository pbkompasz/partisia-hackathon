import Button from "@mui/material/Button";
import './App.css';
import CommonLayout from "../../components/layout/CommonLayout";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <CommonLayout>
      <Button href="/login">Log in</Button>
      <Button href="/register">Register</Button>
    </CommonLayout>
  )
}

export default App
