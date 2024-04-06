import "./App.css";
import ImageGallery from "./pages/ImageGallery";
import ReactQueryProvider from "./ReactQueryProvider";

function App() {
  return (
    <ReactQueryProvider>
      <ImageGallery />
    </ReactQueryProvider>
  );
}

export default App;
