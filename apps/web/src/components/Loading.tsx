import React from "react";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-3 text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default Loading;
