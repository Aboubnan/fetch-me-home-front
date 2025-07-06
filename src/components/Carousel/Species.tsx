import { Link } from "react-router-dom";
import "./Species.scss";

const Species = ({animal}) => {
    return(
        <div className="species">
            <div className={animal.species.name === "Chien" ? "circle visible" : "circle"} >
              <Link to={{pathname: "/pets", search: "?species=chien" }}  className="icons">
                <img
                  src="src/assets/dog.png"
                  className="species-icon"
                  alt="icone-chien"
                />
              </Link>
            </div>

            <div className={animal.species.name === "Chat" ? "circle visible" : "circle"} >
              <Link to={{pathname: "/pets", search: "?species=chat" }} className="icons">
                <img
                  src="src/assets/cat.png"
                  className="species-icon cat"
                  alt="icone-chat"
                />
              </Link>
            </div>

            <div className={animal.species.name === "Lapin" ? "circle visible" : "circle"}>
              <Link to={{pathname: "/pets", search: "?species=lapin" }} className="icons">
                <img
                  src="src/assets/rabbit.png"
                  className="species-icon rabbit"
                  alt="icone-lapin"
                />
              </Link>
            </div>

            <div className={animal.species.name === "Furet" ? "circle visible" : "circle"}>
              <Link to={{pathname: "/pets", search: "?species=furet" }} className="icons">
                <img
                  src="src/assets/ferret.png"
                  className="species-icon ferret"
                  alt="icone-furet"
                />
              </Link>
            </div>

            <div className={animal.species.name === "Hamster" ? "circle visible" : "circle"} >
              <Link to={{pathname: "/pets", search: "?species=hamster" }}  className="icons">
                <img
                  src="src/assets/hamster.png"
                  className="species-icon hamster"
                  alt="icone-hamster"
                />
              </Link>
            </div>
        </div>
    )
}

export default Species;