
export default function Layout({ children } ) {

  return (
    <div className="layout">
      <header>
        <h1>Bookworm's retreat</h1> 
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}