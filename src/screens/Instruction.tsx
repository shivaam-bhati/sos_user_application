import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { List } from 'react-native-paper';

const Instruction = () => {
  let instructionData = [
    {
      id: '01',
      heading: 'Device Setup',
      content: [
        "Ensure easy access and power supply.",
        "Activate using the designated 'Start' button or equivalent."
      ]

    }, {
      id: '02',
      heading: 'Operational Steps',
      content: [
        "Follow on-screen instructions or prompts closely.",
        "Verify completion by reviewing the displayed summary."
      ]

    }, {
      id: '03',
      heading: 'Further Guidance',
      content: [
        "Refer to the provided user manual for detailed instructions.",
        "Contact customer support for immediate assistance if needed."
      ]

    }, {
      id: '04',
      heading: 'Post-Usage Care',
      content: [
        "Power off the device after completing tasks.",
        "Store it in a dry and secure location.",
        "Prevent exposure to extreme temperatures for longevity.",
        "Keep the device away from water or high humidity areas to maintain functionality."

      ]

    }
  ]
  return (
    <View style={styles.instructionContainer}>
      <Text style={styles.headingTop}>Guidance on usage!</Text>
      <List.AccordionGroup>

        {instructionData.map((item) => (
          <List.Accordion title={item.heading} id={item.id}>
            {item.content.map((itemContent) => (
              <List.Item title={`\u2022 ${itemContent}`} />

            ))}
          </List.Accordion>
        ))}
      </List.AccordionGroup>
    </View>
  )
}

export default Instruction

const styles = StyleSheet.create({
  instructionContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  headingTop: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '5%',
    marginBottom: '3%',
  },
})


