import * as React from "react";
import { Link } from "react-router-dom";
import { DropdownIntermediary, RangeIntermediary } from "../../service/models";
import { DangerButton } from "../../components";
import "./intermediaries-list.css";

type IntermediaryProps = (RangeIntermediary | DropdownIntermediary) & {
  delete: (id: string) => void;
};

const Intermediary = React.memo<IntermediaryProps>((props) => {
  return (
    <tr>
      <td>{props.createdAt}</td>
      <td>{props.name}</td>
      <td>{props.order}</td>
      <td>
        <Link to={`/intermediary/edit/${props.id}`} className="buttonLink">
          Edit
        </Link>
        <DangerButton
          label="Delete"
          type="button"
          onClick={() => props.delete(props.id)}
        />
      </td>
    </tr>
  );
});

export { Intermediary };
