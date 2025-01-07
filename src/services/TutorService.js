import { MultimodalLiveClient } from '../js/core/websocket-client.js';
import { AudioStreamer } from '../js/audio/audio-streamer.js';
import { AudioRecorder } from '../js/audio/audio-recorder.js';
import { CONFIG } from '../js/config/config.js';
import { Logger } from '../js/utils/logger.js';
// import { VideoManager } from '../js/video/video-manager.js';
// import { ScreenRecorder } from '../js/video/screen-recorder.js';
import { ApplicationError } from '../js/utils/error-boundary.js';

export class TutorService {
    constructor() {
        // State variables
        this.isRecording = false;
        this.audioStreamer = null;
        this.audioCtx = null;
        this.isConnected = false;
        this.audioRecorder = null;
        this.isUsingTool = false;

        // Initialize callbacks
        // console.log = () => {console.log()};
        // this.updateAudioVisualizer = () => {};

        // Initialize client
        this.client = new MultimodalLiveClient({ url: CONFIG.API.BASE_URL, apiKey: CONFIG.API.KEY });
        this.setupEventListeners();

        // Add heartbeat related properties
        // this.heartbeatInterval = null;
        // this.reconnectAttempts = 0;
        // this.maxReconnectAttempts = 3;
        // this.heartbeatTimeout = 30000; // 30 seconds
        // this.lastHeartbeat = Date.now();

        // // Add connection state tracking
        // this.isConnecting = false;
        // this.connectionCheckInterval = null;
    }

    setupEventListeners() {
        this.client.on('open', () => {
            console.log('WebSocket connection opened', 'system');
        });
        
        this.client.on('log', (log) => {
            console.log(`${log.type}: ${JSON.stringify(log.message)}`, 'system');
        });
        
        this.client.on('close', (event) => {
            console.log(`WebSocket connection closed (code ${event.code})`, 'system');
        });
        
        this.client.on('audio', async (data) => {
            try {
                await this.resumeAudioContext();
                const streamer = await this.ensureAudioInitialized();
                streamer.addPCM16(new Uint8Array(data));
            } catch (error) {
                console.log(`Error processing audio: ${error.message}`, 'system');
            }
        });
        
        this.client.on('content', (data) => {
            if (data.modelTurn) {
                if (data.modelTurn.parts.some(part => part.functionCall)) {
                    this.isUsingTool = true;
                    Logger.info('Model is using a tool');
                } else if (data.modelTurn.parts.some(part => part.functionResponse)) {
                    this.isUsingTool = false;
                    Logger.info('Tool usage completed');
                }
        
                const text = data.modelTurn.parts.map(part => part.text).join('');
                if (text) {
                    console.log(text, 'ai');
                }
            }
        });
        
        this.client.on('interrupted', () => {
            this.audioStreamer?.stop();
            this.isUsingTool = false;
            Logger.info('Model interrupted');
            console.log('Model interrupted', 'system');
        });
        
        this.client.on('setupcomplete', () => {
            console.log('Setup complete', 'system');
        });
        
        this.client.on('turncomplete', () => {
            this.isUsingTool = false;
            console.log('Turn complete', 'system');
        });
        
        this.client.on('error', (error) => {
            if (error instanceof ApplicationError) {
                Logger.error(`Application error: ${error.message}`, error);
            } else {
                Logger.error('Unexpected error', error);
            }
            console.log(`Error: ${error.message}`, 'system');
        });
        
        this.client.on('message', (message) => {
            if (message.error) {
                Logger.error('Server error:', message.error);
                console.log(`Server error: ${message.error}`, 'system');
            }
        });
        
    }

    async connectToWebsocket() {
        const config = {
            model: CONFIG.API.MODEL_NAME,
            generationConfig: {
                responseModalities: "audio",
                speechConfig: {
                    voiceConfig: { 
                        prebuiltVoiceConfig: { 
                            voiceName: CONFIG.VOICE.NAME
                        }
                    }
                },
            },
            systemInstruction: {
                parts: [{
                    text: CONFIG.SYSTEM_INSTRUCTION.TEXT
                }],
            }
        };
    
        try {
            await this.client.connect(config);
            this.isConnected = true;
            await this.resumeAudioContext();
            console.log('Connected to Gemini 2.0 Flash Multimodal Live API', 'system');
            
            setTimeout(() => {
                this.sendMessage("hello!");
            }, 1000);
        } catch (error) {
            const errorMessage = error.message || 'Unknown error';
            Logger.error('Connection error:', error);
            console.log(`Connection error: ${errorMessage}`, 'system');
            this.isConnected = false;
        }
    }
    
    disconnectFromWebsocket() {
        this.client.disconnect();
        this.isConnected = false;
        if (this.audioStreamer) {
            this.audioStreamer.stop();
            if (this.audioRecorder) {
                this.audioRecorder.stop();
                this.audioRecorder = null;
            }
            this.isRecording = false;
        }
        console.log('Disconnected from server', 'system');
        
    }    

    async handleMicToggle() {
        if (!this.isRecording) {
            try {
                await this.ensureAudioInitialized();
                this.audioRecorder = new AudioRecorder();
                
                const inputAnalyser = this.audioCtx.createAnalyser();
                inputAnalyser.fftSize = 256;
                const inputDataArray = new Uint8Array(inputAnalyser.frequencyBinCount);
                
                await this.audioRecorder.start((base64Data) => {
                    if (this.isUsingTool) {
                        this.client.sendRealtimeInput([{
                            mimeType: "audio/pcm;rate=16000",
                            data: base64Data,
                            interrupt: true     // Model isn't interruptable when using tools, so we do it manually
                        }]);
                    } else {
                        this.client.sendRealtimeInput([{
                            mimeType: "audio/pcm;rate=16000",
                            data: base64Data
                        }]);
                    }
                    
                    inputAnalyser.getByteFrequencyData(inputDataArray);
                });
    
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const source = this.audioCtx.createMediaStreamSource(stream);
                source.connect(inputAnalyser);
                
                await this.audioStreamer.resume();
                this.isRecording = true;
                Logger.info('Microphone started');
                console.log('Microphone started', 'system');
            } catch (error) {
                Logger.error('Microphone error:', error);
                console.log(`Error: ${error.message}`, 'system');
                this.isRecording = false;
            }
        } else {
            if (this.audioRecorder && this.isRecording) {
                this.audioRecorder.stop();
            }
            this.isRecording = false;
            console.log('Microphone stopped', 'system');
        }
    }

    sendMessage(message) {
        this.client.send({ text: message });
    }

    async ensureAudioInitialized() {
        if (!this.audioCtx) {
            this.audioCtx = new AudioContext();
        }
        if (!this.audioStreamer) {
            this.audioStreamer = new AudioStreamer(this.audioCtx);
            await this.audioStreamer.addWorklet('vumeter-out', `js/audio/worklets/vol-meter.js`, (ev) => {
                // updateAudioVisualizer(ev.data.volume);
            });
        }
        return this.audioStreamer;
    }

    async resumeAudioContext() {
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            await this.audioCtx.resume();
        }
    }

} 