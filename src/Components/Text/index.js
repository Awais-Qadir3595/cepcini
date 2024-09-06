import React from 'react';
import {FontWeight, Typography} from '../../config/typography';
import {StyleSheet, Text} from 'react-native';
import {BaseColor} from '../../config/theme';

export default function Index(props) {
  const {
    //props style
    header,
    heading,
    title,
    title1,
    title2,
    title3,
    title4,
    small,
    headline,
    body1,
    body2,
    subhead,
    footnote,
    caption1,
    caption2,
    overline,
    tiny,
    // props font
    thin,
    ultraLight,
    light,
    regular,
    medium,
    semibold,
    bold,
    heavy,
    black,
    //custom color
    whiteColor,
    blackColor,
    primary,
    secondary,
    secondary2,
    whiteBackground,
    notSelected,
    textGrey,
    textGreyDark,
    statusBarBlue,
    notesBackground,
    textHome,
    green,
    //extra
    numberOfLines,
    textAlign,
    //custom
    style,
    //children
    children,
    iserror,
    maxLength = 250,
  } = props;

  // const { colors } = useTheme();
  // const font = useFont();

  let textStyle = StyleSheet.flatten([
    header && Typography.header,
    title && Typography.title,
    title1 && Typography.title1,
    title2 && Typography.title2,
    title3 && Typography.title3,
    title4 && Typography.title4,
    heading && Typography.heading,
    small && Typography.small,
    headline && Typography.headline,
    body1 && Typography.body1,
    body2 && Typography.body2,
    subhead && Typography.subhead,
    footnote && Typography.footnote,
    caption1 && Typography.caption1,
    caption2 && Typography.caption2,
    overline && Typography.overline,
    tiny && Typography.tiny,

    //custom for font
    thin && {fontWeight: FontWeight.thin},
    ultraLight && {fontWeight: FontWeight.ultraLight},
    light && {fontWeight: FontWeight.light},
    regular && {fontWeight: FontWeight.regular},
    medium && {fontWeight: FontWeight.medium},
    semibold && {fontWeight: FontWeight.semibold},
    bold && {fontWeight: FontWeight.bold},
    heavy && {fontWeight: FontWeight.heavy},
    black && {fontWeight: FontWeight.black},
    // default color
    {color: BaseColor.textGrey},
    //custom for color
    whiteColor && {color: BaseColor.whiteColor},
    blackColor && {color: BaseColor.textBlack},
    primary && {color: BaseColor.primary},
    secondary && {color: BaseColor.secondary},
    secondary2 && {color: BaseColor.secondary2},
    whiteBackground && {color: BaseColor.whiteBackground},
    notSelected && {color: BaseColor.notSelected},
    textGrey && {color: BaseColor.textGrey},
    textGreyDark && {color: BaseColor.textGreyDark},
    statusBarBlue && {color: BaseColor.statusBarBlue},
    iserror && {color: BaseColor.errorColor},
    notesBackground && {color: BaseColor.notesBackground},
    textHome && {color: BaseColor.textHome},
    green && {color: BaseColor.green},
    //Lato Fonts
    // thin && {fontFamily: 'PlayfairDisplay-Medium'},
    // light && {fontFamily: 'PlayfairDisplay-Regular'},
    // regular && {fontFamily: 'PlayfairDisplay-Regular'},
    // bold && {fontFamily: 'PlayfairDisplay-Bold'},
    // black && {fontFamily: 'PlayfairDisplay-Black'},
    // ultraLight && {fontFamily: 'PlayfairDisplay-Medium'},
    // medium && {fontFamily: 'PlayfairDisplay-Medium'},
    // heavy && {fontFamily: 'PlayfairDisplay-ExtraBold'},
    // semibold && {fontFamily: 'PlayfairDisplay-SemiBold'},
    {
      textAlign,
    },
    // !thin &&
    //   !light &&
    //   !regular &&
    //   !bold &&
    //   !black &&
    //   !ultraLight &&
    //   !medium &&
    //   !heavy &&
    //   !semibold && {fontFamily: 'PlayfairDisplay-Regular'},

    style && style,
  ]);
  return (
    <Text style={textStyle} maxLength={maxLength} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
