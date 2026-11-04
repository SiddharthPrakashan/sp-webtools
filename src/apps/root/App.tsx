import { HelloWorld } from "@components/HelloWorld";
import { Layout } from "@components/Layout";
import { rootChrome } from "@config/site";
import Home from "@root/pages/Home";

interface AppProps {
  page: string | undefined;
}

export default function App({ page }: AppProps) {
  return (
    <Layout site={rootChrome} showAds={page === "home"}>
      {page === "home" ? (
        <Home />
      ) : (
        <HelloWorld
          title="Page not found"
          description="The page you're looking for doesn't exist."
        />
      )}
    </Layout>
  );
}
