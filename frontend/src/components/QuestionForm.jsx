import { useState } from "react";
import { sendQuestion } from "../api/api";
import Loader from "./Loader";

export default function QuestionForm({ onResponse }) {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await sendQuestion(question, image);
      const imageUploaded = !!image; 
      onResponse(data, question, imageUploaded);


      setQuestion("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error al enviar la pregunta:", error);
      alert("Hubo un error al enviar la pregunta.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-8 bg-white rounded shadow-md">
        <Loader />
        <p className="mt-4 text-gray-600">Procesando tu pregunta...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded shadow-md w-full max-w-2xl">
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          Pregunta
        </label>
        <textarea
          id="question"
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Escribe tu pregunta aquí..."
          required
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Imagen (opcional)
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
      </div>

      {imagePreview && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Previsualización de la imagen:</p>
          <img
            src={imagePreview}
            alt="Vista previa"
            className="max-w-full h-auto rounded-md shadow-md"
          />
        </div>
      )}

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Enviar Pregunta
        </button>
      </div>
    </form>
  );
}
