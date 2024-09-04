/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  whiteColor: '#FFFFFF',

  primary: 'rgba(37, 178, 173, 1)',
  secondary: 'rgba(37, 178, 173, 0.3)',
  secondary2: '#c2ffd4',
  textHome: '#1C7C3C',
  primary_purple: '#40BDFA',

  textGrey: '#7A86A1',
  textGreyDark: 'rgba(111, 111, 111, 1)',
  loginBg: 'rgba(32,133,101,255)',
  statusBarBlue: 'rgba(65, 121, 209, 1)',
  whiteBackground: '#F5F5F5',
  notSelected: 'rgba(210, 231, 224, 1)',
  grey: '#ddd',
  green: '#2DC932',
  red: '#E11405',
  notesBackground: '#354558',
  //app
  textBlack: '#3D3A36',
  blackColor: 'rgba(48, 48, 48, 1)',
  errorColor: '#E11405',
};

/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  return BaseColor;
};
