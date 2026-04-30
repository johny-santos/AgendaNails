import { View } from "react-native";

export default function ProgressSessions({ total = 4, done = 3 }) {
  return (
    <View style={{ flexDirection: "row", gap: 6, width: '100%' }}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            height: 8,
            borderRadius: 4,
            backgroundColor: index < done ? "#E91E63" : "#E0E0E0",
          }}
        />
      ))}
    </View>
  );
}