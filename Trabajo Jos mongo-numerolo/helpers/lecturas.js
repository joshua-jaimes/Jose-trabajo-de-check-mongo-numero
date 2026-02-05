// helpers/lecturas.js
import axios from 'axios';

const generarLecturaGemini = async (fechaNacimiento, tipo) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('API Key no configurada');
        }

        console.log(`📝 Conectando con Gemini API (gemini-1.5-flash)...`);

        let prompt;
        if (tipo === 'principal') {
            prompt = `Eres un experto numerólogo. Genera una lectura detallada (HTML format) para alguien nacido el ${fechaNacimiento}. Incluye: 1. Número de Vida (calculado). 2. Misión de vida. 3. Talento oculto. Tono místico y profesional.`;
        } else {
            prompt = `Eres un experto numerólogo. Dame un horóscopo numerológico corto para hoy para alguien nacido el ${fechaNacimiento}. Tono inspirador.`;
        }

        // Configuración estándar que suele funcionar
        const url = `https://generativelanguage.googleapis.com/v1/models/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;


        const response = await axios.post(url, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            console.log('✅ Gemini respondió correctamente');
            return response.data.candidates[0].content.parts[0].text;
        }

        throw new Error('Respuesta vacía de Gemini');

    } catch (error) {
        console.error('❌ Falló Gemini:', error.message);
        // Fallback: Si falla API, al menos devolver el mensaje de error claro en el contenido
        return `Lo sentimos, el oráculo (Gemini AI) no está disponible en este momento. Error: ${error.message}. Por favor verifica tu API Key.`;
    }
};

export { generarLecturaGemini };
