import { Link } from "react-router-dom";

function Button({ text, link }) {
  return (
    <Link to={link}>
      <div id="container">
        <button className="group relative inline-block w-48 max-[767px]:w-32 h-auto cursor-pointer border-0 bg-transparent p-0 text-inherit outline-none align-middle no-underline">
          <span
            className="relative block h-12 w-12 rounded-[1.625rem] bg-[#ffa45b] transition-all duration-[0.45s] ease-[cubic-bezier(0.65,0,0.076,1)] max-[767px]:h-10 max-[767px]:w-10 group-hover:w-full"
            aria-hidden="true"
          >
            <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-[0.45s] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:left-[23%] group-hover:-translate-x-1/2 group-hover:-translate-y-1/2">
              <img className="h-full w-full object-contain pointer-events-none" src="./images/catpawwhite.svg" alt="貓掌" />
            </span>
          </span>
          <span className="absolute top-0 right-0 bottom-0 left-0 m-0 ml-[1.85rem] p-[0.35rem_0] text-center text-[1.5rem] leading-[1.6] font-bold text-[#ffa45b] uppercase transition-all duration-[0.45s] ease-[cubic-bezier(0.65,0,0.076,1)] max-[767px]:text-[1.2rem] group-hover:text-white">
            {text}
          </span>
        </button>
      </div>
    </Link>
  );
}

export default Button;



