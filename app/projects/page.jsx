export const metadata = {
  title: "Projects"
};

const projects = [
  {
    title: "Project 1",
    link: "https://example.com/project-1"
  },
  {
    title: "Project 2",
    link: "https://example.com/project-2"
  }
];

export default function ProjectsPage() {
  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.title}>
            <a href={project.link}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
