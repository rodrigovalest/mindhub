export default function Navbar({ children }) {
  return (
    <nav className="flex justify-between items-center py-2 px-2">
      {children}
    </nav>
  );
}
