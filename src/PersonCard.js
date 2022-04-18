import "./PersonCard.scss";
import cx from "classnames";
import { ELIMINATED } from "./utils";

const PersonCard = ({ person, onClick }) => {
  return (
    <button
      className={cx("PersonCard", {
        "PersonCard--eliminated": person?.status === ELIMINATED
      })}
      onClick={onClick}
    >
      <img alt="" src={person?.imgSrc} width="116px" height="116px" />
      <p className="PersonCard-name">{person?.name}</p>
    </button>
  );
};

export default PersonCard;
