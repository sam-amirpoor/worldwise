import PageNav from "../components/PageNav/PageNav";
import styles from "./Homepage.module.css";
import { useAuth } from "../contexts/FakeAuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Homepage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link
          to="login"
          className="cta"
        >
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
