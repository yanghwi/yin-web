export const metadata = {
  title: "Projects"
};

const projects = [
  {
    title: "Signal Atlas",
    description:
      "A research-driven publication tracking how cultural signals age in the era of synthetic media.",
    link: "https://example.com/signal-atlas"
  },
  {
    title: "Small Systems Lab",
    description:
      "A micro-consultancy helping teams design humane automations and thoughtful tooling.",
    link: "https://example.com/small-systems"
  }
];

export default function ProjectsPage() {
  return (
    <article>
      <h1>Projects</h1>
      <p>
        Selected experiments and collaborations that explore how craft and code
        intertwine.
      </p>
      <ul className="post-list">
        {projects.map((project) => (
          <li key={project.title} className="post-list-item">
            <h2>
              <a href={project.link}>{project.title}</a>
            </h2>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
