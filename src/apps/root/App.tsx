import { HelloWorld } from "@components/HelloWorld";
import { Layout } from "@components/Layout";
import { rootChrome } from "@config/site";

interface AppProps {
  page: string | undefined;
}

export default function App({ page }: AppProps) {
  return (
    <Layout site={rootChrome}>
      {page === "home" ? (
        <HelloWorld title={rootChrome.name} />
      ) : (
        <HelloWorld
          title="Page not found"
          description="The page you're looking for doesn't exist."
        />
      )}
    </Layout>
  );
}
