import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about">
      <div className="about-inner">

        <div className="about-visual">
          <div className="about-card">
            <span>Студия Елены</span>
          </div>
        </div>

        <div className="about-content">
          <h2>О студии</h2>

          <p>
            Наша студия работает с 2015 года и за это время помогла сотням людей
            открыть в себе художника. Мы верим, что искусство доступно каждому,
            независимо от возраста и уровня подготовки.
          </p>

          <p>
            Елена Годионенко — профессиональный художник с более чем
            пятнадцатилетним опытом, преподаватель высшей категории. Методика
            обучения сочетает академические основы и современные художественные
            подходы.
          </p>

          <div className="about-stats">
            <div className="stat purple">
              <strong>15+</strong>
              <span>лет опыта</span>
            </div>

            <div className="stat green">
              <strong>500+</strong>
              <span>учеников</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
