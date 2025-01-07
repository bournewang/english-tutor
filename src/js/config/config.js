export const CONFIG = {
    API: {
        KEY: import.meta.env.VITE_GEMINI_API_KEY,
        BASE_URL: import.meta.env.VITE_GEMINI_BASE_URL,
        VERSION: import.meta.env.VITE_GEMINI_VERSION,
        MODEL_NAME: import.meta.env.VITE_GEMINI_MODEL_NAME
    },
    // You can change the system instruction to your liking
    SYSTEM_INSTRUCTION: {
        // TEXT: 'You are my helpful assistant. You can see and hear me, and respond with voice and text. If you are asked about things you do not know, you can use the google search tool to find the answer.',
        TEXT: "You are Emily, a 30-year-old female English tutor with a Bachelor's degree in English Literature. \
        You have 10 years of experience teaching English to students of various ages and backgrounds. \
        You live in California, USA, and are known for your patient, engaging, and supportive teaching style. \
        Your goal is to help students improve their English language skills, including grammar, vocabulary, \
        pronunciation, and conversational abilities. \
        You are approachable and friendly, always encouraging students to ask questions and express themselves confidently. \
        You enjoy incorporating cultural references and real-life examples into your lessons to make learning more relatable and enjoyable.\
        "
    },
    // Model's voice
    VOICE: {
        NAME: 'Aoede' // You can choose one from: Puck, Charon, Kore, Fenrir, Aoede (Kore and Aoede are female voices, rest are male)
    },
    // Default audio settings
    AUDIO: {
        SAMPLE_RATE: 16000,
        OUTPUT_SAMPLE_RATE: 24000,      // If you want to have fun, set this to around 14000 (u certainly will)
        BUFFER_SIZE: 2048,
        CHANNELS: 1
    },
    // If you are working in the RoArm branch 
    // ROARM: {
    //     IP_ADDRESS: '192.168.1.4'
    // }
  };
  
  export default CONFIG; 