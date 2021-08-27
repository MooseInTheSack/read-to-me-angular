import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { MusicControls } from '@ionic-native/music-controls/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private musicControls: MusicControls, private tts: TextToSpeech) {}

  speak = async (textToSpeak: string) => {
    await this.tts.speak(textToSpeak)
      .then(() => console.log('Successfully spoke'))
      .catch((reason: any) => console.log('tts.speak error: ', reason));
  }

  startContentLoop = async () => {
    //get content from server
    const testData = [
      {
        title: "Test Title 1",
        content: "Test Content 1"
      },
      {
        title: "Test Title 2",
        content: "Test Content 2"
      },
      {
        title: "Test Title 3",
        content: "Test Content 3"
      }
    ]

    for(let article of testData) {
      await this.speak(article.title)
      
      await this.speak(article.content)
    }

    
  }

  ngOnInit() {
    this.startContentLoop()
  }
  
}
