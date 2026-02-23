import { useNavigate } from "react-router-dom";

function ModeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        
        <div
          onClick={() => navigate("/builder")}
          className="cursor-pointer bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-2">Fresher Resume</h2>
          <p className="text-gray-600">
            Perfect for students & beginners
          </p>
        </div>

        <div
          onClick={() => navigate("/builder")}
          className="cursor-pointer bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-2">Professional Resume</h2>
          <p className="text-gray-600">
            For experienced professionals
          </p>
        </div>

      </div>
    </div>
  );
}

export default ModeSelection;