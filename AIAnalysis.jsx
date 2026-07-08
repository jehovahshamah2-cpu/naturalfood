import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AIAnalysis({ uiLang }) {
  const { accessToken } = useAuth();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setResult(null);

    // Angalia aina ya faili
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    // Angalia ukubwa (max 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image is too large. Max 10 MB allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  };

  const analyzeFood = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const base64 = image.split(',')[1];
      const res = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken || ''}`
        },
        body: JSON.stringify({ base64, mediaType: 'image/jpeg' })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Analysis failed');
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'AI analysis failed. Please try again.');
      console.error('Analysis failed', err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <h2 style={{ margin: '0 0 16px', color: '#166534' }}>
        🔬 AI Ingredient Analysis
      </h2>

      <div style={{
        background: '#fff', borderRadius: 16, padding: 20,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <p style={{ color: '#6B7280', margin: '0 0 16px', fontSize: 14 }}>
          Upload a photo of any food or ingredient, and our AI will analyze its nutritional benefits.
        </p>

        <div style={{ marginBottom: 16 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            ref={fileInputRef}
            style={{ display: 'none' }}
            id="food-image-upload"
          />
          <label
            htmlFor="food-image-upload"
            style={{
              display: 'inline-block', padding: '10px 20px', background: '#166534',
              color: '#fff', borderRadius: 20, cursor: 'pointer', fontWeight: 'bold',
              fontSize: 14, textAlign: 'center'
            }}
          >
            📸 Choose Food Photo
          </label>
        </div>

        {image && (
          <div style={{ marginBottom: 16 }}>
            <img
              src={image}
              alt="Food"
              style={{
                maxWidth: '100%', maxHeight: 300, borderRadius: 12,
                objectFit: 'cover', display: 'block'
              }}
            />
            <button
              onClick={reset}
              style={{
                marginTop: 8, border: 'none', background: '#e5e7eb', color: '#374151',
                padding: '6px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 13
              }}
            >
              ✕ Remove
            </button>
          </div>
        )}

        <button
          onClick={analyzeFood}
          disabled={!image || loading}
          style={{
            width: '100%', padding: '12px', border: 'none',
            background: !image || loading ? '#d1d5db' : '#166534',
            color: '#fff', borderRadius: 12, cursor: !image || loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold', fontSize: 16, marginBottom: 12
          }}
        >
          {loading ? '⏳ Analyzing...' : '🔍 Analyze Food'}
        </button>

        {error && (
          <div style={{
            padding: 12, background: '#fef2f2', borderRadius: 12,
            color: '#DC2626', fontSize: 14, marginBottom: 12
          }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{
            padding: 16, background: '#f0fdf4', borderRadius: 12,
            border: '1px solid #bbf7d0'
          }}>
            <h3 style={{ margin: '0 0 8px', color: '#166534' }}>
              🍽️ {result.name}
            </h3>
            <div style={{ marginBottom: 12 }}>
              <strong style={{ fontSize: 14 }}>Benefits:</strong>
              <ul style={{ margin: '4px 0 0', paddingLeft: 20 }}>
                {(result.benefits || []).map((benefit, i) => (
                  <li key={i} style={{ fontSize: 14, color: '#374151' }}>{benefit}</li>
                ))}
              </ul>
            </div>
            {result.cookingTip && (
              <div style={{
                padding: 10, background: '#fff', borderRadius: 8,
                border: '1px solid #e5e7eb'
              }}>
                <strong style={{ fontSize: 14 }}>Cooking Tip:</strong>
                <p style={{ margin: '4px 0 0', fontSize: 14, color: '#374151' }}>
                  {result.cookingTip}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}