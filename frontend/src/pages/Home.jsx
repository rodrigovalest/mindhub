import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="w-full h-full">
      <nav>
        <Logo />
      </nav>
      <div className="h-5/6 flex justify-center items-center">
        <h1>Home</h1>
      </div>
    </div>
  );
}
