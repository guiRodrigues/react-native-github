import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  background: #eee;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0 15px;
  height: 40px;
`;

export const SubmitButton = styled(RectButton)`
  background-color: #7159c1;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  padding: 0 12px;
  border-radius: 4px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 4px;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  color: #999;
  line-height: 18px;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  border-radius: 4px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  padding: 15px 0;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
`;
