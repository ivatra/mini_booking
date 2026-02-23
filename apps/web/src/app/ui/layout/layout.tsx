import { Box, Paper } from "@mantine/core";

import Header from "./header/header";
import classes from "./layout.module.css";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <Box className={classes.wrapper}>
      <Paper
        className={classes.root}
        radius="md"
        withBorder>
        <Paper
          className={classes.header}
          component="header">
          <Header />
        </Paper>
        <Box
          className={classes.main}
          component="main">
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

export default Layout;
