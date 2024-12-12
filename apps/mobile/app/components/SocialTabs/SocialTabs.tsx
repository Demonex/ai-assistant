import { useArtist } from "../../hooks/Artist/useArtist";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { overviewSources } from "../../consts/favoriteSources";
import { useCallback } from "react";
import get from "lodash.get";

const SocialTabs = ({ onPress }) => {
  const { source, setSource } = useArtist();


  return (
    <ScrollView horizontal className="border-b space-x-6 flex whitespace-nowrap border-slate-200/5 flex-grow-0"
                showsHorizontalScrollIndicator={false}>
      {
        overviewSources.map((sourceItem, index) => {

          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPress(index)}
              className={`border-b ${source === sourceItem.slug ? " border-indigo-500" : "border-transparent "}`}
            >
              <Text
                className={`pt-3 pb-2.5 capitalize flex text-4 leading-6 font-semibold ${source === sourceItem.slug ? "text-indigo-400 border-indigo-500" : "border-transparent text-slate-200 "}`}>{sourceItem.name}</Text>
            </TouchableOpacity>
          );
        })
      }
    </ScrollView>

  );
};

export default SocialTabs;