import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Capacitor } from '@capacitor/core';


@Component({
    selector: 'app-speech-transcriber',
    templateUrl: './speech-transcriber.component.html',
    styleUrls: ['./speech-transcriber.component.css'],
    standalone: true,
    imports: [
        BootstrapIconsModule,
        ReactiveFormsModule,
        NgClass,
        FormsModule,
    ],
})
export class SpeechTranscriberComponent implements OnInit, OnDestroy {
  @ViewChild('textArea') textArea!: ElementRef;

  isMobile: boolean = true;

  textSpeech = '';

  recognition: any;
  isListening = false;
  isSpeaking = false;

  fontSize = 15;
  speechForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    const isNative = Capacitor.isNativePlatform();

    if (isNative) {
      this.initNativeRecognition();
    } else {
      this.initWebRecognition();
    }

    this.speechForm = this.fb.group({
      textSpeech: [''],
    });
  }

  async initNativeRecognition() {
    try {
      const permissions = await SpeechRecognition.checkPermissions();
      if (permissions.speechRecognition !== 'granted') {
        const result = await SpeechRecognition.requestPermissions();
        if (result.speechRecognition !== 'granted') {
          console.warn('Speech recognition permission not granted');
        }
      }


      SpeechRecognition.addListener('partialResults', (data: any) => {
        if (data.matches && data.matches.length > 0) {
          // In native, partial matches are cumulative or the full sentence
          const transcript = data.matches[0];
          this.textSpeech = transcript;
          this.textControl?.setValue(this.textSpeech);
        }
      });
    } catch (e) {
      console.error('Error initializing native speech recognition:', e);
    }
  }

  initWebRecognition() {
    const SpeechRecognitionWeb =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionWeb) {
      this.recognition = new SpeechRecognitionWeb();
      this.recognition.lang = 'pt-BR';
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.textSpeech += transcript + ' ';
            this.textControl?.setValue(this.textSpeech);
          }
        }
      };

      this.recognition.onstart = () => {
        this.isListening = true;
        console.log('Web Voice recognition started');
      };

      this.recognition.onend = () => {
        console.log('Web Voice recognition ended');
        if (this.isListening) {
          try {
            this.recognition.start();
          } catch (e) {
            console.warn('Web Recognition restart failed:', e);
          }
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Erro no reconhecimento web:', event.error);
        if (event.error === 'no-speech') return;
        if (event.error === 'not-allowed') {
          alert('Permissão de microfone não concedida no navegador.');
          this.isListening = false;
        }
      };
    }
  }

  ngOnInit(): void {
    this.checkIfMobile();
  }
/*
  updateFullText() {
    const fullText = this.transcript.map((t) => t.textSpeech).join(' ');
    this.textControl?.setValue(fullText);
  } */

  get textControl() {
    return this.speechForm.get('textSpeech');
  }

  toggleRecognition() {
    this.isListening ? this.stopRecognition() : this.startRecognition();
  }


  async startRecognition() {
    if (this.isListening) return;

    this.textSpeech = '';
    this.textControl?.setValue('');
    this.isListening = true;

    if (Capacitor.isNativePlatform()) {
      try {
        const available = await SpeechRecognition.available();
        if (available.available) {
          await SpeechRecognition.start({
            language: 'pt-BR',
            partialResults: true,
            popup: false,
          });
        } else {
          alert('Reconhecimento de fala não disponível neste dispositivo.');
          this.isListening = false;
        }
      } catch (e) {
        console.error('Native Start failed:', e);
        this.isListening = false;
      }
    } else if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.error('Web Start failed:', e);
        this.isListening = false;
      }
    } else {
      alert('Reconhecimento de fala não suportado.');
      this.isListening = false;
    }
    this.focusTextArea();
  }


  async stopRecognition() {
    this.isListening = false;
    if (Capacitor.isNativePlatform()) {
      try {
        await SpeechRecognition.stop();
      } catch (e) {
        console.error('Native Stop failed:', e);
      }
    } else if (this.recognition) {
      this.recognition.stop();
    }
    this.resetSpeech();
  }

  resetSpeech() {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  focusTextArea() {
    setTimeout(() => {
      this.textArea?.nativeElement?.focus();
    }, 0);
  }

  clearText() {
    this.textControl?.setValue('');
    this.focusTextArea();
    this.resetSpeech();
  }

  increaseFontSize() {
    if (this.fontSize < 75) {
      this.fontSize += 5;
    }
  }

  decreaseFontSize() {
    if (this.fontSize > 15) {
      this.fontSize -= 5;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnDestroy() {
    if (this.isListening) {
      this.stopRecognition();
    }
    this.resetSpeech();
    SpeechRecognition.removeAllListeners();
  }

}
