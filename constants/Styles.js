import Colors from './Colors';

export default {
  body: {
    flex: 1,
    backgroundColor: Colors.white
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
  pageTitle: {
    marginTop: 10
  },
  pageSubTitle: {
    fontFamily: 'Futura',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  paragraphText: {
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 25
  },
  paragraphTextNote: {
    color: Colors.darkGray
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
  pillButton: {
    marginRight: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: Colors.white
  },
  pillButtonSelected: {
    backgroundColor: Colors.secondaryColor
  },
  pillButtonText: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 16,
    textAlign: 'center'
  },
  pillButtonTextSelected: {
    color: Colors.white
  },
  linkButton: {
    padding: 12,
    backgroundColor: 'transparent'
  },
  link: {
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1
  },
  whiteColor: {
    color: Colors.white
  },
  greenColor: {
    color: Colors.primaryGreen
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
      fontFamily: 'Futura-Medium',
      fontSize: 28,
      color: Colors.black,
      // marginBottom: 10,
      padding: 15,
      // backgroundColor: Colors.lightGray,
      // borderRadius: 1,
      // borderBottomColor: Colors.lightGray,
      // borderBottomWidth: 2,
      textAlign: 'center'
    }
  },
  listItem: {
    marginBottom: 20
  },
  button: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: Colors.primaryColor
  },
  buttonInverted: {
    // padding: 10,
    // borderRadius: 2,
    backgroundColor: Colors.white,
    borderColor: Colors.primaryColor,
    borderWidth: 2
  },
  buttonCircular: {
    borderRadius: 100,
    backgroundColor: Colors.primaryColor,
    alignSelf: 'center',
    width: 65,
    height: 65
  },
  buttonCircularInverted: {
    borderRadius: 100,
    backgroundColor: Colors.white,
    // alignSelf: 'center',
    width: 65,
    height: 65,
    borderWidth: 2,
    borderColor: Colors.primaryColor
  },
  buttonCircularIcon: {
    marginTop: 23,
    alignSelf: 'center',
    color: Colors.white
  },
  buttonCircularText: {
    marginTop: 23,
    alignSelf: 'center',
    color: Colors.white
  },
  buttonCircularInvertedText: {
    marginTop: 23,
    alignSelf: 'center',
    color: Colors.primaryColor,
    fontWeight: 'bold'
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  buttonInvertedText: {
    color: Colors.primaryColor,
    // fontWeight: 'bold',
    // fontSize: 18,
    // textAlign: 'center'
  },
  buttonWithIconText: {
    paddingBottom: 4
  },
  buttonWithIconToLeftText: {
    paddingLeft: 5
  },
  modalContent: {
    margin: 10
  },
  modalH1: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    marginBottom: 30
  },
  modalParagraph: {
    fontSize: 20,
    marginBottom: 15
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  modalButton: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    borderRadius: 100
  },
  modalButtonText: {
    color: Colors.white,
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalButtonTextNoBackground: {
    color: Colors.primaryColor,
    letterSpacing: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  },
  modalButtonTextNoBackgroundDisabled: {
    color: Colors.gray
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
    letterSpacing: 2,
    fontSize: 16,
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
    fontSize: 16,
    marginBottom: 5,
    letterSpacing: 2
  },
  loadingMessage: {
    color: Colors.gray,
    fontSize: 16
  },
  menuItemWrapper: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.lightGray,
    borderBottomWidth: 1,
    borderColor: Colors.white
  },
  menuItem: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    paddingTop: 20,
    paddingBottom: 5,
    letterSpacing: 1
  },
  menuItemSubText: {
    fontSize: 18,
    color: Colors.black,
    marginBottom: 10
  },
  biometricRow: {
    // alignSelf: 'stretch',
    // flexDirection: 'row',
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray
  },
  inputLabel: {
    fontSize: 16,
    letterSpacing: 2,
    marginBottom: 10
  },
  finePrint: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 20
  },
  tabButtons: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: Colors.gray,
    paddingTop: 10
  },
  tabButton: {
    flex: 1,
    borderBottomWidth: 3,
    borderColor: Colors.gray,
    padding: 10
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderColor: Colors.black,
    paddingBottom: 15
  },
  tabButtonText: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: 16,
    letterSpacing: 1
  },
  tabButtonTextActive: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: 16,
    letterSpacing: 1
  },
  flexRow: {
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  flexRowStart: {
    alignItems: 'flex-start',
  },
  flexRowCenter: {
    alignItems: 'flex-center',
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
    opacity: 0.8,
    // zIndex: 1
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
    borderRadius: 2,
    zIndex: 10
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
  },
  verticalText: {
    transform: [{ rotate: '-90deg'}]
  },
  emptyMessage: {
    color: Colors.gray,
    fontSize: 18
  }
}
