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

const Example = (props: { base: number }) => {
  return (
    <div>
      <ShowRelation />
      <Increment />
      <Value base={props.base} />
      <IsEven base={props.base} />
      <hr />
    </div>
  );
};

function App() {
  return (
    <Subscribe>
      <Related>
        <Example base={10} />
      </Related>

      <Related>
        <ShowRelation />
        <Increment />
        <hr />
        <Value base={10} />
        <IsEven base={100} />
        <hr />

        <Value base={20} />
        <IsEven base={20} />
        <hr />
      </Related>

      <Example base={10} />

      <Example base={10} />
    </Subscribe>
  );
}

export default App;
