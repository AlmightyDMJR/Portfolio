import { useProgress, Html } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div
          style={{
            width: '60px',
            height: '60px',
            border: '3px solid rgba(92, 51, 204, 0.2)',
            borderTop: '3px solid #5c33cc',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ color: '#7a57db', fontSize: '14px', fontFamily: 'Funnel Display, sans-serif' }}>
          {Math.round(progress)}% Loaded
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
};

export default Loader;
