import { ArrowRight } from "lucide-react";
import React from "react";

const VisitButton = () => {
  return (
    <div>
      <button className="group flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300">
        Visit Store
        <ArrowRight
          className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all duration-300"
          size={18}
        />
      </button>
    </div>
  );
};

export default VisitButton;
