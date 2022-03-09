import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 500,
      sm: 600,
      md: 768,
      lg: 1000,
      xl: 1200,
    },
  },
});

export const breakpoints = {
  mobileVertical: `${theme.breakpoints.up('xs')} and (orientation: portrait)`,
  tabletVertical: `${theme.breakpoints.up('md')} and (orientation: portrait)`,
  mobileHorizontal: `${theme.breakpoints.up('sm')} and (orientation: landscape)`,
  tabletHorizontal: `${theme.breakpoints.up('md')} and (orientation: landscape)`,
  laptopSm: `${theme.breakpoints.up('lg')} and (orientation: landscape)`,
  laptopLg: `${theme.breakpoints.up('xl')} and (orientation: landscape)`,
};
