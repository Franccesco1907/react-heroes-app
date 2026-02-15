import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";

describe('getHeroAction', () => {
  test('should fetch hero data and return with complete image url', async () => {
    const result = await getHeroAction('clark-kent');

    expect(result.image).toContain('http');
    expect(result).toStrictEqual({
      "alias": "Superman",
      "category": "Hero",
      "description": "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
      "durability": 10,
      "firstAppearance": "1938",
      "id": "1",
      "image": "http://localhost:3000/images/1.jpeg",
      "intelligence": 8,
      "name": "Clark Kent",
      "powers": [
        "Súper fuerza",
        "Vuelo",
        "Visión de calor",
        "Visión de rayos X",
        "Invulnerabilidad",
        "Súper velocidad",
      ],
      "slug": "clark-kent",
      "speed": 9,
      "status": "Active",
      "strength": 10,
      "team": "Liga de la Justicia",
      "universe": "DC",
    });
  });

  test('should throw an error if hero is not found', async () => {
    const idSlug = 'batman-2';

    const result = await getHeroAction(idSlug).catch(error => {
      expect(error).toBeDefined();
      expect(error.message).toBe('Request failed with status code 404');
    });

    expect(result).toBeUndefined()
  });
});