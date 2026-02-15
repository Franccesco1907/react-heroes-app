import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { SearchControls } from "./ui/SearchControls";
import { HeroStats } from "@/heroes/components/HeroStats";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ['search', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra tus heroes"
      />

      <CustomBreadcrumbs
        currentPage="Buscador de héroes"
      // breadcrumbs={[
      //   { label: 'Home1', to: '/' },
      //   { label: 'Home2', to: '/' },
      //   { label: 'Home3', to: '/' },
      // ]}
      />

      <HeroStats />

      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  )
}

export default SearchPage;