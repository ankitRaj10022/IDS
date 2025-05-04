import React, { useEffect, useRef } from 'react';
import { Shield, Server, Laptop, Smartphone, Wifi, Globe, AlertTriangle } from 'lucide-react';

interface Node {
  id: string;
  type: 'server' | 'router' | 'firewall' | 'client' | 'mobile' | 'internet';
  name: string;
  status: 'normal' | 'warning' | 'critical';
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface Connection {
  source: string;
  target: string;
  status: 'normal' | 'warning' | 'critical';
}

interface TopologyViewProps {
  nodes: Node[];
  connections: Connection[];
}

const TopologyView: React.FC<TopologyViewProps> = ({ nodes, connections }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>(structuredClone(nodes));
  
  // Add physics simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize node positions if not set
    const simulationNodes = structuredClone(nodes);
    simulationNodes.forEach(node => {
      if (node.x === undefined || node.y === undefined) {
        node.x = Math.random() * canvas.width;
        node.y = Math.random() * canvas.height;
        node.vx = 0;
        node.vy = 0;
      }
    });
    
    nodesRef.current = simulationNodes;
    
    const linkDistance = 100;
    const repulsionStrength = 700;
    const centerAttraction = 0.005;
    const damping = 0.7;
    
    // Function to find node by id
    const findNodeById = (id: string) => simulationNodes.find(n => n.id === id);
    
    // Update physics and draw
    const updateSimulation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate forces
      simulationNodes.forEach(node1 => {
        node1.vx = node1.vx || 0;
        node1.vy = node1.vy || 0;
        
        // Center attraction
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        node1.vx += (centerX - (node1.x || 0)) * centerAttraction;
        node1.vy += (centerY - (node1.y || 0)) * centerAttraction;
        
        // Node repulsion
        simulationNodes.forEach(node2 => {
          if (node1.id !== node2.id) {
            const dx = (node1.x || 0) - (node2.x || 0);
            const dy = (node1.y || 0) - (node2.y || 0);
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            
            if (distance < 150) {
              const force = repulsionStrength / (distance * distance);
              node1.vx += dx * force / distance;
              node1.vy += dy * force / distance;
            }
          }
        });
      });
      
      // Link forces
      connections.forEach(connection => {
        const source = findNodeById(connection.source);
        const target = findNodeById(connection.target);
        
        if (source && target) {
          const dx = (source.x || 0) - (target.x || 0);
          const dy = (source.y || 0) - (target.y || 0);
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          
          const force = (distance - linkDistance) * 0.05;
          
          const forceX = dx * force / distance;
          const forceY = dy * force / distance;
          
          source.vx = (source.vx || 0) - forceX;
          source.vy = (source.vy || 0) - forceY;
          target.vx = (target.vx || 0) + forceX;
          target.vy = (target.vy || 0) + forceY;
        }
      });
      
      // Update positions
      simulationNodes.forEach(node => {
        if (node.vx !== undefined && node.vy !== undefined && node.x !== undefined && node.y !== undefined) {
          node.vx *= damping;
          node.vy *= damping;
          
          node.x += node.vx;
          node.y += node.vy;
          
          // Boundary constraints
          node.x = Math.max(30, Math.min(canvas.width - 30, node.x));
          node.y = Math.max(30, Math.min(canvas.height - 30, node.y));
        }
      });
      
      // Draw connections
      connections.forEach(connection => {
        const source = findNodeById(connection.source);
        const target = findNodeById(connection.target);
        
        if (source && source.x !== undefined && source.y !== undefined && 
            target && target.x !== undefined && target.y !== undefined) {
          ctx.beginPath();
          
          // Set line style based on status
          switch (connection.status) {
            case 'normal':
              ctx.strokeStyle = '#94A3B8';
              ctx.lineWidth = 1;
              break;
            case 'warning':
              ctx.strokeStyle = '#F59E0B';
              ctx.lineWidth = 2;
              ctx.setLineDash([4, 2]);
              break;
            case 'critical':
              ctx.strokeStyle = '#DC2626';
              ctx.lineWidth = 2;
              break;
          }
          
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
      
      // Draw nodes
      simulationNodes.forEach(node => {
        if (node.x === undefined || node.y === undefined) return;
        
        ctx.beginPath();
        
        // Set fill color based on status
        let fillColor = '#22C55E';
        let strokeColor = '#16A34A';
        
        switch (node.status) {
          case 'normal':
            fillColor = '#22C55E';
            strokeColor = '#16A34A';
            break;
          case 'warning':
            fillColor = '#F59E0B';
            strokeColor = '#D97706';
            break;
          case 'critical':
            fillColor = '#DC2626';
            strokeColor = '#B91C1C';
            break;
        }
        
        // Draw node
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        
        const nodeRadius = 15;
        
        // Pulse effect for critical nodes
        if (node.status === 'critical') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(220, 38, 38, 0.2)';
          ctx.fill();
        }
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Draw icon
        ctx.fillStyle = 'white';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let icon = '';
        switch (node.type) {
          case 'server':
            icon = '🖥️';
            break;
          case 'router':
            icon = '🌐';
            break;
          case 'firewall':
            icon = '🛡️';
            break;
          case 'client':
            icon = '💻';
            break;
          case 'mobile':
            icon = '📱';
            break;
          case 'internet':
            icon = '☁️';
            break;
        }
        
        ctx.fillText(icon, node.x, node.y);
        
        // Draw name
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#1E293B';
        ctx.fillText(node.name, node.x, node.y + nodeRadius + 15);
      });
      
      animationRef.current = requestAnimationFrame(updateSimulation);
    };
    
    // Resize canvas
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    updateSimulation();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, connections]);
  
  return (
    <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg shadow-sm p-4 h-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Network Topology</h3>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-gray-600 dark:text-gray-300">Normal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-gray-600 dark:text-gray-300">Warning</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-gray-600 dark:text-gray-300">Critical</span>
          </div>
        </div>
      </div>
      
      <div className="h-[530px] relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default TopologyView;