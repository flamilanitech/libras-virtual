import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { processString } from 'src/app/shared/utils/convert-urls';
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from '@mediapipe/tasks-vision';

@Component({
  selector: 'app-hand-detector',
  standalone: true,
  imports: [CardUIComponent, BreadcrumbComponent],
  templateUrl: './hand-detector.component.html',
  styleUrl: './hand-detector.component.css',
})
export class HandDetectorComponent implements OnInit, OnDestroy {
  @ViewChild('webcam', { static: true })
  webcamRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('output', { static: true })
  gestureOutputRef!: ElementRef<HTMLParagraphElement>;
  @ViewChild('outputOnly', { static: true })
  gestureOnlyOutputRef!: ElementRef<HTMLParagraphElement>;

  title = StringsNamesUrl.detector;
  link = `/${processString(StringsNamesUrl.visorComputacional)}`;

  private gestureRecognizer!: GestureRecognizer;
  private runningMode: 'IMAGE' | 'VIDEO' = 'VIDEO';
  private webcamRunning = false;
  private lastVideoTime = -1;
  private animationId: number | null = null;
  private lastSpokenGesture: string = '';
  private lastSpeakTime: number = 0;
  private minSpeakInterval: number = 2000;

  async ngOnInit(): Promise<void> {
    await this.createGestureRecognizer();
  }

  async createGestureRecognizer(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm',
    );
    this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
        delegate: 'GPU',
      },
      runningMode: this.runningMode,
    });

    this.enableCam();
  }

  enableCam(): void {
    const video = this.webcamRef.nativeElement;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
      video.addEventListener('loadeddata', () => {
        this.adjustCanvasSize();
        this.predictWebcam();
      });
    });
  }

  async predictWebcam(): Promise<void> {
    const video = this.webcamRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const canvasCtx = canvas.getContext('2d')!;
    const gestureOutput = this.gestureOutputRef.nativeElement;
    const gestureOnlyOutput = this.gestureOnlyOutputRef.nativeElement;

    if (this.runningMode === 'IMAGE') {
      this.runningMode = 'VIDEO';
      await this.gestureRecognizer.setOptions({ runningMode: 'VIDEO' });
    }

    const nowInMs = Date.now();
    if (video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = video.currentTime;
      const results = await this.gestureRecognizer.recognizeForVideo(
        video,
        nowInMs,
      );

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      const drawingUtils = new DrawingUtils(canvasCtx);

      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(
            landmarks,
            GestureRecognizer.HAND_CONNECTIONS,
            { color: '#00FF00', lineWidth: 5 },
          );
          drawingUtils.drawLandmarks(landmarks, {
            color: '#FF0000',
            lineWidth: 2,
          });
        }
      }

      const gestureTranslations: { [key: string]: string } = {
        Open_Palm: 'Mão Aberta',
        Closed_Fist: 'Punho Fechado',
        Pointing_Up: 'Apontando para Cima',
        Thumb_Up: 'Polegar para Cima',
        Thumb_Down: 'Polegar para Baixo',
        Victory: 'Vitória',
        ILoveYou: 'Eu Amo Você',
      };

      const handednessTranslations: { [key: string]: string } = {
        Left: 'Esquerdo',
        Right: 'Direito',
      };

      if (results.gestures.length > 0) {
        gestureOutput.style.display = 'block';
        const categoryName = results.gestures[0][0].categoryName;
        //  const categoryScore = (results.gestures[0][0].score * 100).toFixed(2);
        const handedness = results.handednesses[0][0].displayName;

        const translatedGesture =
          gestureTranslations[categoryName] || categoryName;
        const translatedHand = handednessTranslations[handedness] || handedness;

        let cssClass = '';
        let emoji = '';

        switch (categoryName) {
          case 'Open_Palm':
            cssClass = 'gesture-open';
            emoji = '🖐️';
            break;
          case 'Closed_Fist':
            cssClass = 'gesture-fist';
            emoji = '✊';
            break;
          case 'Thumb_Up':
            cssClass = 'gesture-thumb-up';
            emoji = '👍';
            break;
          case 'Thumb_Down':
            cssClass = 'gesture-thumb-down';
            emoji = '👎';
            break;
          case 'Victory':
            cssClass = 'gesture-victory';
            emoji = '✌️';
            break;
          case 'ILoveYou':
            cssClass = 'gesture-iloveyou';
            emoji = '🤟';
            break;
          case 'Pointing_Up':
            cssClass = 'gesture-pointing';
            emoji = '☝️';
            break;
          default:
            cssClass = '';
            emoji = '🖐️';
        }

        const outputText = `${translatedGesture} | Lado ${translatedHand}`;
        gestureOutput.className = `gesture-output ${cssClass}`;
        gestureOutput.style.display = 'block';
        gestureOutput.innerText = outputText;

        const outputOnlyText = emoji;
        gestureOnlyOutput.style.display = 'block';
        gestureOnlyOutput.innerText = outputOnlyText;

        const now = Date.now();
        const normalizedGestureKey = `${categoryName}_${handedness}`
          .toLowerCase()
          .trim();
        if (
          normalizedGestureKey !== this.lastSpokenGesture ||
          now - this.lastSpeakTime > this.minSpeakInterval
        ) {
          this.lastSpokenGesture = normalizedGestureKey;
          this.lastSpeakTime = now;
          this.speak(outputText);
        }
      } else {
        gestureOutput.style.display = 'none';
        gestureOnlyOutput.style.display = 'none';
      }
    }

    this.animationId = requestAnimationFrame(() => this.predictWebcam());
  }

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    const video = this.webcamRef.nativeElement;
    const stream = video.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }

  adjustCanvasSize(): void {
    const video = this.webcamRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  speak(text: string) {
    if (text === this.lastSpokenGesture) return;
    this.lastSpokenGesture = text;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustCanvasSize();
  }
}
