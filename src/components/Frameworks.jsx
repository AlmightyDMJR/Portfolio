import OrbitingCircles from './OrbitingCircles';

// Inner orbit — faster, reversed, smaller radius
const innerTechStack = [
  { name: 'TS', color: '#3178c6', bg: 'rgba(49, 120, 198, 0.15)' },
  { name: '▲', color: '#ffffff', bg: 'rgba(255,255,255,0.1)' },
  { name: 'N', color: '#68a063', bg: 'rgba(104, 160, 99, 0.15)' },
  { name: '🐳', color: '#2496ed', bg: 'rgba(36, 150, 237, 0.15)' },
];

// Outer orbit — slower, normal direction, larger radius
const outerTechStack = [
  { name: '⚛', color: '#61dafb', bg: 'rgba(97, 218, 251, 0.1)' },
  { name: 'PY', color: '#ffd43b', bg: 'rgba(255, 212, 59, 0.1)' },
  { name: '☁', color: '#ff9900', bg: 'rgba(255, 153, 0, 0.1)' },
  { name: 'GQ', color: '#e535ab', bg: 'rgba(229, 53, 171, 0.1)' },
  { name: 'RS', color: '#b7410e', bg: 'rgba(183, 65, 14, 0.1)' },
];

const TechIcon = ({ name, color, bg }) => (
  <div
    title={name}
    className="w-full h-full flex items-center justify-center rounded-full text-xs font-bold transition-transform duration-300 hover:scale-125"
    style={{
      background: bg,
      border: `1px solid ${color}40`,
      color,
      fontSize: name.length > 2 ? '16px' : '10px',
      boxShadow: `0 0 8px ${color}30`,
    }}
  >
    {name}
  </div>
);

const Frameworks = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: '200px' }}>
      {/* Center icon */}
      <div
        className="absolute z-10 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
        style={{
          background: 'linear-gradient(135deg, #5c33cc, #33c2cc)',
          boxShadow: '0 0 30px rgba(92, 51, 204, 0.5)',
        }}
      >
        💻
      </div>

      {/* Inner ring */}
      <div className="absolute w-full h-full">
        <OrbitingCircles radius={70} duration={15} reverse iconSize={36} showGuide>
          {innerTechStack.map((tech) => (
            <TechIcon key={tech.name} {...tech} />
          ))}
        </OrbitingCircles>
      </div>

      {/* Outer ring */}
      <div className="absolute w-full h-full">
        <OrbitingCircles radius={115} duration={25} iconSize={38} showGuide>
          {outerTechStack.map((tech) => (
            <TechIcon key={tech.name} {...tech} />
          ))}
        </OrbitingCircles>
      </div>
    </div>
  );
};

export default Frameworks;
