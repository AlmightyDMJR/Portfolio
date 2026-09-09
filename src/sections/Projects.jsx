import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

import { myProjects } from '../constants';
import Project from '../components/Project';

const Projects = () => {
  const [previewSrc, setPreviewSrc] = useState(null);

  // Cursor-following spring values
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 10, stiffness: 50 });
  const springY = useSpring(cursorY, { damping: 10, stiffness: 50 });

  const handleMouseMove = (e) => {
    cursorX.set(e.clientX + 20);
    cursorY.set(e.clientY - 40);
  };

  return (
    <section
      id="projects"
      className="section-spacing c-space"
      onMouseMove={handleMouseMove}
    >
      {/* Section header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="subtext uppercase tracking-widest mb-2">What I&apos;ve built</p>
        <h2 className="text-heading">Featured Projects</h2>
        <p className="subtext mt-3 max-w-xl">
          A selection of my best work — hover a project to preview, click to dive in.
        </p>
      </motion.div>

      {/* Projects list */}
      <div>
        {myProjects.map((project) => (
          <Project
            key={project.id}
            project={project}
            setPreview={setPreviewSrc}
            clearPreview={() => setPreviewSrc(null)}
          />
        ))}

        {/* Final divider */}
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(122, 87, 219, 0.4), transparent)',
          }}
        />
      </div>

      {/* Cursor-following preview image */}
      {previewSrc && (
        <motion.div
          className="pointer-events-none fixed z-40 rounded-xl overflow-hidden"
          style={{
            x: springX,
            y: springY,
            width: '320px',
            height: '180px',
            boxShadow: '0 20px 60px rgba(92, 51, 204, 0.4)',
          }}
        >
          <img
            src={previewSrc}
            alt="Project preview"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(92, 51, 204, 0.2), transparent)',
              border: '1px solid rgba(122, 87, 219, 0.4)',
              borderRadius: '0.75rem',
            }}
          />
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
