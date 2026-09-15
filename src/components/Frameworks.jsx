import OrbitingCircles from './OrbitingCircles';

// Inner orbit — faster, reversed, smaller radius
const innerTechStack = [
  { name: 'TS' },
  { name: '▲' },
  { name: 'Node' },
  { name: 'Docker' },
];

// Outer orbit — slower, normal direction, larger radius
const outerTechStack = [
  { name: 'React' },
  { name: 'Python' },
  { name: 'AWS' },
  { name: 'GraphQL' },
  { name: 'Rust' },
];

const TechIcon = ({ name }) => (
  <div
    title={name}
    className="w-full h-full flex items-center justify-center rounded-full font-semibold text-[#111827] bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_rgba(15,15,20,0.06)] transition-all duration-200 hover:border-[rgba(0,0,0,0.2)] hover:scale-110 select-none"
    style={{
      fontSize: name.length > 3 ? '9px' : '11px',
    }}
  >
    {name}
  </div>
);

const Frameworks = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: '180px' }}>
      {/* Center code icon */}
      <div
        className="absolute z-10 w-11 h-11 rounded-full flex items-center justify-center bg-[#111827] text-white shadow-[0_2px_8px_rgba(15,15,20,0.14)] border border-[#111827]"
        aria-hidden="true"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>

      {/* Inner ring */}
      <div className="absolute w-full h-full">
        <OrbitingCircles radius={68} duration={16} reverse iconSize={34} showGuide stroke="rgba(0, 0, 0, 0.06)">
          {innerTechStack.map((tech) => (
            <TechIcon key={tech.name} {...tech} />
          ))}
        </OrbitingCircles>
      </div>

      {/* Outer ring */}
      <div className="absolute w-full h-full">
        <OrbitingCircles radius={112} duration={26} iconSize={36} showGuide stroke="rgba(0, 0, 0, 0.05)">
          {outerTechStack.map((tech) => (
            <TechIcon key={tech.name} {...tech} />
          ))}
        </OrbitingCircles>
      </div>
    </div>
  );
};

export default Frameworks;
