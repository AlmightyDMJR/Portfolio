import { motion } from 'motion/react';
import { reviews } from '../constants';
import Marquee from '../components/Marquee';

const ReviewCard = ({ name, username, body, img }) => (
  <div
    className="relative flex flex-col w-56 rounded-xl p-4 shrink-0 transition-all duration-300 hover:-translate-y-1"
    style={{
      background: 'linear-gradient(135deg, #282b4b, #1f1e39)',
      border: '1px solid rgba(122, 87, 219, 0.2)',
      boxShadow: '0 4px 15px rgba(3, 4, 18, 0.4)',
    }}
  >
    {/* Quote mark */}
    <span
      className="absolute top-3 right-4 text-3xl font-black opacity-10 leading-none pointer-events-none"
      style={{ color: '#7a57db' }}
    >
      "
    </span>

    {/* Review text */}
    <p className="text-neutral-300 text-xs leading-relaxed mb-3 flex-1">{body}</p>

    {/* Author */}
    <div className="flex items-center gap-2">
      <img
        src={img}
        alt={name}
        className="w-8 h-8 rounded-full object-cover"
        style={{ border: '1px solid rgba(122, 87, 219, 0.4)' }}
      />
      <div>
        <p className="text-xs font-semibold text-white">{name}</p>
        <p className="text-[10px] text-neutral-500">{username}</p>
      </div>
    </div>
  </div>
);

const Testimonial = () => {
  return (
    <section className="section-spacing overflow-hidden py-10">
      {/* Section header */}
      <motion.div
        className="c-space mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="subtext uppercase tracking-widest mb-1 text-xs">Kind words</p>
        <h2 className="text-2xl md:text-3xl font-bold">What People Say</h2>
      </motion.div>

      {/* Marquee rows */}
      <div className="relative">
        {/* Left edge fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{ background: 'linear-gradient(to right, #030412, transparent)' }}
        />
        {/* Right edge fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{ background: 'linear-gradient(to left, #030412, transparent)' }}
        />

        <div className="flex flex-col gap-4 py-2">
          {/* Row 1 — normal direction */}
          <Marquee pauseOnHover gap="1rem" duration="40s">
            {reviews.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
