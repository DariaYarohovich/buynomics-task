import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { useStore } from "../../hooks/useStore";
import { Layout } from "../../components";
import { Intermediary } from "./intermediary";
import "./intermediaries-list.css";

export const IntermediariesList = observer(() => {
  const store = useStore();

  const intermediaries = store.intermediariesStore.intermediaries;

  const deleteIntermediary = React.useCallback((id: string) => {
    store.intermediariesStore.deleteIntermediary(id);
  }, [store.intermediariesStore.deleteIntermediary]);

  return (
    <Layout
      header={"Intermediaries"}
      content={
        <>
          {intermediaries.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Created At</th>
                  <th>Name</th>
                  <th>Order</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {intermediaries.map((intermediary) => (
                  <Intermediary
                    key={intermediary.id}
                    delete={deleteIntermediary}
                    {...intermediary}
                  />
                ))}
              </tbody>
            </table>
          ) : null}
          <Link to="/intermediary/create" className="buttonLink">
            Add intermediary
          </Link>
        </>
      }
    />
  );
});
