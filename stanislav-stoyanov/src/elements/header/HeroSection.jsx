const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[90vh] bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}background.jpg)`,
      }}
    >
      {/* <Header onShowAllNews={() => setShowAllNews(true)} /> */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40
               bg-gradient-to-b from-transparent via-teal-300/40 to-teal-600/60"
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;