import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

export const lightThemeStyles = {
  width: width,
  height: height,
  mainBackgroundColor: '#E7EAF1',
  boxesBackgroundColor: '#F6F7FB',
  secondaryBoxesBgColor: '#FFFFFF',
  thirdBoxesBgColor: '#E1E5EE',
  activeOrange: '#FC5404',
  orange: '#F98404',
  inactiveColor: '#A6ACC4',
  activeWhite: '#F6F7FB',
  inactiveGray: '#C4CADA',
  subMenuBgColor: '#C4CADA',
  subMenuTextColor: '#F7F7F7',
  filterTextColor: '#959BB2',
  activeSubMenuText: '#A6ACC4',
  titleColor: '#424455',
  textColor: '#242427',
  priceUpColor: '#52DD8D',
  priceDownColor: '#F4065C',
  navbarBgColor: '#FFFFFF',
  boxesBorderColor: '#EFEFEF',
  tableHeaderColor: '#EFEFEF',
  secondaryTextColor: '#B8BBBC',
  secondaryItemColor: '#D9D9D9',
  inactiveTextColor: '#5F6466',
  inactiveMenuBgColor: '#D9D9D9',
  buttonColor: '#FFFFFF',
  upgradeOverlayBgColor: '#47474790',
  activePink: '#E6007A',
  activePurple: '#49346B',
  activeBlack: '#151515',
  graphSecondaryColor: '#DDE1E2',
  graphOpacityColor: '#DDE1E230',
  speedometerIndicator: '#4D4D4D',
  backbuttonColor: '#B8BBBC',
  chartsColor: '#B8BBBC',
  fundamentalsMenuText: '#B8BBBC',
  responsiveFontSize,
  titleFontSize: responsiveFontSize * 1.2,
  subscriptions: {
    subscriptionsBgColor: '#E7EAF1',
    purchaseButtonBgColor: '#B8BBBC',
    purchaseButtonText: '#10101E',
    text: '#F9FAFC',
    title: '#242427',
    boxesBgColor: '#535568',
    seeMoreColor: '#74788D',
  },
  loginBgColor: '#E7EAF1',
  loginTitlesColor: '#B8BBBD',
  signUpTitlesColor: '#FFFFFF',
  loginInputBgColor: '#5F6567',
  inputColor: '#F7F7F7',
  topMenuActiveBg: '#F9F9F933',
};

export const darkThemeStyles = {
  width: width,
  height: height,
  mainBackgroundColor: '#10101E',
  boxesBackgroundColor: '#535568',
  secondaryBoxesBgColor: '#74788D',
  thirdBoxesBgColor: '#74788D',
  activeOrange: '#FC5404',
  orange: '#F98404',
  inactiveColor: '#74788D',
  activeWhite: '#C4CADA',
  inactiveGray: '#C4CADA',
  subMenuBgColor: '#74788D',
  titleColor: '#D6DFE8',
  textColor: '#F9FAFC',
  subMenuTextColor: '#F9FAFC',
  filterTextColor: '#74788D',
  activeSubMenuText: '#F9FAFC',
  priceUpColor: '#52DD8D',
  priceDownColor: '#F4065C',
  navbarBgColor: '#10101E',
  boxesBorderColor: '#74788D',
  tableHeaderColor: '#74788D',
  secondaryTextColor: '#74788D',
  secondaryItemColor: '#A6ACC4',
  inactiveTextColor: '#F9FAFC',
  inactiveMenuBgColor: '#74788D',
  buttonColor: '#FFFFFF',
  upgradeOverlayBgColor: '#21213090',
  activePink: '#E6007A',
  activePurple: '#49346B',
  activeBlack: '#151515',
  graphSecondaryColor: '#85899F',
  graphOpacityColor: '#85899F30',
  speedometerIndicator: '#313343',
  backbuttonColor: '#C4CADA',
  chartsColor: '#74788D',
  fundamentalsMenuText: '#F9FAFC',
  responsiveFontSize,
  titleFontSize: responsiveFontSize * 1.2,
  subscriptions: {
    subscriptionsBgColor: '#10101E',
    purchaseButtonBgColor: '#B8BBBC',
    purchaseButtonText: '#10101E',
    text: '#F9FAFC',
    title: '#F9FAFC',
    boxesBgColor: '#535568',
    seeMoreColor: '#707488',
  },
  loginBgColor: '#242427',
  loginTitlesColor: '#B8BBBD',
  signUpTitlesColor: '#FFFFFF',
  loginInputBgColor: '#FFFFFF',
  inputColor: '#242427',
  topMenuActiveBg: '#E9E9E933',
};
