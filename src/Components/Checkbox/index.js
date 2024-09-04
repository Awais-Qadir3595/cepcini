import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Text, Icon, Icons} from '..';
import {BaseColor, useTheme} from '../../config/theme';

const Index = props => {
  const colors = useTheme();
  const {
    check = false,
    func,
    label = '',
    color = colors.textGrey,
    size = 18,
    containerStyle,
    isLTR,
  } = props;

  return (
    <View style={[styles.pressable, containerStyle]}>
      <Pressable
        onPress={func}
        style={{
          flexDirection: isLTR ? 'row-reverse' : 'row',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.mainView,
            {
              height: size,
              width: size,
              borderColor: color,
              borderWidth: 1,
              backgroundColor: check ? colors.secondary : colors.whiteColor,
            },
          ]}>
          {check && (
            <Icon name={Icons.CHECK} color={colors.primary} size={12} />
          )}
        </View>

        {label !== '' && (
          <Text body1 style={{marginHorizontal: 10}} textGrey>
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: BaseColor.whiteColor,
    padding: 7,
    marginBottom: 3,
  },
  mainView: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});
