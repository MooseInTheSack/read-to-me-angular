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
      console.log('isRecognitionAvailable: ', available)
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
          .then(() => console.log('Successfully spoke'))
          .catch((reason: any) => console.log(reason));
        
      },
      (onerror) => console.log('startListening error:', onerror)
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
      console.log('hasPermission: ', hasPermission)
      return hasPermission
    })
  }

  // Request permissions
  requestPermission() {
    this.speechRecognition.requestPermission()
    .then(
      () => { 
        console.log('3a: Granted')
      },
      () => console.log('3b: Denied')
    )
  }

  ngOnInit() {
    
    this.requestPermission()
    this.startListening()
    /*
    if(this.isRecognitionAvailable()) {
      console.log('1a: ')
      if(this.hasPermission()) {
        console.log('2a: Permission is available')
        this.startListening()
      } else {
        console.log("2b: Permission is NOT available for speech recognition...")
        this.requestPermission()
      }
    } else {
      console.log("1b: Speech Recognition is NOT available...")
    }
    */
  }
  
}
