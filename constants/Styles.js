import Colors from './Colors';

export default {
  body: {
    flex: 1,
    backgroundColor: Colors.white
  },
  nameHeader: {
    backgroundColor: Colors.secondaryColor,
    paddingTop: 10,
    paddingBottom: 10
  },
  nameHeaderText: {
    textAlign: 'center'
  },
  header: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingLeft: 20
  },
  title: {
    paddingTop: 10,
    backgroundColor: Colors.primaryColor
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 24
  },
  bigTitle: {
    fontFamily: 'Futura',
    fontWeight: '700',
    fontSize: 32,
    // fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  paragraphText: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 25
  },
  center: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center'
  },
  errorText: {
    color: '#FF4444'
  },
  link: {
    color: Colors.primaryColor,
    fontWeight: 'bold'
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
      fontSize: 20,
      margin: 5,
      padding: 15,
      //backgroundColor: Colors.lightGray,
      // borderRadius: 1,
      borderBottomColor: Colors.lightGray,
      borderBottomWidth: 1
    }
  },
  listItem: {
    marginBottom: 20
  },
  button: {
    padding: 8,
    borderRadius: 2,
    backgroundColor: Colors.primaryColor
  },
  buttonText: {
    fontFamily: 'Futura-Medium',
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  modalContent: {
    margin: 10
  },
  modalH1: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    marginBottom: 30
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  modalButton: {
    flex: 1,
    marginTop: 30,
    marginBottom: 50,
    padding: 20,
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    borderRadius: 2
  },
  modalButtonText: {
    color: Colors.white,
    letterSpacing: 1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalButtonCancel: {
    flex: 1,
    marginTop: 30,
    marginBottom: 50,
    marginRight: 5,
    padding: 20,
    backgroundColor: Colors.white,
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    borderRadius: 2
  },
  modalButtonCancelText: {
    color: Colors.primaryColor,
    letterSpacing: 1,
    fontWeight: 'bold'
  },
  modalButtonDisabled: {
    backgroundColor: Colors.gray,
    borderColor: Colors.gray
  },
  modalButtonDisabledText: {
    color: Colors.white
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  h3: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  loadingMessage: {
    color: Colors.gray,
    fontSize: 16
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
  },
  flexRow: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  flexRowCol: {
    width: '50%'
  },
  flexCol: {
    flex: 1
  },
  showModal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.gray,
    opacity: 0.8
  },
  tooltip: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    margin: 20,
    padding: 30,
    borderRadius: 2
  },
  tooltipHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primaryColor,
    marginBottom: 16
  },
  tooltipParagraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16
  },
  tooltipClose: {
    marginBottom: 16
  },
  tooltipTerm: {
    fontWeight: 'bold'
  }
}
