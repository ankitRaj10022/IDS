import React, { useEffect, useRef } from 'react';

interface Location {
  id: string;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  count: number;
}

interface ThreatMapProps {
  locations: Location[];
}

const ThreatMap: React.FC<ThreatMapProps> = ({ locations }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Colors for different threat levels
  const threatColors = {
    low: 'rgba(34, 197, 94, 0.7)',
    medium: 'rgba(245, 158, 11, 0.7)',
    high: 'rgba(249, 115, 22, 0.7)',
    critical: 'rgba(220, 38, 38, 0.7)'
  };
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw world map (simplified)
    ctx.fillStyle = 'rgba(30, 41, 59, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Plot threat locations
    locations.forEach(location => {
      // Convert lat/long to canvas coordinates (simplified mapping)
      const x = (location.longitude + 180) * (canvas.width / 360);
      const y = (90 - location.latitude) * (canvas.height / 180);
      
      // Draw threat point
      const radius = Math.max(5, Math.min(15, location.count / 2));
      
      // Pulse animation effect for critical threats
      if (location.threatLevel === 'critical') {
        ctx.beginPath();
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 38, 38, 0.1)';
        ctx.fill();
      }
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = threatColors[location.threatLevel];
      ctx.fill();
    });
    
  }, [locations]);
  
  return (
    <div className="relative w-full h-[300px] bg-navy-800 rounded-lg overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      
      <div className="absolute bottom-2 right-2 bg-navy-900/80 rounded p-2 text-xs">
        <div className="flex items-center space-x-3">
          {Object.entries(threatColors).map(([level, color]) => (
            <div key={level} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: color }}
              />
              <span className="capitalize text-gray-300">{level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;