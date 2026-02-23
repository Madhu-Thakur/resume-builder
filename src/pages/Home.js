import { useNavigate } from "react-router-dom";
<img src="/images/resume1.png" alt="resume1" />
//  <img src="/images/resume2.png" alt="resume2" />
//  <img src="/images/resume3.png" alt="resume3" /> 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center px-4">
 
      <h1 className="text-5xl font-bold mb-6 text-center 
               bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 
               bg-clip-text text-transparent 
               drop-shadow-[0_0_20px_rgba(124,58,237,0.6)]">
  Build Your Professional Resume
</h1>
 
      <button
        onClick={() => navigate("/mode")}
        className="px-8 py-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;
