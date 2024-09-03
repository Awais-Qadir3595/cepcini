import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  Keyboard,
} from 'react-native';
import {Icon, Icons, Text} from '..';
import {BaseColor, useTheme} from '../../config/theme';

const SelectList = ({
  label,
  required,
  setSelected,
  placeholder,
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  maxHeight,
  data,
  defaultOption,
  searchicon = false,
  arrowicon = false,
  closeicon = false,
  search = true,
  searchPlaceholder = 'search',
  notFoundText = 'No data found',
  disabledItemStyles,
  disabledTextStyles,
  onSelect = () => {},
  selected,
  dropdownShown = false,
  fontFamily,
  schema = {
    label: 'label',
    value: 'value',
  },
}) => {
  const colors = useTheme();
  const oldOption = useRef(null);
  const [_firstRender, _setFirstRender] = useState(true);
  const [dropdown, setDropdown] = useState(dropdownShown);
  const [selectedval, setSelectedVal] = useState('');
  const [height, setHeight] = useState(200);
  const animatedvalue = useRef(new Animated.Value(0)).current;
  const [filtereddata, setFilteredData] = useState(data);

  const slidedown = () => {
    setDropdown(true);
    Animated.timing(animatedvalue, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const slideup = () => {
    Animated.timing(animatedvalue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setDropdown(false));
  };

  useEffect(() => {
    setSelectedVal('');
  }, [data]);

  useEffect(() => {
    if (maxHeight) setHeight(maxHeight);
  }, [maxHeight]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (_firstRender) {
      _setFirstRender(false);
      return;
    }
    onSelect();
  }, [selectedval]);

  useEffect(() => {
    if (
      !_firstRender &&
      defaultOption &&
      oldOption.current != defaultOption.key
    ) {
      // oldOption.current != null
      oldOption.current = defaultOption.key;
      setSelected(defaultOption);
      setSelectedVal(defaultOption.value);
    }
    if (defaultOption && _firstRender && defaultOption.key != undefined) {
      oldOption.current = defaultOption.key;
      setSelected(defaultOption);
      setSelectedVal(defaultOption.value);
    }
  }, [defaultOption]);

  useEffect(() => {
    if (!_firstRender) {
      if (dropdownShown) slidedown();
      else slideup();
    }
  }, [dropdownShown]);

  const getReq = () => {
    if (!selected && required) {
      return true;
    }
    return false;
  };

  return (
    <View>
      {label && (
        <Text body2 medium>
          {`${label} `}
          {required && (
            <Text body1 bold iserror>
              {'*'}
            </Text>
          )}
        </Text>
      )}
      {dropdown && search ? (
        <View style={[styles.wrapper, boxStyles]}>
          <View style={styles.searchView}>
            {!searchicon ? (
              <Icon
                name={Icons.SEARCH}
                type={'ant'}
                color={colors.textGrey}
                size={20}
              />
            ) : (
              searchicon
            )}

            <TextInput
              placeholder={searchPlaceholder}
              onChangeText={val => {
                val = val.toLowerCase();
                let result = data.filter(item => {
                  let row = item[schema.label].toLowerCase();
                  if (row.includes(val)) return item;
                });
                setFilteredData(result);
              }}
              style={[
                {
                  padding: 0,
                  height: 20,
                  flex: 1,
                  fontFamily,
                  color: BaseColor.textGrey,
                },
                inputStyles,
              ]}
            />
            <TouchableOpacity onPress={() => slideup()}>
              {!closeicon ? (
                <Icon
                  name={Icons.CLOSE}
                  type={'ant'}
                  color={colors.textGrey}
                  size={20}
                />
              ) : (
                closeicon
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.wrapper, boxStyles, getReq() && styles.requiredView]}
          onPress={() => {
            if (!dropdown) {
              Keyboard.dismiss();
              slidedown();
            } else {
              slideup();
            }
          }}>
          <Text
            style={[
              {
                fontFamily,
                color:
                  selected == null ? BaseColor.textGrey : BaseColor.textGrey,
              },
              inputStyles,
            ]}>
            {selected == null
              ? placeholder
                ? placeholder
                : `Select Item`
              : selected[schema.label]}
          </Text>
          {!arrowicon ? (
            <Icon
              name={Icons.ANGLE_DOWN}
              color={colors.textGrey}
              size={20}
            />
          ) : (
            arrowicon
          )}
        </TouchableOpacity>
      )}

      {dropdown ? (
        <Animated.View
          style={[{maxHeight: animatedvalue}, styles.dropdown, dropdownStyles]}>
          <ScrollView
            contentContainerStyle={{paddingVertical: 10, overflow: 'hidden'}}
            nestedScrollEnabled={true}>
            {filtereddata.length >= 1 ? (
              filtereddata.map((item, index) => {
                let key = item[schema.key] ?? item[schema.value] ?? item;
                let value = item[schema.label] ?? item;
                let disabled = item.disabled ?? false;
                if (disabled) {
                  return (
                    <TouchableOpacity
                      style={[styles.disabledoption, disabledItemStyles]}
                      key={index}
                      onPress={() => {}}>
                      <Text
                        style={[
                          {color: '#c4c5c6', fontFamily},
                          disabledTextStyles,
                        ]}>
                        {value}
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={[styles.option, dropdownItemStyles]}
                      key={index}
                      onPress={() => {
                        setSelected(item);

                        setSelectedVal(value);
                        slideup();
                        setTimeout(() => {
                          setFilteredData(data);
                        }, 800);
                      }}>
                      <Text textGrey style={[{fontFamily}, dropdownTextStyles]}>
                        {value}
                      </Text>

                      {selected && selected[schema.label] == value && (
                        <Icon
                          name={Icons.CHECKANT}
                          type={'ant'}
                          color={colors.textGrey}
                          size={20}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }
              })
            ) : (
              <TouchableOpacity
                disabled={true}
                style={[styles.option, dropdownItemStyles]}
                onPress={() => {
                  setSelected(undefined);
                  setSelectedVal('');
                  slideup();
                  setTimeout(() => setFilteredData(data), 800);
                }}>
                <Text textHome style={[{fontFamily}, dropdownTextStyles]}>
                  {notFoundText}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default SelectList;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: BaseColor.textGrey,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: BaseColor.whiteColor,
    // shadowColor: BaseColor.primary,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 8,
  },
  requiredView: {
    borderBottomWidth: 2,
    borderBottomColor: '#e67567',
  },
  dropdown: {
    borderWidth: 1,    
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // borderTopRightRadius: 20,

    borderColor: BaseColor.textGrey,
    marginTop: 3,
    overflow: 'hidden',

    backgroundColor: BaseColor.whiteColor,
    // shadowColor: BaseColor.primary,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 8,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disabledoption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    opacity: 0.9,
  },
  searchView: {flexDirection: 'row', alignItems: 'center', flex: 1},
});
