import { motion } from 'motion/react';
import { myProjects } from '../constants';
import { ProjectShowcase } from '../components/ui/project-showcase';

const Projects = () => {
  const showcaseProjects = myProjects.map((p) => ({
    title: p.title,
    description: p.description,
    year: p.year || '2024',
    link: p.href || 'https://github.com/AlmightyDMJR',
    image: p.image,
  }));

  return (
    <section id="projects" className="section-spacing c-space">
      {/* Section header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="subtext uppercase tracking-widest mb-2">What I&apos;ve built</p>
        <h2 className="text-heading">Featured Projects</h2>
        <p className="subtext mt-3 max-w-xl">
          A selection of my best work — hover a project to preview, click to open on GitHub.
        </p>
      </motion.div>

      {/* Interactive Project Showcase */}
      <ProjectShowcase
        projects={showcaseProjects}
        title=""
        className="px-0 py-2 max-w-full"
      />
    </section>
  );
};

export default Projects;
