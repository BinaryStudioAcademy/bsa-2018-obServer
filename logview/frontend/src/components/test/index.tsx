import * as React from "react";

export interface TestProps {
  msg: string;
}

class Test extends React.PureComponent<TestProps, {}> {
  render() {
    const { msg } = this.props;
    return <h1>{msg}qqq</h1>;
  }
}

export default Test;
