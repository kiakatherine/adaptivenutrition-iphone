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
    fontSize: 16
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
  h3: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  }
}
