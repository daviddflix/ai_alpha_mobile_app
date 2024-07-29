import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
const responsiveFontSize = width * 0.04; // Font size: 15.70909090909091
const isAndroid = Platform.OS === 'android' ? true : false;

export const lightThemeStyles = {
  width: width,
  height: height,
  mainBackgroundColor: '#EDEDED',
  secondaryBgColor: '#F6F7FB',
  boxesBackgroundColor: '#FAFAFA',
  secondaryBoxesBgColor: '#FFFFFF',
  thirdBoxesBgColor: '#E5E5E5',
  activeOrange: '#FC5404',
  orange: '#FF6C0D',
  activeYellow: '#F9B208',
  inactiveColor: '#A6ACC4',
  activeWhite: '#FFFFFF',
  inactiveGray: '#C4CADA',
  subMenuBgColor: '#D4D4D4',
  subMenuTextColor: '#808080',
  filterTextColor: '#959BB2',
  activeSubMenuText: '#A6ACC4',
  titleColor: '#171717',
  textColor: '#404040',
  searchPlaceHolderColor: '#A3A3A3',
  supportAndResistanceText: '#80290E',
  priceUpColor: '#2DDA99',
  priceDownColor: '#E93334',
  navbarBgColor: '#FAFAFA',
  boxesBorderColor: '#EFEFEF',
  tableHeaderColor: '#FFFFFF',
  secondaryTextColor: '#A3A3A3',
  secondaryItemColor: '#D9D9D9',
  secondaryGrayColor: '#D4D4D4',
  inactiveTextColor: '#5F6466',
  inactiveMenuBgColor: '#D9D9D9',
  buttonColor: '#FFFFFF',
  orangeButton: '#FFF7EC',
  grayButtonColor: '#D4D4D4',
  upgradeOverlayBgColor: '#A3A3A370',
  activePink: '#E6007A',
  activePurple: '#49346B',
  activeBlack: '#151515',
  graphSecondaryColor: '#DDE1E2',
  graphOpacityColor: '#DDE1E230',
  speedometerIndicator: '#404040',
  backbuttonColor: '#A3A3A3',
  chartsColor: '#D4D4D4',
  chartsAxisColor: '#D4D4D4',
  chartsGridColor: '#D4D4D4',
  chartsBgColor: '#FEFDFD',
  cryptoSelectorText: '#A3A3A3',
  activeCryptoSelector: '#FFFFFF',
  fundamentalsMenuText: '#A3A3A3',
  fundamentalsCompetitorsItemBg: '#FFFFFF',
  fundamentalsCompetitorsLabelColor: '#5F6466',
  fundamentalsLockIcon: '#4D4D4D',
  fundamentalsEmptyImage: '#E5E5E5',
  dAppsInactiveItem: '#E1E5EE',
  dAppsItemBg: '#FFFFFF',
  orangeTextColor: '#FF9521',
  whiteTextColor: '#F7F7F7',
  grayLabelColor: '#7D82A0',
  inactiveGrayText: '#9CA2B0',
  notificationsWSwitchColor: '#333333',
  lockIconColor: '#FFFFFF',
  grayArrowColor: '#A6ACC4',
  loaderColor: '#5F6466',
  loaderBgColor: '#FFFFFF',
  responsiveFontSize,
  titleFontSize: responsiveFontSize * 1.2,
  subscriptions: {
    subscriptionsBgColor: '#EDEDED',
    purchaseButtonBgColor: '#FFD5A7',
    purchaseButtonText: '#C93A05',
    activeButtonText: '#FAFAFA',
    text: '#404040',
    title: '#404040',
    foundersText: '#FAFAFA',
    boxesBgColor: '#FAFAFA',
    seeMoreColor: '#D4D4D4',
    iconsBgColor: '#FBFBFB',
    secondaryText: '#A3A3A3',
  },
  inactiveButtonText: '#C93A05',
  loginBgColor: '#E7EAF1',
  loginTitlesColor: '#B8BBBD',
  signUpTitlesColor: '#FFFFFF',
  signUpButtonText: '#FAFAFA',
  loginInputBgColor: '#FAFAFA',
  inputColor: '#000000',
  topMenuActiveBg: '#F9F9F933',
  activeSRButtonColor: '#80290E',
  askAiButtonColor: '#FFFFFF',
  skeletonLoaderBg: '#FFFFFF',
  horizontalLineColor: '#D4D4D4',
  boxesVerticalMargin: 8,
  titlesVerticalMargin: 24,
  font: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
  fontBold: isAndroid ? 'prompt_bold' : 'Prompt-Bold',
  fontItalic: isAndroid ? 'prompt_italic' : 'Prompt-Italic',
  fontMedium: isAndroid ? 'prompt_medium' : 'Prompt-Medium',
  fontSemibold: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
  fontBoldItalic: isAndroid
  ? 'prompt_semibold_italic'
  : 'Prompt-SemiBold-Italic',
  fontUnbounded: isAndroid ? 'unbounded_regular' : 'Unbounded-Regular',
  fontUnboundedMedium: isAndroid ? 'unbounded_medium' : 'Unbounded-Medium',
  fontUnboundedLight: isAndroid ? 'unbounded_light' : 'Unbounded-Light',
  fontUnboundedExtraLight: isAndroid
  ? 'unbounded_extra_light'
  : 'Unbounded-Extra-Light',
  fontUnboundedBold: isAndroid ? 'unbounded_bold' : 'Unbounded-Bold',
  fontUnboundedExtraBold: isAndroid
  ? 'unbounded_extra_bold'
  : 'Unbounded-Extra-Bold',
  fontUnboundedSemibold: isAndroid
    ? 'unbounded_semibold'
    : 'Unbounded-SemiBold',
    fontUnboundedBlack: isAndroid ? 'unbounded_black' : 'Unbounded-Black',
    backgroundSubscriptionsModal: '#FAFAFA',
  };
  
  export const darkThemeStyles = {
    width: width,
    height: height,
    mainBackgroundColor: '#0A0A0A',
    secondaryBgColor: '#171717',
    boxesBackgroundColor: '#262626',
    secondaryBoxesBgColor: '#A3A3A3',
    thirdBoxesBgColor: '#737373',
    activeOrange: '#FC5404',
    orange: '#FF6C0D',
    activeYellow: '#F9B208',
    inactiveColor: '#525252',
    activeWhite: '#737373',
    inactiveGray: '#C4CADA',
    subMenuBgColor: '#525252',
    titleColor: '#FFFFFF',
    textColor: '#FAFAFA',
  searchPlaceHolderColor: '#A3A3A3',
  supportAndResistanceText: '#FAFAFA',
  subMenuTextColor: '#FFFFFF',
  filterTextColor: '#A3A3A3',
  activeSubMenuText: '#F9FAFC',
  priceUpColor: '#09C283',
  priceDownColor: '#E93334',
  navbarBgColor: '#0A0A0A',
  boxesBorderColor: '#525252',
  tableHeaderColor: '#525252',
  secondaryTextColor: '#A3A3A3',
  secondaryItemColor: '#A6ACC4',
  secondaryGrayColor: '#737373',
  inactiveTextColor: '#F9FAFC',
  inactiveMenuBgColor: '#74788D',
  buttonColor: '#451205',
  orangeButton: '#451205',
  grayButtonColor: '#A3A3A3',
  upgradeOverlayBgColor: '#0A0A0A70',
  activePink: '#E6007A',
  activePurple: '#49346B',
  activeBlack: '#151515',
  graphSecondaryColor: '#85899F',
  graphOpacityColor: '#85899F30',
  speedometerIndicator: '#0A0A0A',
  backbuttonColor: '#A3A3A3',
  chartsColor: '#737373',
  chartsAxisColor: '#737373',
  chartsBgColor: '#74788D',
  chartsGridColor: '#73737360',
  cryptoSelectorText: '#FAFAFA',
  activeCryptoSelector: '#FFFFFF',
  fundamentalsMenuText: '#A3A3A3',
  fundamentalsCompetitorsItemBg: '#525252',
  fundamentalsCompetitorsLabelColor: '#D6DFE8',
  fundamentalsEmptyImage: '#737373',
  fundamentalsLockIcon: '#FAFAFA',
  dAppsInactiveItem: '#F9FAFC',
  dAppsItemBg: '#74788D',
  orangeTextColor: '#FF9521',
  whiteTextColor: '#F7F7F7',
  grayLabelColor: '#7D82A0',
  orangeLabelColor: '#FF9521',
  inactiveGrayText: '#BCC4EE',
  grayArrowColor: '#A7A9B4',
  loaderColor: '#C4CADA',
  loaderBgColor: '#424445',
  notificationsWSwitchColor: '#D9D9D9',
  lockIconColor: '#737373',
  askAiButtonColor: '#0A0A0A',
  skeletonLoaderBg: '#151515',
  horizontalLineColor: '#474747',
  responsiveFontSize,
  titleFontSize: responsiveFontSize * 1.2,
  subscriptions: {
    subscriptionsBgColor: '#10101E',
    purchaseButtonBgColor: '#A02E0C',
    purchaseButtonText: '#FFECD3',
    activeButtonText: '#451205',
    text: '#FAFAFA',
    title: '#FAFAFA',
    foundersText: '#FAFAFA',
    boxesBgColor: '#262626',
    seeMoreColor: '#737373',
    iconsBgColor: '#2D2D3D',
    secondaryText: '#A3A3A3',
  },
  inactiveButtonText: '#FFECD3',
  loginBgColor: '#242427',
  loginTitlesColor: '#B8BBBD',
  signUpTitlesColor: '#FFFFFF',
  loginInputBgColor: '#525252',
  signUpButtonText: '#451205',
  inputColor: '#ffffff',
  topMenuActiveBg: '#E9E9E933',
  activeSRButtonColor: '#FAFAFA',
  boxesVerticalMargin: 8,
  titlesVerticalMargin: 24,
  font: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
  fontBold: isAndroid ? 'prompt_bold' : 'Prompt-Bold',
  fontItalic: isAndroid ? 'prompt_italic' : 'Prompt-Italic',
  fontMedium: isAndroid ? 'prompt_medium' : 'Prompt-Medium',
  fontSemibold: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
  fontBoldItalic: isAndroid
    ? 'prompt_semibold_italic'
    : 'Prompt-SemiBold-Italic',
  fontUnbounded: isAndroid ? 'unbounded_regular' : 'Unbounded-Regular',
  fontUnboundedMedium: isAndroid ? 'unbounded_medium' : 'Unbounded-Medium',
  fontUnboundedLight: isAndroid ? 'unbounded_light' : 'Unbounded-Light',
  fontUnboundedExtraLight: isAndroid
  ? 'unbounded_extra_light'
    : 'Unbounded-Extra-Light',
    fontUnboundedBold: isAndroid ? 'unbounded_bold' : 'Unbounded-Bold',
    fontUnboundedExtraBold: isAndroid
    ? 'unbounded_extra_bold'
    : 'Unbounded-Extra-Bold',
  fontUnboundedSemibold: isAndroid
    ? 'unbounded_semibold'
    : 'Unbounded-SemiBold',
  fontUnboundedBlack: isAndroid ? 'unbounded_black' : 'Unbounded-Black',
  backgroundSubscriptionsModal: '#404040',
};
