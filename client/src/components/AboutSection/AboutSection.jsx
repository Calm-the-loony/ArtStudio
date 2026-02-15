import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about">
      <div className="about-inner">

        <div className="about-visual">
          <div className="visual-container">
            <div className="visual-border"></div>
            <div className="about-card">
              <img 
                src="https://cdn-st2.vigbo.com/u13099/24904/blog/4051709/3928189/50169964/1000-chigintseva-978894f2c2ae9cb12ca0c91b1678a23e.jpg" 
                alt="Работа ученицы студии ЕлАрт" 
                className="about-image"
              />
              <div className="card-accent"></div>
            </div>
            <div className="decorative-dots">
              <div className="decorative-dot"></div>
              <div className="decorative-dot"></div>
              <div className="decorative-dot"></div>
            </div>
          </div>
        </div>

        <div className="about-content">
          <h2>О студии</h2>
          <p>
            Художественная студия «ЕлАрт» — это пространство, где творчество становится доступным каждому. 
            Мы помогаем взрослым и детям раскрывать свои способности, пробовать новые техники 
            и находить вдохновение в процессе создания.
          </p>
          <p>
            Студия работает с 2020 года. За это время у нас сложилось сообщество увлечённых людей, 
            а многие ученики продолжают заниматься годами, открывая для себя новые грани искусства.
          </p>
          <div className="about-stats">
            <div className="stat purple">
              <strong>5+</strong>
              <span>лет опыта</span>
            </div>
            <div className="stat green">
              <strong>100+</strong>
              <span>учеников</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;