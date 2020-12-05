import styled from "@material-ui/core/styles/styled";
import { Div } from "./utils";

export const Column = styled(Div)({
  display: "flex",
  flexDirection: "column",
});

export const ColumnContainer = styled(Column)({
  flex: 1,
  height: "100%",
  overflow: "scroll",
});
