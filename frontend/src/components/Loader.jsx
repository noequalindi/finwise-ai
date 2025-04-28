import "../styles/loader.css";  

export default function Loader() {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="loader-bar-container">
        <div className="loader-bar-progress"></div> 
      </div>
    </div>
  );
}
