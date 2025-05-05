import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Next from '../assets/images/Next.svg';
import { NavigationTypes } from '../navigations/NavigationTypes';
import DropDown from '../assets/images/Dropdown.svg';

const locations = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '충청',
  '전라',
  '경상북도',
  '경상남도',
  '강원',
  '전북',
  '제주',
];

export default function BirthLocationScreen(
  props: NavigationTypes.BirthLocationScreenProps,
) {
  const [birth_date, setBirth] = useState('');
  const [location, setLocation] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { navigation } = props;

  const handleNext = () => {
    if (birth_date === '' || location === '') return;
    navigation.navigate('GenderEarnScreen');
  };

  return (
    <View className="flex w-screen h-screen bg-white">
      <View className="flex w-full h-1/6 items-center justify-end">
        <View className="flex w-4/5 h-[5px] rounded-full bg-gray-300 mb-4">
          <View className="flex w-2/4 h-full bg-[#09F2C3]" />
        </View>
      </View>
      <View className="flex w-full h-5/6">
        <View className="flex w-full h-2/3 items-center justify-center">
          <View className="flex w-5/6 h-5/6 ">
            <Text className="font-inter font-bold text-2xl">생년월일</Text>
            <View className="flex-row w-full h-[48px] bg-gray-200 rounded-xl my-2 mb-8 border-[#007AFF] border-2 px-4 font-inter text-base">
              <TextInput
                value={birth_date}
                onChangeText={setBirth}
                placeholder="2001.06.11"
                placeholderTextColor="#999"
                className=""
              />
            </View>
            <Text className="font-inter font-bold text-2xl">지역</Text>
            <Pressable
              onPress={() => setDropdownVisible(!isDropdownVisible)}
              className="flex w-full h-[48px] bg-gray-200 rounded-xl my-2 border-[#007AFF] border-2 px-4 justify-center"
            >
              <Text className="font-inter text-base text-black">
                {location}
              </Text>
              <View className="absolute right-4">
                <DropDown width={12} height={12} />
              </View>
            </Pressable>
            {isDropdownVisible && (
              <View className="mt-2 bg-white border border-[#007AFF] rounded-xl max-h-[200px]">
                <FlatList
                  data={locations}
                  keyExtractor={item => item}
                  nestedScrollEnabled
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setLocation(item);
                        setDropdownVisible(false);
                      }}
                      className="py-2 px-4"
                    >
                      <Text className="font-inter text-base">{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>
        <View className="flex w-full h-1/3 items-center justify-center">
          <Pressable
            className="flex-row w-5/6 h-[48px] bg-[#007AFF] rounded-xl items-center justify-center relative"
            onPress={handleNext}
          >
            <Text className="font-inter font-bold text-xl text-white">
              다음
            </Text>
            <View className="absolute right-5">
              <Next width={14} height={14} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
