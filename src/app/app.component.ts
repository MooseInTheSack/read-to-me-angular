import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private speechRecognition: SpeechRecognition, private tts: TextToSpeech) {}

  // Check feature available
  isRecognitionAvailable = async () => {
    return await this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) => { 
      console.log(available)
      return available;
    })
  }

  // Start the recognition process
  startListening() {
    const options = {
      language: "en-US",
      matches: 20,
      showPopup: false
    }

    this.speechRecognition.startListening(options)
    .subscribe(
      (matches: string[]) => {
        console.log("ducky matches: ", matches)
        
        //text-to-speech
        this.tts.speak('Hello World')
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason));
      },
      (onerror) => console.log('error:', onerror)
    )
  }
  
  // Stop the recognition process (iOS only)
  stopListening() {
    this.speechRecognition.stopListening()
  }

  // Get the list of supported languages
  getSupportedLanguages() {
    this.speechRecognition.getSupportedLanguages()
    .then(
      (languages: string[]) => console.log(languages),
      (error) => console.log(error)
    )
  }

  // Check permission
  hasPermission = async () => {
    return await this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      console.log(hasPermission)
      return hasPermission
    })
  }

  // Request permissions
  requestPermission() {
    this.speechRecognition.requestPermission()
    .then(
      () => { 
        console.log('Granted')
        this.startListening()
      },
      () => console.log('Denied')
    )
  }

  ngOnInit() {
    if(this.isRecognitionAvailable()) {
      if(this.hasPermission()) {
        this.startListening()
      } else {
        console.log("Permission is NOT available for speech recognition...")
        this.requestPermission()
      }
    } else {
      console.log("Speech Recognition is NOT available...")
    }
  }
}
