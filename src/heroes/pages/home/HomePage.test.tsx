import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

vi.mock('@/heroes/hooks/usePaginatedHero');

const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

mockUsePaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof usePaginatedHero>);

const queryClient = new QueryClient()

const renderWithRouter = (component: React.ReactElement, initialEntries?: string[]) => {
  return render(
    <MemoryRouter
      initialEntries={initialEntries}
    >
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          {component}
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>
  )
}

describe('HomePage', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  })

  test('should render HomePage with default values', () => {
    const { container } = renderWithRouter(<HomePage />)

    expect(container).toMatchSnapshot();
  })

  test('should call usePaginatedHero with default values', () => {
    renderWithRouter(<HomePage />, ['/?page=2&limit=10&category=villains'])

    expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'villains');
  })

  test('should call usePaginatedHero with default page and same limit on tab clicked', () => {
    renderWithRouter(<HomePage />, ['/?tab=favorites&page=2&limit=10'])
    const [, , , villainsTab] = screen.getAllByRole('tab');
    fireEvent.click(villainsTab);
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');
  })
})