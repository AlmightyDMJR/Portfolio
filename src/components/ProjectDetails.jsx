import { motion } from 'motion/react';

const ProjectDetails = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ background: 'rgba(3, 4, 18, 0.85)', backdropFilter: 'blur(16px)' }}
    >
      <motion.div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #1f1e39, #161a31)',
          border: '1px solid rgba(122, 87, 219, 0.3)',
          boxShadow: '0 25px 60px rgba(92, 51, 204, 0.25)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          id={`close-project-${project.id}`}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Project image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #161a31 20%, transparent)' }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-neutral-400 text-sm mb-4">{project.description}</p>

          {/* Bullet points */}
          <ul className="space-y-2 mb-5">
            {project.subDescription.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-lavender shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full text-xs text-lavender"
                style={{
                  background: 'rgba(122, 87, 219, 0.1)',
                  border: '1px solid rgba(122, 87, 219, 0.3)',
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* View Project link */}
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            id={`view-project-${project.id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #5c33cc, #7a57db)',
              boxShadow: '0 0 20px rgba(92, 51, 204, 0.4)',
            }}
          >
            View Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;
