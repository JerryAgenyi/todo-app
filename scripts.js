//javascript
// pages/index.js
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
export async function getStaticProps() {
  // Fetch data for header, footer, and sidebar
  const headerData = await fetchHeaderData();
  const footerData = await fetchFooterData();
  const sidebarData = await fetchSidebarData();
  return { props: { headerData, footerData, sidebarData } };
}
export default function HomePage({ headerData, footerData, sidebarData }) {
  return (
    <div>
      {" "}
      <Header data={headerData} /> <Sidebar data={sidebarData} />{" "}
      <main> {/* Your main content */} </main> <Footer data={footerData} />{" "}
    </div>
  );
}
