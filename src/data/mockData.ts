// Mock data for the intrusion detection system

// Alerts
export const mockAlerts = [
  {
    id: 'a1',
    timestamp: '2023-05-15 14:32:45',
    description: 'Brute force attempt detected on administrator account',
    source: '203.45.78.21',
    destination: '192.168.1.5',
    protocol: 'SSH',
    severity: 'critical',
    status: 'new',
    category: 'Authentication'
  },
  {
    id: 'a2',
    timestamp: '2023-05-15 14:28:12',
    description: 'Unusual outbound data transfer from accounting server',
    source: '192.168.1.45',
    destination: '87.123.45.67',
    protocol: 'HTTPS',
    severity: 'high',
    status: 'investigating',
    category: 'Data Exfiltration'
  },
  {
    id: 'a3',
    timestamp: '2023-05-15 14:15:03',
    description: 'Port scan detected from external IP',
    source: '45.32.18.221',
    destination: '192.168.1.1',
    protocol: 'TCP',
    severity: 'medium',
    status: 'new',
    category: 'Reconnaissance'
  },
  {
    id: 'a4',
    timestamp: '2023-05-15 13:58:27',
    description: 'Multiple failed login attempts detected',
    source: '178.62.84.23',
    destination: '192.168.1.10',
    protocol: 'HTTP',
    severity: 'medium',
    status: 'investigating',
    category: 'Authentication'
  },
  {
    id: 'a5',
    timestamp: '2023-05-15 13:45:19',
    description: 'Suspicious process execution on server',
    source: '192.168.1.22',
    destination: 'localhost',
    protocol: 'N/A',
    severity: 'high',
    status: 'new',
    category: 'Malware'
  },
  {
    id: 'a6',
    timestamp: '2023-05-15 13:32:05',
    description: 'DNS query to known malicious domain',
    source: '192.168.1.35',
    destination: 'malicious-domain.com',
    protocol: 'DNS',
    severity: 'high',
    status: 'resolved',
    category: 'Malware'
  },
  {
    id: 'a7',
    timestamp: '2023-05-15 13:28:56',
    description: 'SQL injection attempt detected',
    source: '91.234.56.78',
    destination: '192.168.1.15',
    protocol: 'HTTP',
    severity: 'critical',
    status: 'investigating',
    category: 'Application'
  },
  {
    id: 'a8',
    timestamp: '2023-05-15 13:15:42',
    description: 'Firewall rule violation - blocked outbound connection',
    source: '192.168.1.56',
    destination: '45.67.23.89',
    protocol: 'HTTPS',
    severity: 'low',
    status: 'resolved',
    category: 'Network'
  },
  {
    id: 'a9',
    timestamp: '2023-05-15 12:58:39',
    description: 'Cross-site scripting (XSS) attack detected',
    source: '78.34.21.90',
    destination: '192.168.1.15',
    protocol: 'HTTP',
    severity: 'medium',
    status: 'resolved',
    category: 'Application'
  },
  {
    id: 'a10',
    timestamp: '2023-05-15 12:45:23',
    description: 'Connection to Tor exit node detected',
    source: '192.168.1.30',
    destination: '45.32.56.78',
    protocol: 'HTTPS',
    severity: 'medium',
    status: 'false-positive',
    category: 'Network'
  }
];

// Traffic data
export const mockTrafficData = [
  { time: '10:00', normal: 350, anomalies: 0 },
  { time: '11:00', normal: 420, anomalies: 0 },
  { time: '12:00', normal: 480, anomalies: 15 },
  { time: '13:00', normal: 520, anomalies: 20 },
  { time: '14:00', normal: 480, anomalies: 5 },
  { time: '15:00', normal: 580, anomalies: 0 },
  { time: '16:00', normal: 620, anomalies: 0 },
  { time: '17:00', normal: 550, anomalies: 30 },
  { time: '18:00', normal: 420, anomalies: 10 },
  { time: '19:00', normal: 320, anomalies: 0 },
  { time: '20:00', normal: 280, anomalies: 0 },
  { time: '21:00', normal: 250, anomalies: 5 }
];

// Threat map locations
export const mockThreatLocations = [
  { id: 't1', latitude: 39.9042, longitude: 116.4074, country: 'China', city: 'Beijing', threatLevel: 'high', count: 24 },
  { id: 't2', latitude: 55.7558, longitude: 37.6173, country: 'Russia', city: 'Moscow', threatLevel: 'medium', count: 18 },
  { id: 't3', latitude: -23.5505, longitude: -46.6333, country: 'Brazil', city: 'São Paulo', threatLevel: 'low', count: 10 },
  { id: 't4', latitude: 37.7749, longitude: -122.4194, country: 'USA', city: 'San Francisco', threatLevel: 'medium', count: 15 },
  { id: 't5', latitude: 51.5074, longitude: -0.1278, country: 'UK', city: 'London', threatLevel: 'low', count: 8 },
  { id: 't6', latitude: 35.6762, longitude: 139.6503, country: 'Japan', city: 'Tokyo', threatLevel: 'medium', count: 12 },
  { id: 't7', latitude: 28.6139, longitude: 77.2090, country: 'India', city: 'New Delhi', threatLevel: 'critical', count: 30 },
  { id: 't8', latitude: -33.8688, longitude: 151.2093, country: 'Australia', city: 'Sydney', threatLevel: 'low', count: 6 }
];

// Network nodes and connections for topology view
export const mockNetworkNodes = [
  { id: 'n1', type: 'firewall', name: 'Main Firewall', status: 'normal' },
  { id: 'n2', type: 'server', name: 'Web Server', status: 'normal' },
  { id: 'n3', type: 'server', name: 'Database', status: 'normal' },
  { id: 'n4', type: 'server', name: 'File Server', status: 'warning' },
  { id: 'n5', type: 'router', name: 'Main Router', status: 'normal' },
  { id: 'n6', type: 'client', name: 'Admin Workstation', status: 'normal' },
  { id: 'n7', type: 'client', name: 'HR Laptop', status: 'critical' },
  { id: 'n8', type: 'router', name: 'Wireless AP', status: 'normal' },
  { id: 'n9', type: 'mobile', name: 'CEO Phone', status: 'normal' },
  { id: 'n10', type: 'internet', name: 'Internet', status: 'normal' }
];

export const mockNetworkConnections = [
  { source: 'n10', target: 'n1', status: 'normal' },
  { source: 'n1', target: 'n5', status: 'normal' },
  { source: 'n5', target: 'n2', status: 'normal' },
  { source: 'n5', target: 'n3', status: 'normal' },
  { source: 'n5', target: 'n4', status: 'warning' },
  { source: 'n5', target: 'n8', status: 'normal' },
  { source: 'n5', target: 'n6', status: 'normal' },
  { source: 'n8', target: 'n7', status: 'critical' },
  { source: 'n8', target: 'n9', status: 'normal' }
];