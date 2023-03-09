import { useNavigate, useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        /*  console.log(response.data); */
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigation();
  return <View></View>;
}
