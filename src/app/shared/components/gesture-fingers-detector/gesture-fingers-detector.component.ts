import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Camera } from '@mediapipe/camera_utils';
import { Hands } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';
import { StringsNamesUrl } from '../../constants/strings-url/strings-names';
import { processString } from '../../utils/convert-urls';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-gesture-fingers-detector',
  standalone: true,
  imports: [CardUIComponent, BreadcrumbComponent],
  templateUrl: './gesture-fingers-detector.component.html',
  styleUrl: './gesture-fingers-detector.component.css',
})
export class GestureFingersDetectorComponent implements OnInit, AfterViewInit {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private camera!: Camera;
  private mediaStream: MediaStream | null = null;
  private model: tf.LayersModel | null = null;

  detectedGesture: string = '';
  private lastGestureDetected: string = '';

  ngOnInit(): void {
    // 🔹 Carrega o modelo TM LayersModel
    tf.loadLayersModel('/assets/models/model01/model.json')
      .then((loadedModel) => {
        this.model = loadedModel;
        console.log('✅ Modelo Teachable Machine carregado');
      })
      .catch((err) => console.error('Erro ao carregar o modelo:', err));
  }

  ngAfterViewInit(): void {
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => this.drawResults(results));

    this.camera = new Camera(this.videoRef.nativeElement, {
      onFrame: async () => {
        this.adjustCanvasSize();
        await hands.send({ image: this.videoRef.nativeElement });
      },
      width: 640,
      height: 480,
    });

    this.camera.start();
  }

  adjustCanvasSize(): void {
    const canvas = this.canvasRef.nativeElement;
    const video = this.videoRef.nativeElement;
    if (!video.videoWidth || !video.videoHeight) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  async drawResults(results: any) {
    const canvasEl = this.canvasRef.nativeElement;
    const canvasCtx = canvasEl.getContext('2d');
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    if (results.image) {
      canvasCtx.drawImage(results.image, 0, 0, canvasEl.width, canvasEl.height);
    }

    if (results.multiHandLandmarks?.length && this.model) {
      for (const landmarks of results.multiHandLandmarks) {
        // 🔹 Desenha landmarks
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 2,
        });
        drawLandmarks(canvasCtx, landmarks, {
          color: '#FF0000',
          lineWidth: 2,
          radius: 4,
        });

        // 🔹 Normaliza landmarks para o modelo TM
        // Flatten: [x1,y1,z1, x2,y2,z2, ...]
        const input = landmarks.flatMap((lm: any) => [lm.x, lm.y, lm.z]);
        const tensorInput = tf.tensor([input]);

        // 🔹 Predição
        const prediction = this.model.predict(tensorInput) as tf.Tensor;
        const probs = (await prediction.array()) as number[][];
        tensorInput.dispose();
        prediction.dispose();

        // 🔹 Classe mais provável
        const maxIndex = probs[0].indexOf(Math.max(...probs[0]));
        const classes = ['A', 'B', 'C', 'D', 'E', 'F', 'Tudo bem']; // ajuste conforme seu modelo
        const gesture = classes[maxIndex];

        if (gesture && gesture !== this.lastGestureDetected) {
          this.detectedGesture = gesture;
          this.lastGestureDetected = gesture;
          this.speak(gesture);
        }
      }
    } else {
      this.detectedGesture = '';
      this.lastGestureDetected = '';
    }

    canvasCtx.restore();
  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  ngOnDestroy(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
    if (this.camera) {
      this.camera.stop();
    }
  }
}