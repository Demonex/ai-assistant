import { Alert, Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const ModalFeed = ({setOpenModalFeed,openModalFeed}) => {
  const toggleModal = () => {
    setOpenModalFeed(!openModalFeed);
  };
  return (
    <View style={{ flex: 1, }}>
      <Modal isVisible={openModalFeed} animationIn='zoomIn' animationOut='zoomOut' backdropTransitionInTiming={200} animationInTiming={200}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '80%', height: '25%', backgroundColor: '#111827', borderRadius: 16, padding: 20}}>
          <Text className="font-bold text-white mb-4 text-base text-center">You've Found A Premium
            Feature!&nbsp; 😎</Text>
            <Text className ="text-sm capitalize text-indigo-400 font-light text-center"> Subscribe in order to filter by source type.</Text>
            <View className="w-full flex flex-row py-3 justify-end gap-4 mt-4">
              <TouchableOpacity className="px-4 py-2  rounded-[8px] border border-indigo-500 " onPress={toggleModal}>
                <Text className='text-white text-xs'>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity  className="px-4 py-2  rounded-[8px] bg-indigo-400 " onPress={toggleModal}>
                <Text className='text-white text-xs'>Subscribe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalFeed