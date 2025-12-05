const HeroImage = () => {
  return (
    <section
      className="relative w-full min-h-[90vh] bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}background.jpg)`,
        backgroundPosition: "center -90px",
      }}
    >
      {/* <Header onShowAllNews={() => setShowAllNews(true)} /> */}
      {/* <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-15
               bg-gradient-to-b from-transparent via-teal-300/40 to-teal-600/60"
        aria-hidden="true"
      /> */}
    </section>
  );
};

export default HeroImage;
