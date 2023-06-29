import Header from "~/components/header";
import MainNavbar from "~/components/mainNavbar";

export default function Profile() {
    return (
      <>
        <Header />
        <main>
          <div>
            <MainNavbar />
            <h1>profile</h1>
          </div>
        </main>
      </>
    );
  }