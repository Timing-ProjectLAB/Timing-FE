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
import Check from '../assets/images/Check.svg';
import { useUser } from '../contexts/UserContext'; // ✅ 추가



const earnings = [
  '1분위',
  '2분위',
  '3분위',
  '4분위',
  '5분위',
  '6분위',
  '7분위',
  '8분위',
  '9분위',
  '10분위',
];

export default function GenderEarnScreen(
  props: NavigationTypes.GenderEarnScreenProps,
) {
  const [income_bracket, setIncomeBracket] = useState('');
  const [occupation, setOccupation] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [gender, setGender] = useState<'남성' | '여성' | null>(null);
  const { navigation } = props;

  const { setUserInfo } = useUser(); // ✅ Context 사용

  const handleNext = () => {
    if (income_bracket === '' || occupation === '' || gender === null) return;

   setUserInfo({ gender: 1, incomeLevel: 3, occupation: '학생' });

    navigation.navigate('RegisterCompleteScreen');
  };

  return (
    <View className="flex w-screen h-screen bg-white">
      <View className="flex w-full h-1/6 items-center justify-end">
        <View className="flex w-4/5 h-[5px] rounded-full bg-gray-300 mb-4">
          <View className="flex w-3/4 h-full bg-[#09F2C3]" />
        </View>
      </View>
      <View className="flex w-full h-5/6 ">
        <View className="flex w-full h-2/3 items-center justify-center">
          <View className="flex w-5/6 h-5/6">
            <View>
              <Text className="font-inter font-bold text-2xl">성별</Text>
              <View className="flex-row w-full h-[48px] my-2">
                {['남성', '여성'].map(option => {
                  const selected = gender === option;
                  return (
                    <Pressable
                      key={option}
                      onPress={() => setGender(option as '남성' | '여성')}
                      className={`flex-1 h-full border border-gray-400 justify-center items-center flex-row px-4 ${
                        selected ? 'bg-gray-300' : 'bg-white'
                      }`}
                    >
                      <View className="mr-2 w-[16px] h-[16px] items-center justify-center">
                        {selected && <Check width={16} height={16} />}
                      </View>
                      <Text className="font-inter text-lg">{option}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text className="font-inter font-bold text-2xl">직업</Text>
              <TextInput
                value={occupation}
                onChangeText={setOccupation}
                className="flex w-full h-[48px] bg-gray-200 rounded-xl my-2 border-[#007AFF] border-2 px-4 font-inter text-base"
                placeholderTextColor="#999"
              />
              <Text className="font-inter font-bold text-2xl">소득분위</Text>
              <Pressable
                onPress={() => setDropdownVisible(!isDropdownVisible)}
                className="flex w-full h-[48px] bg-gray-200 rounded-xl my-2 border-[#007AFF] border-2 px-4 justify-center"
              >
                <Text className="font-inter text-base text-black">
                  {income_bracket}
                </Text>
                <View className="absolute right-4">
                  <DropDown width={12} height={12} />
                </View>
              </Pressable>
              {isDropdownVisible && (
                <View className="mt-2 bg-white border border-[#007AFF] rounded-xl max-h-[200px]">
                  <FlatList
                    data={earnings}
                    keyExtractor={item => item}
                    nestedScrollEnabled
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setIncomeBracket(item);
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
        </View>
        <View className="flex w-full h-1/3 items-center justify-center">
          <Pressable
            className="flex-row w-5/6 h-[48px] bg-[#007AFF] rounded-xl items-center justify-center relative"
            onPress={() => handleNext()}
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
