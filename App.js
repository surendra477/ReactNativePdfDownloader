import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {downloadFile, getDownloadPermissionAndroid} from './src/Functions';

const App = () => {
  const fileUrl = 'https://www.africau.edu/images/default/sample.pdf';
  return (
    <View>
      <Text style={styles.titleText}>File Download Demo App</Text>
      <Text style={styles.titleText}>{fileUrl}</Text>
      <TouchableOpacity
        style={[styles.btnStyle]}
        onPress={() => {
          if (Platform.OS === 'android') {
            getDownloadPermissionAndroid().then(granted => {
              if (granted) {
                downloadFile(fileUrl);
              }
            });
          } else {
            downloadFile(fileUrl).then(res => {
              RNFetchBlob.ios.previewDocument(res.path());
            });
          }
        }}>
        <Text style={styles.textStyle}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 15,
  },
  textStyle: {
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 25,
  },
  btnStyle: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: 150,
    height: 40,
  },
});
