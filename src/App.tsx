import { Subscribe } from "@react-rxjs/core";
import "./App.css";
import { Related } from "./Related";
import { useIncrement, useIncremented, useIsEven } from "./state";
import { useRelation } from "./useRelation";

const ShowRelation = () => {
  const relation = useRelation();
  return <h2>{relation ? `related by ${relation}` : "global"}</h2>;
};

const Increment = () => {
  const increment = useIncrement();
  return (
    <div>
      <button onClick={increment}>increment</button>
    </div>
  );
};

const Value = (props: { base: number }) => {
  const value = useIncremented(props.base);
  return <div>{value}</div>;
};

const IsEven = (props: { base: number }) => {
  const isEven = useIsEven(props.base);
  return <div>{isEven ? "even" : "odd"}</div>;
};

const Example = (props: { symbolId: number }) => {
  return (
    <div>
      <ShowRelation />
      <Increment />
      <Value base={props.symbolId} />
      <IsEven base={props.symbolId} />
      <hr />
    </div>
  );
};

function App() {
  return (
    <Subscribe>
      <Related>
        <Example symbolId={10} />
      </Related>

      <Related>
        <Example symbolId={10} />
      </Related>

      <Related>
        <ShowRelation />
        <Increment />
        <hr />
        <Value base={10} />
        <IsEven base={10} />
        <hr />

        <Value base={100} />
        <IsEven base={100} />
        <hr />
      </Related>

      <Example symbolId={10} />
      <Example symbolId={10} />
    </Subscribe>
  );
}

export default App;
