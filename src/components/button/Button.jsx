import { Link } from "react-router-dom";
import "./Button.scss";

function Button({ text, link }) {
  return (
    <Link to={link}>
      <div id="container">
        <button className="learn-more">
          <span className="circle" aria-hidden="true">
            <span className="icon">
              <img src="./images/catpawwhite.svg" alt="貓掌" />
            </span>
          </span>
          <span className="button-text">{text}</span>
        </button>
      </div>
    </Link>
  );
}

export default Button;



