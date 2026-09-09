import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import ProjectDetails from './ProjectDetails';

const Project = ({ project, setPreview, clearPreview }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        className="group"
        onMouseEnter={() => setPreview(project.image)}
        onMouseLeave={clearPreview}
      >
        {/* Top divider */}
        <div
          className="h-px w-full mb-6"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(122, 87, 219, 0.4), transparent)',
          }}
        />

        <div className="flex items-center justify-between gap-4 pb-6">
          {/* Left: Title + tags */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-lavender transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full text-xs text-neutral-400"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Read More button */}
          <motion.button
            onClick={() => setShowDetails(true)}
            id={`project-read-more-${project.id}`}
            aria-label={`Read more about ${project.title}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white shrink-0 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(92, 51, 204, 0.4), rgba(122, 87, 219, 0.3))',
              border: '1px solid rgba(122, 87, 219, 0.3)',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Read More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <ProjectDetails
            project={project}
            onClose={() => setShowDetails(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Project;
