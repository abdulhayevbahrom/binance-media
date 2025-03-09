const changeLang = (lang = null) => {
  let location = window.location.href;

  if (location.endsWith("/")) {
    location = location.slice(0, -1);
  }

  if (lang) {
    if (location.includes("/ru")) {
      window.location.href = location.replace("/ru", `/${lang}`);
    } else if (location.includes("/en")) {
      window.location.href = location.replace("/en", `/${lang}`);
    } else {
      console.error("URL не содержит языкового сегмента ('/ru' или '/en').");
    }
  } else {
    if (location.includes("/ru")) {
      window.location.href = location.replace("/ru", "/en");
    } else if (location.includes("/en")) {
      window.location.href = location.replace("/en", "/ru");
    } else {
      console.error("URL не содержит языкового сегмента ('/ru' или '/en').");
    }
  }
};











import React, { useState, useEffect, useRef } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';

const SearchAndUpload = () => {
  const [image, setImage] = useState(null);
  const [productAnalysis, setProductAnalysis] = useState(null);
  const [model, setModel] = useState(null);
  const [placeholderText, setPlaceholderText] = useState('Rasm yuklash...');
  const fileInputRef = useRef(null);

  const placeholderTexts = [
    "Maxsulotni toping...",
    "Rasmni yuklang...",
    "Tezkor qidiruv...",
    "Tasvirni tahlil qiling...",
    "Skanerlash..."
  ];

  // TensorFlow modelni yuklash
  useEffect(() => {
    cocoSsd.load().then((loadedModel) => setModel(loadedModel));
  }, []);

  // Placeholder matnini random almashtirish
  useEffect(() => {
    const interval = setInterval(() => {
      const randomText = placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)];
      setPlaceholderText(randomText);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Rasm yuklash funksiyasi
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imgElement = document.createElement('img');
      imgElement.src = reader.result;
      document.body.appendChild(imgElement);

      if (model) {
        const predictions = await model.detect(imgElement);
        setProductAnalysis(predictions);
      }
    };

    reader.readAsDataURL(file);
    setImage(URL.createObjectURL(file));
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Rasm yuklash inputi */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      {/* Rasm yuklash tugmasi */}
      <Button
        type="primary"
        icon={<UploadOutlined />}
        onClick={() => fileInputRef.current.click()}
        style={{
          fontSize: '16px',
          padding: '10px 20px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {placeholderText}
      </Button>

      {/* Yuklangan rasm */}
      {image && (
        <div style={{ marginTop: '20px' }}>
          <h3>Yuklangan rasm</h3>
          <Image width={200} src={image} style={{ borderRadius: '10px' }} />
        </div>
      )}

      {/* Mahsulot tahlili */}
      {productAnalysis && (
        <div style={{ marginTop: '20px' }}>
          <h3>Topilgan mahsulotlar:</h3>
          <ul>
            {productAnalysis.map((prediction, index) => (
              <li key={index} style={{ fontSize: '16px' }}>
                {prediction.class} - {Math.round(prediction.score * 100)}% aniqlik
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchAndUpload;
