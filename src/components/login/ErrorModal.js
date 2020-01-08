import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

export default class ErrorModal extends React.Component {
  render() {
    return (
      <Modal
        isVisible={this.props.showModal}
        avoidKeyboard={this.props.avoidKeyboard}
        animationInTiming={this.props.animationInTiming}
        animationOutTiming={this.props.animationOutTiming}
        backdropOpacity={this.props.backdropOpacity}
        onBackdropPress={this.props.closeModal}
        onBackButtonPress={this.props.closeModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{this.props.title}</Text>
          <Text style={styles.modalDescription}>{this.props.description}</Text>
          <TouchableOpacity
            onPress={this.props.closeModal}
            style={styles.modalButton}>
            <Text style={styles.modalButtonText}>{this.props.buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0.5,
    width: Dimensions.get('window').width * 0.8,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 5,
    marginTop: 10,
  },
  modalDescription: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  modalButton: {
    borderTopWidth: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

ErrorModal.propTypes = {
  showModal: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  avoidKeyboard: PropTypes.bool,
  animationInTiming: PropTypes.number,
  animationOutTiming: PropTypes.number,
  backgdropOpacity: PropTypes.number,
  closeModal: PropTypes.func,
};

ErrorModal.defaultProps = {
  showModal: false,
  title: '',
  description: '',
  buttonText: '',
  avoidKeyboard: true,
  animationInTiming: 200,
  animationOutTiming: 200,
  backdropOpacity: 0.4,
};
