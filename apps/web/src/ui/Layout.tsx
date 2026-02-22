import { Box, Paper } from "@mantine/core";
import Header from "./Header";
import {
  layoutHeaderProps,
  layoutMainProps,
  layoutRootProps,
  layoutWrapperProps,
} from "./Layout.styles";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box {...layoutWrapperProps}>
      <Paper {...layoutRootProps}>
        <Paper {...layoutHeaderProps} component="header">
          <Header />
        </Paper>
        <Box {...layoutMainProps} component="main">
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
