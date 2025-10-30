import { useState, useRef, useEffect } from 'react';
import { Send, Copy, Check, ImagePlus, X } from 'lucide-react'; // Removed unused icons

// API URL
const API_URL = 'http://127.0.0.1:8000/api/v1/query';

export default function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [currentMode, setCurrentMode] = useState('qna'); // 'qna' or 'h2h'
  const [uploadedImage, setUploadedImage] = useState(null); // Stores { name: '...', base64: 'data:image/...' }
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const quickQuestions = {
    qna: [
      "What is UI Grounding error?",
      "Explain Early Stopping.",
      "Show examples of Tool Errors.",
      "What are the steps for error classification?",
    ],
    h2h: [
      "What is the H2H process?",
      "When is an output 'Strongly Better'?",
      "Explain 'Slightly Better' with examples.",
      "What if both models fail in H2H?",
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Image Handling
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage({
          name: file.name,
          base64: reader.result // This result includes the data URI prefix (e.g., "data:image/png;base64,...")
        });
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
        fileInputRef.current.value = null;
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (loading || (!messageText && !(currentMode === 'qna' && uploadedImage))) return;

    let userContent = messageText;
    if (currentMode === 'qna' && uploadedImage) {
        userContent += `\n[Image Attached: ${uploadedImage.name}]`;
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: userContent.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // --- Prepare payload WITH mode and image ---
    const payload = {
        query: messageText,
        mode: currentMode,
        image_base64: (currentMode === 'qna' && uploadedImage) ? uploadedImage.base64 : null
    };
    // --- ---

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload) // <-- SENDING FULL PAYLOAD
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `API error (${response.status})`);
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.answer || 'Sorry, I could not find an answer.'
        // content: `(${data.brain}) ${data.answer || 'No answer found.'}` // Uncomment for debugging brain used
      };

      setMessages(prev => [...prev, botMessage]);
      // Clear image after successful send
      if (currentMode === 'qna') {
          setUploadedImage(null);
      }

    } catch (error) {
      console.error('Fetch error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Something went wrong. Please try again. (${error.message})` // Show error message in chat
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // --- UI REMAINS LARGELY THE SAME, only small changes ---
  return (
    <div className="flex flex-col h-screen bg-black text-gray-100">
        {/* --- Mode Selection Tabs --- */}
        <div className="bg-gray-950 border-b border-gray-800 sticky top-0 z-10">
            <div className="max-w-4xl mx-auto flex px-4">
            <button
                onClick={() => setCurrentMode('qna')}
                className={`py-3 px-5 text-sm font-medium border-b-2 transition-colors ${
                currentMode === 'qna' ? 'border-[#62AADE] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
            > Annotation Q&A </button>
            <button
                onClick={() => setCurrentMode('h2h')}
                className={`py-3 px-5 text-sm font-medium border-b-2 transition-colors ${
                currentMode === 'h2h' ? 'border-[#62AADE] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
            > H2H Review </button>
            </div>
        </div>

        {/* --- Messages Area --- */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {messages.length === 0 ? (
            // Welcome Screen
            <div className="flex flex-col items-center justify-start min-h-full py-8 px-4 sm:px-6 max-w-5xl mx-auto">
                {/* Logo */}
                <div className="mb-8"><img src="/logo.png" alt="Autonex AI Logo" className="h-16 w-auto object-contain opacity-90"/></div>
                {/* Welcome Message */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Welcome to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#62AADE] to-[#163791]">Onboarding Buddy</span></h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">Select a mode above and ask your questions!</p>
                </div>
                {/* Quick Questions */}
                <div className="w-full">
                    <p className="text-gray-500 text-sm mb-3 text-center">Quick start for {currentMode === 'qna' ? 'Annotation Q&A' : 'H2H Review'}:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(quickQuestions[currentMode] || []).map((question, idx) => (
                        <button key={idx} onClick={() => handleSend(question)} className="text-left px-5 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-[#62AADE] rounded-xl transition-all group">
                            <div className="flex items-center gap-3"><div className="w-2 h-2 bg-[#62AADE] rounded-full group-hover:animate-pulse"></div><span className="text-gray-300 group-hover:text-white text-sm transition-colors">{question}</span></div>
                        </button>
                        ))}
                    </div>
                </div>
            </div>
            ) : (
            // Chat Messages
            <div className="max-w-4xl mx-auto px-4 py-6">
                {messages.map((msg, idx) => (
                <div key={msg.id} className={`mb-8 ${idx === 0 ? 'pt-4' : ''}`}>
                    <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0 pt-1"><div className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-xs ${ msg.role === 'user' ? 'bg-gray-800 text-gray-300' : 'bg-gradient-to-br from-[#163791] to-[#62AADE] text-white' }`}>{msg.role === 'user' ? 'You' : 'AI'}</div></div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className={`text-[15px] leading-7 whitespace-pre-wrap break-words ${ msg.role === 'user' ? 'text-gray-300' : 'text-gray-100' }`}>{msg.content}</div>
                            {/* Copy Button */}
                            {msg.role === 'assistant' && ( <button onClick={() => copyToClipboard(msg.content, msg.id)} className="mt-3 px-3 py-1.5 text-xs text-gray-500 hover:text-[#62AADE] hover:bg-gray-900 rounded-md transition-colors flex items-center gap-1.5">{copiedId === msg.id ? ( <><Check className="w-3.5 h-3.5" /><span>Copied</span></> ) : ( <><Copy className="w-3.5 h-3.5" /><span>Copy</span></> )}</button> )}
                        </div>
                    </div>
                </div>
                ))}
                {/* Typing Indicator */}
                {loading && ( <div className="mb-8"> <div className="flex gap-4"> <div className="flex-shrink-0 pt-1"><div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#163791] to-[#62AADE] flex items-center justify-center font-semibold text-xs text-white">AI</div></div><div className="flex-1 pt-2"><div className="flex gap-1.5"><div className="w-2 h-2 bg-[#62AADE] rounded-full animate-bounce"></div><div className="w-2 h-2 bg-[#62AADE] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div><div className="w-2 h-2 bg-[#62AADE] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div></div></div></div></div> )}
                <div ref={messagesEndRef} />
            </div>
            )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 bg-black">
            <div className="max-w-4xl mx-auto p-4">
                {/* Image Preview */}
                {currentMode === 'qna' && uploadedImage && ( <div className="mb-2 px-3 py-2 bg-gray-800 rounded-lg flex items-center justify-between text-sm"><div className="flex items-center gap-2 overflow-hidden"><ImagePlus className="w-4 h-4 text-gray-400 flex-shrink-0" /><span className="text-gray-300 truncate">{uploadedImage.name}</span></div><button onClick={removeImage} className="p-1 rounded-full hover:bg-gray-700 text-gray-500 hover:text-gray-200"><X className="w-4 h-4" /></button></div> )}
                {/* Input Row */}
                <div className="relative flex items-center bg-gray-900 rounded-xl border border-gray-700 focus-within:border-[#62AADE] transition-colors">
                    {/* Image Button */}
                    {currentMode === 'qna' && ( <> <button onClick={() => fileInputRef.current?.click()} className="ml-2 p-2.5 rounded-lg text-gray-500 hover:text-[#62AADE] hover:bg-gray-800 transition-colors" aria-label="Upload Image" disabled={loading}><ImagePlus className="w-5 h-5" /></button><input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" disabled={loading}/> </> )}
                    {/* Text Area */}
                    <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder={currentMode === 'qna' ? "Ask about annotations or upload an image..." : "Ask about H2H comparison..."} rows="1" className="flex-1 bg-transparent text-white placeholder-gray-500 px-4 py-3.5 outline-none resize-none max-h-32 text-[15px]" style={{ minHeight: '52px' }} disabled={loading}/>
                    {/* Send Button */}
                    <button onClick={() => handleSend()} disabled={loading || (!input.trim() && !(currentMode === 'qna' && uploadedImage))} className={`flex-shrink-0 mr-2 p-2.5 rounded-lg transition-all ${ (input.trim() || (currentMode === 'qna' && uploadedImage)) && !loading ? 'bg-gradient-to-r from-[#163791] to-[#62AADE] hover:shadow-lg hover:shadow-[#62AADE]/30 text-white' : 'bg-gray-800 text-gray-600 cursor-not-allowed' }`}><Send className="w-5 h-5" /></button>
                </div>
                <p className="text-center text-xs text-gray-600 mt-3">Your Onboarding Buddy • Powered by RAG & AI</p>
            </div>
        </div>

        <style>{` textarea { field-sizing: content; } `}</style>
    </div>
  );
}