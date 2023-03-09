import { View, Text, Image } from "react-native";

const LogoHeader = () => {
  return (
    <Image
      style={{ height: 50, width: 50 }}
      source={require("../assets/images/logo.png")}
    />
  );
};

export default LogoHeader;
