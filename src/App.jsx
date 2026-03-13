import React, { useState, useEffect } from 'react';
import { AlertTriangle, Droplets, Wind, Thermometer, Cloud, Eye, TrendingUp, MapPin, RefreshCw, CloudRain, Gauge } from 'lucide-react';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  // Dummy data simulating OneCall API 3.0
  const weatherData = {
    location: "Banjarmasin, Kalimantan Selatan",
    lat: -3.3194,
    lon: 114.5906,
    current: {
      temp: 28.5,
      humidity: 85,
      wind_speed: 12.5,
      clouds: 75,
      rain_1h: 8.2,
      pressure: 1010,
      visibility: 8000
    },
    hourly: [
      { time: "00:00", rain: 2.5, temp: 27 },
      { time: "03:00", rain: 5.2, temp: 26 },
      { time: "06:00", rain: 8.5, temp: 26 },
      { time: "09:00", rain: 12.3, temp: 27 },
      { time: "12:00", rain: 15.8, temp: 28 },
      { time: "15:00", rain: 18.2, temp: 29 },
      { time: "18:00", rain: 14.5, temp: 28 },
      { time: "21:00", rain: 10.2, temp: 27 }
    ]
  };

  // Layerwise Flood Risk Calculation
  const calculateFloodRisk = () => {
    // Layer 1: Curah Hujan (40%)
    const rainfallScore = weatherData.current.rain_1h > 15 ? 100 : 
                         weatherData.current.rain_1h > 10 ? 75 :
                         weatherData.current.rain_1h > 5 ? 50 : 25;
    
    // Layer 2: Kelembaban (25%)
    const humidityScore = weatherData.current.humidity > 85 ? 100 :
                         weatherData.current.humidity > 75 ? 75 :
                         weatherData.current.humidity > 65 ? 50 : 25;
    
    // Layer 3: Tutupan Awan (20%)
    const cloudScore = weatherData.current.clouds > 80 ? 100 :
                      weatherData.current.clouds > 60 ? 75 :
                      weatherData.current.clouds > 40 ? 50 : 25;
    
    // Layer 4: Kecepatan Angin (15%)
    const windScore = weatherData.current.wind_speed > 20 ? 25 :
                     weatherData.current.wind_speed > 15 ? 50 :
                     weatherData.current.wind_speed > 10 ? 75 : 100;

    // Weighted average
    const totalScore = (rainfallScore * 0.4) + (humidityScore * 0.25) + 
                      (cloudScore * 0.2) + (windScore * 0.15);
    
    return {
      score: totalScore,
      level: totalScore > 75 ? 'TINGGI' : totalScore > 50 ? 'SEDANG' : 'RENDAH',
      color: totalScore > 75 ? '#dc2626' : totalScore > 50 ? '#ea580c' : '#16a34a',
      bgColor: totalScore > 75 ? '#fee2e2' : totalScore > 50 ? '#ffedd5' : '#dcfce7',
      layers: { rainfallScore, humidityScore, cloudScore, windScore }
    };
  };

  const floodRisk = calculateFloodRisk();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Date Bar - BMKG Style */}
      <div className="bg-white border-b border-gray-200 py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-600">
          <span className="uppercase font-medium">
            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <div className="flex items-center gap-4">
            <span className="font-medium">STANDAR WAKTU INDONESIA</span>
            <span className="font-mono text-blue-600 font-bold">
              {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
            </span>
            <span className="text-gray-400">|</span>
            <span className="font-mono text-gray-500">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC', hour12: false })} UTC
            </span>
          </div>
        </div>
      </div>

      {/* Header - BMKG Exact Style */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <Droplets size={32} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Sistem Peringatan Dini
                  </div>
                  <div className="text-xs text-gray-600 uppercase">
                    Banjir Berbasis Layerwise
                  </div>
                </div>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Profil</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Cuaca</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Iklim</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Kualitas Udara</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Gempa Bumi</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Geofisika</a>
            </nav>

            <button 
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
            >
              <RefreshCw size={16} className={isUpdating ? 'animate-spin' : ''} />
              Perbarui
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600">Beranda</a>
            <span className="text-gray-400">›</span>
            <a href="#" className="hover:text-blue-600">Cuaca Kalimantan Selatan</a>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">Kota Banjarmasin</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Prakiraan Peringatan Banjir Kota Banjarmasin
            </h1>
            <p className="text-gray-600">
              Prakiraan peringatan banjir kecamatan di Kota Banjarmasin, Kalimantan Selatan
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Cari kelurahan/desa..."
                  className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Main Alert Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div 
                className="px-8 py-6 border-l-4"
                style={{ 
                  borderLeftColor: floodRisk.color,
                  backgroundColor: floodRisk.bgColor
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: floodRisk.color }}
                    >
                      <AlertTriangle size={32} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                        Status Peringatan Banjir
                      </h2>
                      <div className="text-4xl font-bold tracking-tight" style={{ color: floodRisk.color }}>
                        {floodRisk.level}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div 
                      className="inline-block px-6 py-3 rounded-lg text-white font-bold text-lg shadow-sm" 
                      style={{ backgroundColor: floodRisk.color }}
                    >
                      {floodRisk.level === 'TINGGI' ? '⚠️ SIAGA' : 
                       floodRisk.level === 'SEDANG' ? '⚡ WASPADA' : '✓ AMAN'}
                    </div>
                    <p className="text-gray-700 font-semibold mt-2">
                      Skor Risiko: <span style={{ color: floodRisk.color }}>{floodRisk.score.toFixed(1)}</span>/100
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-8 py-5 bg-white border-t border-gray-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong className="text-gray-900">Keterangan:</strong> {
                    floodRisk.level === 'TINGGI' 
                      ? 'Potensi banjir sangat tinggi. Segera lakukan langkah antisipasi dan waspada terhadap peningkatan curah hujan.'
                      : floodRisk.level === 'SEDANG'
                      ? 'Potensi banjir pada tingkat menengah. Tetap waspada dan pantau perkembangan cuaca secara berkala.'
                      : 'Kondisi cuaca normal. Risiko banjir rendah, namun tetap monitor perkembangan cuaca.'
                  }
                </p>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <MapPin size={18} className="text-blue-600" />
                <span className="font-semibold text-lg">Lokasi Pemantauan</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <div className="text-gray-500 text-xs uppercase mb-1">Kecamatan</div>
                  <div className="font-semibold text-gray-900">Banjarmasin Selatan</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase mb-1">Koordinat</div>
                  <div className="font-mono text-gray-900">{weatherData.lat}°, {weatherData.lon}°</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase mb-1">Pembaruan Terakhir</div>
                  <div className="font-semibold text-gray-900">
                    {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                  </div>
                </div>
              </div>
            </div>

            {/* Current Weather Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <WeatherCardClean 
                icon={<Droplets />} 
                label="Curah Hujan"
                value={weatherData.current.rain_1h}
                unit="mm/jam"
                iconColor="text-blue-600"
              />
              <WeatherCardClean 
                icon={<Thermometer />} 
                label="Suhu Udara"
                value={weatherData.current.temp}
                unit="°C"
                iconColor="text-orange-600"
              />
              <WeatherCardClean 
                icon={<Wind />} 
                label="Kecepatan Angin"
                value={weatherData.current.wind_speed}
                unit="km/jam"
                iconColor="text-teal-600"
              />
              <WeatherCardClean 
                icon={<Cloud />} 
                label="Kelembaban"
                value={weatherData.current.humidity}
                unit="%"
                iconColor="text-purple-600"
              />
            </div>

            {/* Layerwise Analysis */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Gauge size={20} className="text-blue-600" />
                  Analisis Metode Layerwise
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <LayerBarClean 
                    label="Layer 1: Intensitas Curah Hujan"
                    score={floodRisk.layers.rainfallScore}
                    weight={0.4}
                    icon={<Droplets size={18} />}
                  />
                  <LayerBarClean 
                    label="Layer 2: Kelembaban Udara"
                    score={floodRisk.layers.humidityScore}
                    weight={0.25}
                    icon={<Cloud size={18} />}
                  />
                  <LayerBarClean 
                    label="Layer 3: Tutupan Awan"
                    score={floodRisk.layers.cloudScore}
                    weight={0.2}
                    icon={<Eye size={18} />}
                  />
                  <LayerBarClean 
                    label="Layer 4: Kecepatan Angin"
                    score={floodRisk.layers.windScore}
                    weight={0.15}
                    icon={<Wind size={18} />}
                  />
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Metodologi Perhitungan</h4>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    Sistem menggunakan pendekatan <strong>layerwise (berlapis)</strong> untuk menghitung risiko banjir 
                    berdasarkan empat parameter meteorologi utama dengan bobot berbeda sesuai tingkat pengaruhnya. 
                    Setiap layer memberikan kontribusi yang kemudian diagregasi menggunakan weighted average 
                    untuk menghasilkan skor risiko final (0-100).
                  </p>
                </div>
              </div>
            </div>

            {/* Rainfall Chart */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600" />
                  Prakiraan Curah Hujan 24 Jam
                </h3>
              </div>
              <div className="p-6">
                <div className="h-64 flex items-end justify-between gap-2 mb-5">
                  {weatherData.hourly.map((hour, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full group">
                        <div 
                          className="w-full bg-blue-600 hover:bg-blue-700 rounded-t transition-colors cursor-pointer"
                          style={{ height: `${Math.max((hour.rain / 20) * 100, 8)}%` }}
                        >
                          <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                            {hour.rain} mm
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-semibold text-gray-900">{hour.time}</div>
                        <div className="text-xs text-gray-500">{hour.temp}°C</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    <span>Intensitas Hujan (mm/jam)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer size={14} className="text-orange-600" />
                    <span>Suhu (°C)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-white rounded-lg shadow-sm p-5 text-center border-t-2 border-blue-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">⚠️</span>
                </div>
                <p className="text-gray-900 font-semibold">Status: Versi Demo</p>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed mb-3">
                Website ini menggunakan data simulasi untuk keperluan demonstrasi. 
                Sistem akan terhubung dengan <strong>OpenWeather OneCall API 3.0</strong> pada implementasi final.
              </p>
              <div className="flex items-center justify-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-200">
                <span>📊 Metode: Layerwise</span>
                <span>•</span>
                <span>🌐 OpenWeather API</span>
                <span>•</span>
                <span>🎓 PKM 2025</span>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                © 2025 Program Kreativitas Mahasiswa - Universitas Lambung Mangkurat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherCardClean({ icon, label, value, unit, iconColor }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
          {React.cloneElement(icon, { size: 20, className: iconColor })}
        </div>
        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {label}
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm font-medium text-gray-500">{unit}</div>
      </div>
    </div>
  );
}

function LayerBarClean({ label, score, weight, icon }) {
  const getColor = (score) => {
    if (score > 75) return { bar: '#dc2626', bg: '#fee2e2' };
    if (score > 50) return { bar: '#ea580c', bg: '#ffedd5' };
    return { bar: '#16a34a', bg: '#dcfce7' };
  };

  const colors = getColor(score);

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-blue-600 border border-gray-200">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-gray-900">{label}</div>
          <div className="text-xs text-gray-500">Bobot: {(weight * 100).toFixed(0)}%</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">{score}</div>
          <div className="text-xs text-gray-500">/ 100</div>
        </div>
      </div>
      <div className="h-3 rounded-full overflow-hidden bg-gray-200">
        <div 
          className="h-full rounded-full transition-all duration-700"
          style={{ 
            width: `${score}%`,
            backgroundColor: colors.bar
          }}
        ></div>
      </div>
      <div className="text-xs font-medium text-gray-600 mt-2">
        Kontribusi: <span style={{ color: colors.bar }}>{(score * weight).toFixed(1)}</span> poin
      </div>
    </div>
  );
}
