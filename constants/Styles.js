import Colors from './Colors';

export default {
  body: {
    flex: 1
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: Colors.primaryColor
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 24
  },
  paragraphText: {
    fontSize: 16,
    marginBottom: 20
  },
  center: {
    alignItems: 'center',
  },
  errorText: {
    color: '#FF4444'
  },
  content: {
    flex: 1,
    padding: 20
  },
  contentHeading: {
    padding: 5,
    fontSize: 18,
    textAlign: 'center'
  },
  forms: {
    textInput: {
      height: 40,
      margin: 5,
      padding: 5,
      borderColor: 'gray',
      borderWidth: 1
    }
  },
  listItem: {
    marginBottom: 20
  },
  modalContent: {
    margin: 10
  },
  modalH1: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 30
  },
  modalButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
    padding: 20,
    backgroundColor: Colors.primaryColor
  },
  modalButtonText: {
    color: Colors.white,
    letterSpacing: 1,
    fontWeight: 'bold'
  },
  h3: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  menuItem: {
    backgroundColor: Colors.paleBlue,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    padding: 20
  },
  biometricRow: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray
  },
  finePrint: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 20
  }
}
