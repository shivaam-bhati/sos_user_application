import { View, StyleSheet, Image, Text, TouchableOpacity, PanResponder } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import GuardiansApiService from '../services/guardians';


const ContactCard = ({contact}:any,onDeleteContact:any) => {

  const removeGuardiansData = async (guardiansId:any) => {
    const data = GuardiansApiService.delete(guardiansId);
    onDeleteContact(guardiansId);

  }


  const panResponder = (id:any) => {
    let dx = 0;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        dx = gestureState.dx;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (dx > 50) {
          // Swipe right threshold, you can adjust this value
          // handleDeleteItem(id);
          console.log(id)
        }
      },
    });
  };
  return (

    <View style={styles.container} {...panResponder(1).panHandlers}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>{contact.fullName.charAt(0)}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.contentContainerHeaderText}>{contact.fullName}</Text>
        </View>
        <View>
          <Text style={styles.contentContainerNumberText}>{contact.mobileNo}</Text>
        </View>

      </View>
      <TouchableOpacity style={styles.deleteIcon}>
        <Icon name={'trash'}  onPress={()=>{removeGuardiansData(contact._id)}} size={30} color={'red'} />
      </TouchableOpacity>

    </View>
  )
}

export default ContactCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    margin:10,
    elevation: 5,
    shadowColor: '#4a4848',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2, 

  },
  icon: {
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:40
  },
  iconText: {
    fontSize: 23,
    fontWeight: '600'
  },
  contentContainer: {
    marginLeft: -140,
    justifyContent: 'center'
  },
  contentContainerHeaderText: {
    fontSize: 18,
    fontWeight: '500'
  },
  contentContainerNumberText: {
    fontSize: 16,
  },
  deleteIcon: {
    justifyContent: 'center',
    marginRight: 10
  }
})