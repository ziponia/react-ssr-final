import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { RootState } from "../module";
import { Link } from "react-router-dom";
import { setCounter } from "../module/actions";

type StateProps = {
  counter: number;
};
type DispatchProps = {
  setCounter: typeof setCounter;
};
type OwnProps = {};

type Props = StateProps &
  DispatchProps &
  OwnProps &
  RouteComponentProps<{ counter: string }>;

const About: React.FC<Props> = props => {
  const counter = Number(props.match.params.counter) || 0;
  useEffect(() => {
    console.log("counter", counter);
    props.setCounter(Number(counter));
  }, [props.match.params.counter]);
  return (
    <div>
      <h1>this is About {counter}</h1>
      <Link to={`/about/${Number(counter) - 1}`}>Before</Link>
      <Link to={`/about/${Number(counter) + 1}`}>Next</Link>
    </div>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    counter: state.global.count
  }),
  { setCounter }
)(About);
