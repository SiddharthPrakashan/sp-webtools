import { HelloWorld } from "@components/HelloWorld";
import { Layout } from "@components/Layout";
import { webtoolsChrome } from "@config/site";

export default function App() {
  return (
    <Layout site={webtoolsChrome}>
      <HelloWorld
        title="IG Followers Check"
        description="Coming soon.. See who doesn't follow you back using your Instagram data export, processed entirely in your browser."
      />
    </Layout>
  );
}
