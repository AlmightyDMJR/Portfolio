import { motion } from 'motion/react';
import { experiences } from '../constants';
import Timeline from '../components/Timeline';

const Experiences = () => {
  return (
    <section id="work" className="section-spacing c-space">
      {/* Section header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="subtext uppercase tracking-widest mb-2">Where I&apos;ve worked</p>
        <h2 className="text-heading">Work Experience</h2>
        <p className="subtext mt-3 max-w-xl">
          My professional journey — from frontend intern to senior engineer building products at scale.
        </p>
      </motion.div>

      <Timeline data={experiences} />
    </section>
  );
};

export default Experiences;
