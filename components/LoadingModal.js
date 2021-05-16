import React from 'react'
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native'
import TitleText from './TitleText';

const LoadingModal = ({ visible, text, color }) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={color} />
          <TitleText style={{color: color}} >{text}</TitleText>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

});
