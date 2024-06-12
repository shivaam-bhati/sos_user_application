import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { centerHV, font30 } from '../utils/CommonStyles';
import { selectContactPhone } from 'react-native-select-contact';
import ContactCard from '../components/ContactCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GuardianSvg } from '../assets/svg';
import GuardiansApiService from '../services/guardians';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import useAsyncStorage from '../hooks/localStorage';
import { useNavigation } from '@react-navigation/native';
type Contact = {
  number: any;
  name: string;
  key:any;
};

type GuardiansContact = {
    _id: string,
    isActive: boolean,
    mobileNo: string,
    fullName: string
}


const Guardians = (props: any) => {

  const [contactList, setContactList]: [GuardiansContact[], Dispatch<SetStateAction<GuardiansContact[]>>] = useState([]);
  const [showContact, setShowContact] = useState(true);
  const [userId, setUserId] = useState("");

  const navigation = useNavigation();
  const {getItem}= useAsyncStorage();


  const removeGuardiansData = async () => {
    let guardiansId = '';
    const data = GuardiansApiService.delete(guardiansId)

  }

  useEffect(() => {
    requestContactPermission();
  }, []);

  const requestContactPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
      if (result === RESULTS.GRANTED) {
        console.log('Contacts permission granted');
      } else {
        console.log('Contacts permission denied');
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
    }
  };

  useEffect(()=>{
    const checkUser=async()=>{
      try {
    const value:any = await getItem('userId');
   // console.log("getItem('userId')>>>",value);
    const {guardian} = await GuardiansApiService.getByUserId(value);
    console.log("guardian>>>",guardian)
    // const {guardians}= users

   // guardians.filter((item:any)=>item.guardianId!=null)
    const arr = guardian.filter((item:any)=>item.user!=null).map((item: any) => {
      console.log("item>>>",item)
   
        const data= {
          _id: item._id,
      isActive: item.isActive,
      mobileNo: item.mobileNo,
      fullName: item.fullName
        }
        return data; // Assuming guardianId is directly accessible in each item
     
    });

    console.log('arr>>>', arr);

    setContactList(arr)
    setUserId(value);
    if (value == undefined) {
      navigation.navigate('Login');
    }
      } catch (error) {
        console.log(error)
      }
    }
    checkUser()
  },[])


  const getPhoneNumber = async() => {
    try {
      const contacts = await selectContactPhone();
      if (!contacts) {
        return null;
      }else{
        let { contact, selectedPhone } = contacts;
        const cleanedPhoneNumber = selectedPhone.number.replace(/[^\d]/g, '');
        const body ={
          mobileNo: cleanedPhoneNumber, fullName: contact.name ,
          user:userId
          }

          const {guardian} = await GuardiansApiService.create(body,userId);
          console.log("GuardiansApiService data>>",guardian)

      //addGuardians(body)
      setContactList(prev => [...prev, guardian]);
        return selectedPhone.number;
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleContact = async() => {
    try {
     getPhoneNumber();
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteContact = (contactId: string) => {
    // Remove the contact from the contactList and update the state
    setContactList((prevContactList) =>
      prevContactList.filter((contact) => contact._id !== contactId)
    );
  };

  return (

    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Guardians!</Text>

      </View>

      <ScrollView>

        {
          showContact ? <>
            {contactList.map((contact) => {
              return (<ContactCard contact={contact} onDeleteContact={handleDeleteContact} />)

            })}
          </> : <>
            <Image source={GuardianSvg} style={{ width: 'auto', height: 400, }} />
            <Text style={styles.messageText}>Please Add Guardians!</Text>
          </>
        }



      </ScrollView>
      <TouchableOpacity onPress={handleContact} style={styles.addIcon}>
        {/* <Text style={styles.plusIcon}>+</Text> */}
        <Icon name={'plus'} size={30} color={'black'} />

      </TouchableOpacity>
    </View>
  );
};

export default Guardians;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  addIcon: {
    alignSelf: 'flex-end',
    backgroundColor: '#D9D9D9',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 20,
    borderRadius: 100,
    marginBottom: 80
  },
  plusIcon: {
    fontSize: 25
  },
  headingText: {
    fontSize: 30,
    fontWeight: '600'
  },
  headingContainer: {
    backgroundColor: '#D9D9D9',
    padding: 10
  },
  messageText: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  }
})
