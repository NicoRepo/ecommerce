import NavBar from "./components/NavBar/NavBar";
import Body from "./components/Body/Body";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";

function App() {
  return (
    <div>
      <NavBar/>
      <Body>
        <ItemListContainer greeting={"Bienvenido"}/>
      </Body>
    </div>
  );
}

export default App;
