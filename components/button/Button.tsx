import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface PressableProps {
  icon: any;
  size: number;
  color: string;
  style: ViewStyle;
  onPress: () => void;
}

function Pressable({ icon, size, color, style, onPress }: PressableProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <MaterialIcons
        name={icon}
        size={size ? size : 28} //if size is passed in props we use it else we use 28
        color={color ? color : '#f1f1f1'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Pressable;
