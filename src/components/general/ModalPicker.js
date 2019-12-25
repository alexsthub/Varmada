import React from 'react';
import {StyleSheet, View, Text, FlatList, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import ModalPickerOption from './ModalPickerOption';

export default class ModalPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const options =
      this.props.type === 'darkMode'
        ? [
            {title: 'On', active: this.props.darkMode},
            {title: 'Off', active: !this.props.darkMode},
          ]
        : [
            {title: 'English (US)', active: this.props.language.code === 'en'},
            {title: 'Spanish', active: this.props.language.code === 'es'},
          ];

    const title =
      this.props.type === 'darkMode'
        ? 'Dark Mode Selection'
        : 'Language Selection';

    return (
      <Modal
        isVisible={this.props.showModal}
        avoidKeyboard={this.props.avoidKeyboard}
        animationIn={this.props.animationIn}
        animationOut={this.props.animationOut}
        animationInTiming={this.props.animationInTiming}
        animationOutTiming={this.props.animationOutTiming}
        backdropTransitionOutTiming={0}
        backdropOpacity={this.props.backdropOpacity}
        onBackdropPress={this.props.closeModal}
        onBackButtonPress={this.props.closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleStyle}>{title}</Text>
              </View>
            </View>

            <FlatList
              style={{borderWidth: 1, borderColor: 'lightgray'}}
              data={options}
              renderItem={({item}) => (
                <ModalPickerOption
                  onPress={title => this.props.onPress(title)}
                  title={item.title}
                  active={item.active}
                />
              )}
              keyExtractor={item => item.title}
              ItemSeparatorComponent={() => (
                <View style={{height: 1, backgroundColor: 'lightgray'}} />
              )}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: 0.5,
    width: Dimensions.get('window').width * 0.8,
    elevation: 10,
  },
  modalContentContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

ModalPicker.propTypes = {
  showModal: PropTypes.bool,
  avoidKeyboard: PropTypes.bool,
  animationInTiming: PropTypes.number,
  animationOutTiming: PropTypes.number,
  backgdropOpacity: PropTypes.number,
  closeModal: PropTypes.func,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
};

ModalPicker.defaultProps = {
  showModal: false,
  avoidKeyboard: true,
  animationInTiming: 200,
  animationOutTiming: 200,
  backdropOpacity: 0.4,
  closeModal: () => {},
  animationIn: 'slideInUp',
  animationOut: 'slideOutDown',
};
