import React, { FC } from "react";
import Graphin, { GraphinData, Utils } from "@antv/graphin";

const data: GraphinData = Utils.mock(10).graphin();

const Graph: FC = (): JSX.Element => {
  return <Graphin data={data} />;
};

export default Graph;
