import Nav from "./Nav";
import "./About.css";

const About = () => {
  return (
    <div>
      <Nav />
      <div id="Upper_Body">
        <p className="Heading_Paragraph">
          What is Federated Learning and how are we using it ?
        </p>
        <p className="Text_Paragraph">
          Federated learning is a new decentralized machine learning procedure
          to train machine learning models with multiple data providers. Instead
          of gathering data on a single server, &nbsp; the data remains locked
          on servers as the algorithms and only the predictive models travel
          between the servers.
        </p>
        <p className="Text_Paragraph">
          The goal of this approach is for each participant to benefit from a
          larger pool of data than their own, resulting in increased machine
          learning performance, while respecting data ownership and privacy.
        </p>
      </div>
      <div id="Lower_Body">
        <p className="Heading_Paragraph">
          How does federated learning solve the main challenges of machine
          learning in healthcare ?
        </p>
        <p className="Text_Paragraph">
          Machine learning has the potential to revolutionize all industries,
          including healthcare. It can do this by accelerating medical research
          using its ability to generate medical insights (from cancer biomarker
          identification to patient screening and genetic prediction from
          imaging). These applications not only strengthen researchers’
          abilities to make discoveries, they also help address time and cost
          challenges across the healthcare industry.
        </p>
        <p className="Text_Paragraph">
          However, machine learning approaches are “data hungry”. Algorithms
          need access to large and diverse datasets to train, improve their
          accuracy and eliminate bias.
        </p>
        <p className="Text_Paragraph">
          Today ' s standard approach of centralizing data from multiple centers
          must be balanced with critical concerns regarding patient privacy and
          data protection. Software that handles personal data is bound by
          strict privacy laws. Healthcare systems must protect personal data at
          all times, and current standard practices such as anonymization may
          even require removing data that could be critical for medical
          discoveries.
        </p>
      </div>
    </div>
  );
};

export default About;
