import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      gray: string;
      primary: string;
      secondary: string;
      background: string;
      onPrimary: string;
      onSecondary: string;
      onBackground: string;
      onGray: string;
    };
  }
}
