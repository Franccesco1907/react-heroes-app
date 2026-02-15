import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";

if (typeof window.ResizeObserver === 'undefined') {
  window.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  };
}

const renderWithRouter = (component: React.ReactElement, initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter
      initialEntries={initialEntries}
    >
      {/* <QueryClientProvider client={queryClient}> */}
      {component}
      {/* </QueryClientProvider> */}
    </MemoryRouter>
  )
}

describe('SearchControls', () => {
  test('should render SearchControls with default values', () => {
    const { container } = renderWithRouter(<SearchControls />)

    expect(container).toMatchSnapshot();
  })

  test('should set input value when search param name is set', () => {
    renderWithRouter(<SearchControls />, ['/?name=Batman'])

    const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...') as HTMLInputElement;
    expect(input.value).toBe('Batman');
  })

  test('should change params when input value is set and enter is pressed', () => {
    renderWithRouter(<SearchControls />, ['/?name=Batman'])

    const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...') as HTMLInputElement;

    expect(input.value).toBe('Batman');

    input.value = 'Superman';
    fireEvent.change(input, { target: { value: 'Superman' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.getAttribute('value')).toBe('Superman');
  })

  test('should change param strength when slider value is changed', () => {
    renderWithRouter(<SearchControls />, ['/?name=Batman&active-accordion=advanced-filters'])

    const slider = screen.getByRole('slider') as HTMLInputElement;
    expect(slider.getAttribute('aria-valuenow')).toBe('0');

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider.getAttribute('aria-valuenow')).toBe('1');
  })

  test('should accordion be open when active-accordion param is set', () => {
    renderWithRouter(<SearchControls />, ['/?name=Batman&active-accordion=advanced-filters'])

    const accordion = screen.getByTestId('advanced-filters-accordion') as HTMLInputElement;
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('open');
  })

  test('should accordion be closed when active-accordion param is not set', () => {
    renderWithRouter(<SearchControls />, ['/?name=Batman'])

    const accordion = screen.getByTestId('advanced-filters-accordion') as HTMLInputElement;
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
  })
})