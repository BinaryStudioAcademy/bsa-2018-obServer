import React from "react";
import { storiesOf } from "@storybook/react";
import App from "../src/containers/App/App";

storiesOf("App", module).add("App", () => <App msg="Hello World" />);
